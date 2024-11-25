from rest_framework import serializers
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Printer

class PrinterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Printer
        fields = ('id', 'enable_type')


class CreatePrinterView(generics.CreateAPIView):
    queryset = Printer.objects.all()
    serializer_class = PrinterSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        printer = serializer.save()
        return Response({
            "printer": PrinterSerializer(printer, context=self.get_serializer_context()).data,
            "message": "Printer created successfully."
        }, status=status.HTTP_201_CREATED)
# -------------------------------------Chưa xong--------------------------------------------