from django.db import models
from models.client import Client
from django.contrib.auth.hashers import make_password  # Create Hash passworf PBKDF2



## METHOD POST
@classmethod
def create_user(name,email,password):
    passwd_hash = make_password(password) # Generate Hash
    user = Client(
      name = name,
      email = email,
      password = passwd_hash # Insert Hash
    )
    user.save()
    
    
    
    