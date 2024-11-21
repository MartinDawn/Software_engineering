from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

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
    role = models.CharField(max_length=50,db_default='')  
    full_name= models.CharField(max_length=255, db_default='')
    objects = UserManager()

    # student
    availablePages= models.IntegerField(default=0)
    major= models.CharField(max_length=255,db_default='')
    enrollment_year=models.DateField(db_default='2024-01-01')

    # SPSO
    working_location=models.CharField(max_length=255,db_default='')

    # manager
    department_name= models.CharField(max_length=255,db_default='')
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'role']

    class Meta:
        db_table = 'user'
