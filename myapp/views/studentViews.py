from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from ..models import User, Paper, Payment_history
from rest_framework import serializers
from ..models import Paper, Payment_history
from datetime import datetime
from django.utils import timezone
# --------------------Thanh toán---------------------------------
class PaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paper
        fields = '__all__'

class PaymentHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment_history
        fields = '__all__'

class BuyPaperView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        quantity = request.data.get('quantity', 1)
        user_id = request.data.get('user_id')
        cost = request.data.get('cost')

        if  not user_id:
            return Response({"message": "User ID are required"}, status=status.HTTP_400_BAD_REQUEST)
        total_cost = 300 * quantity
        if total_cost != cost:
            return Response({"message": "Số tiền không hợp lệ"}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.get(id=user_id)
        if not user.buying_enabled:
                return Response({"message": "Giao dịch mua giấy hiện không khả dụng"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            payment_history = Payment_history.objects.create(
                owner_id=user_id,
                transaction_amount=total_cost,
                date_payment=timezone.localtime(timezone.now())
            )
            user.availablePages+=quantity
            user.save()
            return Response({
                "message": "Mua giấy thành công",
                "payment_history": PaymentHistorySerializer(payment_history).data
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:
            return Response({"message": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
# ----------------------In----------------------------------------

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from ..models import Print_history, User, Printer, Paper
from rest_framework_simplejwt.authentication import JWTAuthentication
import ast
class PrintDocumentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        jwt_authenticator = JWTAuthentication()
        header = jwt_authenticator.get_header(request)
        raw_token = jwt_authenticator.get_raw_token(header)
        validated_token = jwt_authenticator.get_validated_token(raw_token)
        student_id = validated_token['user_id']  # Extract the user ID from the token
        file_name = request.data.get('file_name')
        file_size = request.data.get('file_size')
        number_of_pages = request.data.get('number_of_pages')
        printer_id = request.data.get('printer_id')
        page_type = request.data.get('page_type')
        document_type = request.data.get('document_type')
        if not student_id or not file_name or file_size is None or number_of_pages is None or not printer_id:
            return Response({"message": "Student ID, file name, file size, number of pages, and printer ID are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            student = User.objects.get(id=student_id, role="student")
            printer = Printer.objects.get(id=printer_id)
            rate = Paper.objects.get(type=page_type).page
            pageId= Paper.objects.get(type=page_type).id

            if not printer.enable_printing:
                return Response({"message": "Máy in không sử dụng được"}, status=status.HTTP_400_BAD_REQUEST)
            if student.availablePages < number_of_pages*rate:
                return Response({"message": "Học sinh không có đủ giấy in"}, status=status.HTTP_400_BAD_REQUEST)
            enabled_types = ast.literal_eval(printer.enable_type) 
            print(f"Document type: {document_type}") 
            print(f"Enabled types: {enabled_types}")
            if document_type not in [type.strip() for type in enabled_types]: 
                return Response({"message": "Máy in không chấp nhận loại tệp này"}, status=status.HTTP_400_BAD_REQUEST)
            # Giảm số lượng trang còn lại của sinh viên
            student.availablePages -= number_of_pages*rate
            student.save()

            # Tạo lịch sử in ấn
            print_history = Print_history.objects.create(
                owner_id=student_id,
                file_name=file_name,
                file_size=file_size,
                numberOfPages=number_of_pages*rate,
                page_id=pageId,
                printerId=printer_id,
                datetime = timezone.localtime(timezone.now())
            )

            return Response({
                "message": "Document printed successfully",
                "print_history": {
                    "id": print_history.id,
                    "file_name": print_history.file_name,
                    "file_size": print_history.file_size,
                    "numberOfPages": print_history.numberOfPages,
                    "printerId": print_history.printerId,
                    "timestamp": print_history.datetime
                }
            }, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({"message": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
        except Printer.DoesNotExist:
            return Response({"message": "Printer not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:
            return Response({"message": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

