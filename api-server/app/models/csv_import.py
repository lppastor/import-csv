from django.db import models
from .client import Client

class CsvImport(models.Model):
    import_id = models.AutoField(primary_key=True)
    csv_import_date = models.DateTimeField(auto_now_add=True)
    type_import = models.IntegerField()
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Import {self.import_id} for {self.client.name}"
