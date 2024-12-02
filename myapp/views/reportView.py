# myapp/serializers.py
from rest_framework import serializers
from ..models import report
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from datetime import datetime
from rest_framework.permissions import IsAuthenticated
class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = report
        fields = ['totalPaperBuying', 'totalPaperPrinting', 'datetime']

class MonthlyReportView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        year = request.data.get('year')
        month = request.data.get('month')
        try:
            # Chuyển đổi giá trị 'year' và 'month' thành số nguyên
            year = int(year)
            month = int(month)
            
            reports = report.objects.filter(
                Q(datetime__year=year) & Q(datetime__month=month)
            )
            serializer = ReportSerializer(reports, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except (ValueError, TypeError):
            return Response({"error": "Invalid year or month format"}, status=status.HTTP_400_BAD_REQUEST)
