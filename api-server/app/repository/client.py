from django.db import models
from ..models.client import Client
from django.contrib.auth.hashers import make_password  # Create Hash passworf PBKDF2 com Salt


class ClientRepository:
    @classmethod
    def create_user(name,email,password):
        passwd_hash = make_password(password) # Generate Hash
        user = Client(
        name = name,
        email = email,
        password = passwd_hash # Insert Hash
        )
        user.save()
        
    @classmethod    
    def get_client_by_id(cls, client_id):
        try:
            return Client.objects.get(client_id=client_id)
        except Client.DoesNotExist:
            return None  
        
    