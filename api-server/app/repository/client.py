from django.db import models
from ..models.client import Client
from django.contrib.auth.hashers import make_password  # Create Hash passworf PBKDF2 com Salt
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from datetime import datetime

Client = get_user_model() # Busca a model personalizada de Client

class ClientRepository:
    @classmethod
    def create_user(cls, first_name, last_name, email, password, username = None, is_superuser = False, is_staff = False, is_active = True):
        if Client.objects.filter(email=email).exists():
            raise ValidationError("Um usuario com este email ja existe")      
        
        
        
        user = Client.objects.create_user(
            first_name = first_name,
            last_name = last_name,
            email = email,
            password = password,
            username = email,
            is_superuser = is_superuser,
            is_staff = is_staff,
            is_active = is_active,
            date_joined  = datetime.now(),   
        )
        return user
    
    
    @classmethod
    def login(cls, email, password):
        
        user= authenticate(
            email= email,
            password= password
        )
        
        if not user:
            return Response({"message": "Invalid credentials"}, status= status.HTTP_400_BAD_REQUEST)

        refresh= RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
        
        
        
    @classmethod    
    def get_client_by_id(cls, client_id):
        try:
            return Client.objects.get(client_id=client_id)
        except Client.DoesNotExist:
            return None  
        
    