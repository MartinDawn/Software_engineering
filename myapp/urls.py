from django.urls import path, include
from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshSlidingView,
)
# from .views import TestAPIView
from .views.SignUpViews import SignUpView
from .views.SignInViews import SignInView
urlpatterns = [
    path('api/token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('api/token/refresh/',TokenRefreshSlidingView.as_view(),name='token_refresh'),
    path('signup/',SignUpView.as_view()),
    path('sign_in/',SignInView.as_view())
]
