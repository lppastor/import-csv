from django.db import models
import uuid
from .csv_import import CsvImport

class CsvData(models.Model):
    csv_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    import_record = models.ForeignKey(CsvImport, on_delete=models.CASCADE)
    date_time = models.DateTimeField()
    balance = models.FloatField()
    equity = models.FloatField()
    deposit = models.FloatField()

    def __str__(self):
        return f"Data record {self.csv_id} for import {self.import_record.import_id}"

    # Query put 

    # Query get

    # Query delete

    # Query post