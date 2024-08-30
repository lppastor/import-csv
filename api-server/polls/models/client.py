from django.db import models
import uuid

class Client(models.Model):
    client_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client_date = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=40)
    email = models.EmailField(max_length=64)
    password = models.CharField(max_length=256)

    def __str__(self):
        return self.name
    

    # Query put 

    # Query get

    # Query delete

    # Query post