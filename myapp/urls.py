from django.urls import path, include
from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshSlidingView,
)
# from .views import TestAPIView
from .views.SignInViews import SignInView
from .views.managerViews import SetDisableBuyingView, SetEnableBuyingView, SignUpView
from .views.SPSOViews import AddPrinterView, EnablePrinter, DisablePrinter, DeletePrinter,\
                            ViewStudentActivity, ViewPrinterActivity, EnableFileType,EnableFileTypeForAllPrinter,\
                            ChangeDefaultPage, CreatePaperView
from .views.studentViews import BuyPaperView, PrintDocumentView
from .views.reportView import MonthlyReportView
urlpatterns = [
    path('api/token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('api/token/refresh/',TokenRefreshSlidingView.as_view(),name='token_refresh'),
    # ----------------------------------------------------------------------------
    path('signin/',SignInView.as_view()),
    # ----------------------------------------------------------------------------
    # managerapi
    path('manager/enable/',SetEnableBuyingView.as_view()),
    path('manager/disable/',SetDisableBuyingView.as_view()),
    path('signup/',SignUpView.as_view()),
    # ----------------------------------------------------------------------------
    # SPSOAPI
    path('spso/printer/addPrinter/',AddPrinterView.as_view()),
    path('spso/printer/enablePrinting/',EnablePrinter.as_view()),
    path('spso/printer/disablePrinting/',DisablePrinter.as_view()),
    path('spso/printer/deletePrinting/',DeletePrinter.as_view()),

    path('spso/printer/studentActivity/',ViewStudentActivity.as_view()),
    path('spso/printer/printerActivity/',ViewPrinterActivity.as_view()),

    path('spso/config/enableType/',EnableFileType.as_view()),
    path('spso/config/enableTypeAllPrinter/',EnableFileTypeForAllPrinter.as_view()),

    path('spso/changedefaultPages/',ChangeDefaultPage.as_view()),

    path('spso/create-paper/', CreatePaperView.as_view()),
    # ----------------------------------------------------------------------------
    # student api
    path('student/buypaper/',BuyPaperView.as_view()),
    path('student/printdocument/',PrintDocumentView.as_view()),
    
    path('spso/viewReport/',MonthlyReportView.as_view()),
]
