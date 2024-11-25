from django.urls import path, include
from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshSlidingView,
)
# from .views import TestAPIView
from .views.SignUpViews import SignUpView
from .views.SignInViews import SignInView
from .views.createPayment_historyViews import CreatePaymentHistoryView
from .views.createPrinterViews import CreatePrinterView
from .views.managerViews import SetDisableBuyingView, SetEnableBuyingView
urlpatterns = [
    path('api/token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('api/token/refresh/',TokenRefreshSlidingView.as_view(),name='token_refresh'),
    # ----------------------------------------------------------------------------
    path('signup/',SignUpView.as_view()),
    path('signin/',SignInView.as_view()),
    # ----------------------------------------------------------------------------
    path('manager/enable/',SetEnableBuyingView.as_view()),
    path('manager/disable/',SetDisableBuyingView.as_view()),
    # ----------------------------------------------------------------------------
    path('create-payment/', CreatePaymentHistoryView.as_view(), name='create-payment'),
    path('create-printer/', CreatePrinterView.as_view(), name='create-printer'),
]
