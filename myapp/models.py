from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from datetime import datetime
class UserManager(BaseUserManager):
    def create_user(self, username, email,full_name, role,availablePages,major,enrollment_year,\
                    working_location,department_name, password=None):
        user = self.model(
            username=username,
            email=email,
            role=role,
            full_name=full_name,
            availablePages=availablePages,
            major=major,
            enrollment_year=enrollment_year,
            working_location=working_location,
            department_name=department_name,
        ) 
        user.set_password(password)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    email = models.CharField(max_length=255, unique=True)
    role = models.CharField(max_length=50,default='')  
    full_name= models.CharField(max_length=255, default='')
    objects = UserManager()

    # student
    availablePages= models.IntegerField(default=0)
    major= models.CharField(max_length=255,default='')
    enrollment_year=models.DateField(default='2024-01-01')
    is_able_buying = models.BooleanField(default=False)

    # SPSO
    working_location=models.CharField(max_length=255,default='')

    # manager
    department_name= models.CharField(max_length=255,default='')
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['role']
    class Meta:
        db_table = 'user'

class Payment_history(models.Model):
    owner_id= models.CharField(max_length=255, default='')
    transaction_amount=models.IntegerField(default=0)
    date_payment= models.DateTimeField(default='2024-01-01 12:00:00')
    class Meta:
        db_table = 'Payment_history'

class Print_history(models.Model):
    file_name=models.CharField(max_length=255,default='')
    file_size=models.IntegerField(default=0)
    owner_id = models.CharField(max_length=255,default='')
    numberOfPages= models.IntegerField(default=0)
    page_id= models.CharField(max_length=255, default='')
    printerId = models.CharField(max_length=255, default='')
    datetime = models.DateTimeField(default='2024-01-01 12:00:00')
    class Meta:
        db_table = 'Print_history'
    
class Printer(models.Model):
    enable_type=models.CharField(max_length=255,default='')
    enable_printing= models.BooleanField(default=True)
    location= models.CharField(max_length=255, default='')
    class Meta:
        db_table = 'Printer'

class Paper(models.Model):
    type= models.CharField(max_length=255,default='')
    costPerPaper=models.IntegerField(default=0)
    page= models.IntegerField(default=1)
    class Meta:
        db_table = 'Paper'

class report(models.Model):
    totalPaperBuying=models.IntegerField(default=0)
    totalPaperPrinting=models.IntegerField(default=0)
    datetime= models.DateField(default='2024-01-01')
    class Meta: 
        db_table = 'report'