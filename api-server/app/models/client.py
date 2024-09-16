from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class Client(AbstractUser):
    client_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username'] 
    
    def __str__(self):
        return self.email