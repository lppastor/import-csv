from django.db import models
from ..models.client import Client
from django.contrib.auth.hashers import make_password  # Create Hash passworf PBKDF2 com Salt
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from datetime import datetime

Client = get_user_model() # Busca a model personalizada de Client

class ClientRepository:
    @classmethod
    def create_user(cls, first_name, last_name, email, password, username = None, is_superuser = False, is_staff = False, is_active = True):
        if Client.objects.filter(email=email).exists():
            raise ValidationError("Um usuario com este email ja existe")      
        
        hash_passwd = make_password(password)
        
        user = Client.objects.create(
            first_name = first_name,
            last_name = last_name,
            email = email,
            password = hash_passwd,
            username = email,
            is_superuser = is_superuser,
            is_staff = is_staff,
            is_active = is_active,
            date_joined  = datetime.now(),   
        )
        return user
        
        
    @classmethod    
    def get_client_by_id(cls, client_id):
        try:
            return Client.objects.get(client_id=client_id)
        except Client.DoesNotExist:
            return None  
        
    