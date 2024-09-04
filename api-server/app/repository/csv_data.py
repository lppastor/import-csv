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
    
    
    @classmethod
    def get_import_by_client(cls,client):
        return CsvImport.objects.filter(client=client)

    @classmethod
    def get_csv_data_by_import(cls, import_obj):
        return CsvData.objects.filter(import_id=import_obj).values('date_time', 'balance', 'equity', 'deposit')
    

