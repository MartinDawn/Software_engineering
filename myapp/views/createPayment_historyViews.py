from rest_framework import serializers
from ..models import Payment_history
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
class PaymentHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment_history
        fields = ('id', 'ownerId', 'transaction_amount', 'date_payment')

class CreatePaymentHistoryView(generics.CreateAPIView):
    queryset = Payment_history.objects.all()
    serializer_class = PaymentHistorySerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        payment_history = serializer.save()
        return Response({
            "payment_history": PaymentHistorySerializer(payment_history, context=self.get_serializer_context()).data,
            "message": "Payment history created successfully."
        }, status=status.HTTP_201_CREATED)
# -------------------------------------Chưa xong--------------------------------------------