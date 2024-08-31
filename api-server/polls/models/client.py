from django.db import models
from django.contrib.auth.hashers import make_password  # Create Hash passworf PBKDF2
import uuid

class Client(models.Model):
    client_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client_date = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=40)
    email = models.EmailField(max_length=64)
    password = models.CharField(max_length=256)

    def __str__(self):
        return self.name
    

    # Insert Query
    @classmethod
    def insert_user(name,email,password):
        hash_password = make_password(password)
        user = Client(
            name = name,
            email = email,
            password = hash_password
        )
        return user
        user.save() # Inset database



    