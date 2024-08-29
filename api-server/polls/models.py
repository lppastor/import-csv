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

class CsvImport(models.Model):
    import_id = models.AutoField(primary_key=True)
    csv_import_date = models.DateTimeField(auto_now_add=True)
    type_import = models.IntegerField()
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Import {self.import_id} for {self.client.name}"

class CsvData(models.Model):
    csv_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    import_record = models.ForeignKey(CsvImport, on_delete=models.CASCADE)
    date_time = models.DateTimeField()
    balance = models.FloatField()
    equity = models.FloatField()
    deposit = models.FloatField()

    def __str__(self):
        return f"Data record {self.csv_id} for import {self.import_record.import_id}"
