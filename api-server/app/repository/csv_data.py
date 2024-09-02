from ..models.csv_data import CsvData  # Import table
from ..models.csv_import import CsvImport
from django.db import models


class CsvDataRepository:
    
    @classmethod    
    def create_csv_import(cls, client, import_type):
        return CsvImport.objects.create(
            client=client,
            type_import= import_type
        )
    
    
    @classmethod
    def create_csv_data(cls,csv_import, date_time, balance, equity, deposit):
        return CsvData.objects.create(
            import_id= csv_import,
            date_time= date_time,
            balance= balance,
            equity= equity,
            deposit= deposit 
        )

