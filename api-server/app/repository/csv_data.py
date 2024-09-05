from ..models.csv_data import CsvData  # Import table
from ..models.csv_import import CsvImport
from django.db import models
from django.db.models import Sum
from django.db.models.functions import TruncMonth


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
    
    @classmethod
    def  get_csv_data_by_import_ids_and_client(cls, import_ids, client):
        """Filtra os dados do csv com base nos ids importados"""
        return CsvData.objects.filter(import_id__in=import_ids, import_id__client= client)
    
    @classmethod
    def get_monthly_balance_summary(cls, csv_data):
        """Agrupa por mês e soma a coluna balance"""
        balance_sumary= csv_data.annotate(
            month= TruncMonth("date_time")
        ).values(
            'month','import_id'
        ).annotate(
            total_balance= Sum('balance')
        ).order_by('month')

        response_data = {}
        for entry in balance_sumary:
            month= entry['month'].strftime('%Y-%m')
            import_id= entry['import_id']
            if month not in response_data:
                response_data[month]= {}
            response_data[month][f'Import {import_id}']= entry['total_balance']    
        
        # Converter para lista de json
        formatted_response= []
        for month, import_data in response_data.items():
            formatted_entry= {'month':month}
            formatted_entry.update(import_data)
            formatted_response.append(formatted_entry)

        return formatted_response