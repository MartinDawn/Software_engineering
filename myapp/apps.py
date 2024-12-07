# myapp/apps.py
from django.apps import AppConfig
import threading
import schedule
import time
from django.utils import timezone
from django.db.models.signals import post_migrate
from django.dispatch import receiver
import os
def createReportEveryMonth():
    from django.utils import timezone
    from .models import Payment_history, Print_history, report
    from django.db.models import Sum

    now = timezone.localtime(timezone.now())
    last_month = now - timezone.timedelta(days=30)
    
    
    totalPayment = Payment_history.objects.filter(date_payment__lt=now, date_payment__gte=last_month).aggregate(Sum('transaction_amount'))['transaction_amount__sum'] or 0
    totalPrinting = Print_history.objects.filter(datetime__lt=now, datetime__gte=last_month).aggregate(Sum('numberOfPages'))['numberOfPages__sum'] or 0

    new_report = report(
        totalPaperBuying=totalPayment,
        totalPaperPrinting=totalPrinting,
        datetime=now
    )
    new_report.save()
    print(f"Báo cáo đã được tạo thành công lúc {now}")

def run_scheduler():
    schedule.every(30).days.at("00:00").do(createReportEveryMonth)
    # schedule.every(5).seconds.do(createReportEveryMonth)
    
    while True:
        schedule.run_pending()
        time.sleep(1)

class MyappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'myapp'
    def ready(self):
        if os.environ.get('RUN_MAIN') == 'true':
            threading.Thread(target=run_scheduler).start()
            print("Scheduler started")
    
