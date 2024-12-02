from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from ..models import User
from rest_framework.permissions import IsAuthenticated
import schedule
import threading
import time
from datetime import datetime

class SetEnableBuyingView(APIView):
    permission_classes = [IsAuthenticated]

    def setEnable(self):
        User.objects.all().update(is_able_buying=True)

    def post(self, request):
        requested_time_str = request.data.get('datetime')
        if not requested_time_str:
            return Response({
                "message": "Ngày giờ không hợp lệ hoặc không được cung cấp."
            }, status=status.HTTP_400_BAD_REQUEST)
        
        naive_datetime = datetime.fromisoformat(requested_time_str)
        aware_datetime = timezone.make_aware(naive_datetime, timezone.get_current_timezone())
        def job():
            self.setEnable()

        # Schedule the job at the specific aware_datetime
        delay = (aware_datetime - timezone.localtime(timezone.now())).total_seconds()
        if delay <= 0:
            return Response({
                "message": "Thời điểm đã qua."
            }, status=status.HTTP_400_BAD_REQUEST)
        schedule.every(delay).seconds.do(job)
        threading.Thread(target=self.run_scheduler).start()

        return Response({
            "message": "Yêu cầu đã được ghi nhận. Hệ thống sẽ cập nhật vào thời gian đã định."
        }, status=status.HTTP_200_OK)

    def run_scheduler(self):
        while True:
            schedule.run_pending()
            time.sleep(1)


class SetDisableBuyingView(APIView):
    permission_classes = [IsAuthenticated]

    def setEnable(self):
        User.objects.all().update(is_able_buying=False)

    def post(self, request):
        requested_time_str = request.data.get('datetime')
        if not requested_time_str:
            return Response({
                "message": "Ngày giờ không hợp lệ hoặc không được cung cấp."
            }, status=status.HTTP_400_BAD_REQUEST)
        
        naive_datetime = datetime.fromisoformat(requested_time_str)
        aware_datetime = timezone.make_aware(naive_datetime, timezone.get_current_timezone())
        def job():
            self.setEnable()

        # Schedule the job at the specific aware_datetime
        delay = (aware_datetime - timezone.localtime(timezone.now())).total_seconds()
        if delay <= 0:
            return Response({
                "message": "Thời điểm đã qua."
            }, status=status.HTTP_400_BAD_REQUEST)
        schedule.every(delay).seconds.do(job)
        threading.Thread(target=self.run_scheduler).start()

        return Response({
            "message": "Yêu cầu đã được ghi nhận. Hệ thống sẽ cập nhật vào thời gian đã định."
        }, status=status.HTTP_200_OK)

    def run_scheduler(self):
        while True:
            schedule.run_pending()
            time.sleep(1)


from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from ..models import User
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'full_name', 'role', 'availablePages',\
                  'is_able_buying', 'major', 'enrollment_year', 'working_location', 'department_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class SignUpView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "User created successfully."
        }, status=status.HTTP_201_CREATED)   
