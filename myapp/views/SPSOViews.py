from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from ..models import Printer, User,Payment_history,Print_history
# --------------------------------------Printer----------------------------------
class AddPrinterView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            enable_type = request.data.get('enable_type')
            enable_printing = request.data.get('enable_printing')
            location = request.data.get('location')

            if enable_type is None or enable_printing is None or location is None:
                return Response({"message": "Missing fields in request"}, status=status.HTTP_400_BAD_REQUEST)
                
            printer = Printer(
                enable_printing=enable_printing,
                enable_type=enable_type,
                location=location
            )
            printer.save()
            
            return Response({
                "Printer": {
                    "id": printer.id,
                    "enable_type": enable_type,
                    "enable_printing": enable_printing,
                    "location": location,
                },
                "message": "Printer created successfully."
            }, status=status.HTTP_201_CREATED)
        except Exception as error:
            return Response({"message": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EnablePrinter(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        printer_id = request.data.get('id')
        
        if not printer_id:
            return Response({"message": "Printer ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            printer = Printer.objects.get(id=printer_id)
            printer.enable_printing = True
            printer.save()
            return Response({
                "Printer": {
                    "id": printer.id,
                    "enable_type": printer.enable_type,
                    "enable_printing": printer.enable_printing,
                    "location": printer.location,
                },
                "message": "Printer enabled successfully."
            }, status=status.HTTP_200_OK)
        except Printer.DoesNotExist:
            return Response({"message": "Printer not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:
            return Response({"message": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DisablePrinter(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        printer_id = request.data.get('id')
        
        if not printer_id:
            return Response({"message": "Printer ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            printer = Printer.objects.get(id=printer_id)
            printer.enable_printing = False
            printer.save()
            return Response({
                "Printer": {
                    "id": printer.id,
                    "enable_type": printer.enable_type,
                    "enable_printing": printer.enable_printing,
                    "location": printer.location,
                },
                "message": "Printer enabled successfully."
            }, status=status.HTTP_200_OK)
        except Printer.DoesNotExist:
            return Response({"message": "Printer not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:
            return Response({"message": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class DeletePrinter(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        printer_id = request.data.get('id')
        
        if not printer_id:
            return Response({"message": "Printer ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            printer = Printer.objects.get(id=printer_id)
            printer.delete()
            return Response({
                "message": "Printer deleted successfully."
            }, status=status.HTTP_200_OK)
        except Printer.DoesNotExist:
            return Response({"message": "Printer not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:
            return Response({"message": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
# -----------------------------------View---------------------------------------------

class ViewStudentActivity(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        student_id = request.data.get('id')
        
        if not student_id:
            return Response({"message": "Student ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            student = User.objects.get(id=student_id,role="student")

            payment_history = Payment_history.objects.filter(owner_id=student_id)
            print_history = Print_history.objects.filter(owner_id=student_id)
            
            student_data = {
                "id": student.id,
                "username": student.username,
                "email": student.email,
                "full_name": student.full_name,
                "role": student.role,
                "availablePages": student.availablePages,
                "major": student.major,
                "enrollment_year": student.enrollment_year,
                "working_location": student.working_location,
                "department_name": student.department_name,
                "buying_enabled": student.buying_enabled,
                "payment_history": list(payment_history.values()),
                "print_history": list(print_history.values())
            }

            return Response({
                "student": student_data
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:
            return Response({"message": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):
        try:
            students = User.objects.filter(role="student")
            all_students_data = []

            for student in students:
                payment_history = Payment_history.objects.filter(owner_id=student.id)
                print_history = Print_history.objects.filter(owner_id=student.id)
                
                student_data = {
                    "id": student.id,
                    "username": student.username,
                    "email": student.email,
                    "full_name": student.full_name,
                    "role": student.role,
                    "availablePages": student.availablePages,
                    "major": student.major,
                    "enrollment_year": student.enrollment_year,
                    "working_location": student.working_location,
                    "department_name": student.department_name,
                    "is_able_buying": student.is_able_buying,
                    "payment_history": list(payment_history.values()),
                    "print_history": list(print_history.values())
                }
                all_students_data.append(student_data)

            return Response({
                "students": all_students_data
            }, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"message": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ViewPrinterActivity(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        printer_id = request.data.get('id')
        
        if not printer_id:
            return Response({"message": "Printer ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            printer = Printer.objects.get(id=printer_id)
            print_history = Print_history.objects.filter(printerId=printer_id)
            
            printer_data = {
                "id": printer.id,
                "enable_type": printer.enable_type,
                "enable_printing": printer.enable_printing,
                "location": printer.location,
                "print_history": list(print_history.values()) 
            }

            return Response({
                "printer": printer_data
            }, status=status.HTTP_200_OK)
        except Printer.DoesNotExist:
            return Response({"message": "Printer not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:
            return Response({"message": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get(self, request):
        try:
            printers = Printer.objects.all()
            all_printers_data = []

            for printer in printers:
                print_history = Print_history.objects.filter(printerId=printer.id)
                
                printer_data = {
                    "id": printer.id,
                    "enable_type": printer.enable_type,
                    "enable_printing": printer.enable_printing,
                    "location": printer.location,
                    "print_history": list(print_history.values()) 
                }
                all_printers_data.append(printer_data)

            return Response({
                "printers": all_printers_data
            }, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"message": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ViewReport():
    def post(self, request):
        return
###############################Chưa viết xong##############################################


# ---------------------------------config-------------------------------------------

class EnableFileType(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        printer_id = request.data.get('id')
        enable_type = request.data.get('enable_type')
        
        if not printer_id:
            return Response({"message": "Printer ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not enable_type:
            return Response({"message": "Enable type is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            printer = Printer.objects.get(id=printer_id)
            printer.enable_type = enable_type
            printer.save()
            print_history= Print_history.objects.filter(printerId=printer_id)
            return Response({
                "printer": {
                    "id": printer.id,
                    "enable_type": printer.enable_type,
                    "enable_printing": printer.enable_printing,
                    "location": printer.location,
                    "print_history": list(print_history.values())
                },
                "message": "File types updated successfully."
            }, status=status.HTTP_200_OK)
        except Printer.DoesNotExist:
            return Response({"message": "Printer not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:
            return Response({"message": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class EnableFileTypeForAllPrinter(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        enable_type = request.data.get('enable_type')

        if not enable_type:
            return Response({"message": "Enable type is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            printers = Printer.objects.all()
            for printer in printers:
                printer.enable_type = enable_type
                printer.save()

            all_printers_data = []
            for printer in printers:
                print_history = Print_history.objects.filter(printerId=printer.id)
                printer_data = {
                    "id": printer.id,
                    "enable_type": printer.enable_type,
                    "enable_printing": printer.enable_printing,
                    "location": printer.location,
                    "print_history": list(print_history.values())
                }
                all_printers_data.append(printer_data)

            return Response({
                "message": "All printers have been updated with the new file types.",
                "printers": all_printers_data
            }, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"message": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
# ---------------------sched--------------------------------------
import schedule
import time
from datetime import datetime
from django.utils import timezone
import threading
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from ..models import User

class ChangeDefaultPage(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        default_page = request.data.get('default_page')
        requested_time_str = request.data.get('datetime')
        
        if not default_page:
            return Response({"message": "Default page is required"}, status=status.HTTP_400_BAD_REQUEST)
        if not requested_time_str:
            return Response({"message": "Datetime is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            naive_datetime = datetime.fromisoformat(requested_time_str)
            aware_datetime = timezone.make_aware(naive_datetime, timezone.get_current_timezone())
            delay = (aware_datetime - timezone.localtime(timezone.now())).total_seconds()
            
            if delay <= 0:
                return Response({
                    "message": "Thời điểm không hợp lệ. Bạn phải nhập thời điểm lớn hơn hoặc bằng hôm nay."
                }, status=status.HTTP_400_BAD_REQUEST)

            def job():
                    students = User.objects.filter(role="student")
                    for student in students:
                        student.availablePages += default_page
                        student.save()
                    print("Default pages updated for all students.")
            
            schedule.every(delay).seconds.do(job)
            self.scheduler_thread = threading.Thread(target=self.run_scheduler)
            self.scheduler_thread.start()

            readable_time = naive_datetime.strftime("%d/%m/%Y %H:%M:%S")

            return Response({
                "message": f"Lịch đã được lập, vào thời điểm {readable_time} hệ thống sẽ cập nhật."
            }, status=status.HTTP_200_OK)
        
        except Exception as error:
            return Response({"message": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ----------------Thêm loại giấy mới--------------------------


from ..models import Paper

class CreatePaperView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        type = request.data.get("type")
        cost_per_paper = request.data.get("costPerPaper")
        page= request.data.get("page")

        if not type or cost_per_paper is None:
            return Response({"message": "Type and costPerPaper are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            paper = Paper(type=type, costPerPaper=cost_per_paper,page=page)
            paper.save()
            return Response({
                "message": "Paper created successfully",
                "paper": {
                    "id": paper.id,
                    "type": paper.type,
                    "costPerPaper": paper.costPerPaper,
                    "paper":page
                }
            }, status=status.HTTP_201_CREATED)

        except Exception as error:
            return Response({"message": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




