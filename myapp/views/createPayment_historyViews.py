from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from rest_framework import status
from ..models import Payment_History

#serializer class
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment_History
        fields = '__all__'
        read_only_fields = ('amount',)
        
    def create(self, validated_data):
        validated_data['amount'] = validated_data['nb_of_pages'] * 200
        validated_data['status'] = 'pending'  # Set default status value
        return super().create(validated_data)
    
#API views
class PaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        payments = Payment_History.objects.filter(user=request.user)
        serializer = PaymentHistorySerializer(payments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        if not user.buying_enabled:
            return Response({"detail": "Buying is disabled."}, status=status.HTTP_403_FORBIDDEN)
        serializer = PaymentHistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PaymentDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        pk = request.query_params.get('pk')
        payment = get_object_or_404(Payment_History, pk=pk, user=request.user)
        serializer = PaymentHistorySerializer(payment)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def put(self, request):
        pk = request.query_params.get('pk')
        payment = get_object_or_404(Payment_History, pk=pk, user=request.user)
        
        # Explicitly set the status to 'paid'
        payment.status = 'paid'
        payment.save()

        # Update the user's availablePages if the status is 'paid'
        user = payment.user
        user.availablePages += payment.nb_of_pages
        user.save()

        serializer = PaymentHistorySerializer(payment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        pk = request.query_params.get('pk')
        payment = get_object_or_404(Payment_History, pk=pk, user=request.user)
        payment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    


