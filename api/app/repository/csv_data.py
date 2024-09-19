from ..models.csv_data import CsvData  # Import table
from ..models.csv_import import CsvImport
from django.db import models
from django.db.models import Sum,Count
from django.db.models.functions import TruncMonth


class CsvDataRepository:
    
    @classmethod    
    def create_csv_import(cls, client, import_type,import_name):
        return CsvImport.objects.create(
            import_name= int(import_name),
            client=client,
            type_import= import_type
        )
        
          
    @classmethod
    def create_csv_data(cls,csv_import, date_time, balance, equity, deposit):
        return CsvData.objects.create(
            import_name= csv_import,
            date_time= date_time,
            balance= balance,
            equity= equity,
            deposit= deposit 
        )
    
    @classmethod
    def get_import_by_client(cls,client):
        return CsvImport.objects.filter(client=client)
    
    @classmethod
    def import_id_exists(cls,import_name, client):
        return CsvImport.objects.filter(import_name=import_name, client=client).exists()

    
    @classmethod
    def get_csv_data_by_import(cls, import_obj):
        return CsvData.objects.filter(import_name=import_obj).aggregate(
            balance_sum= Sum('balance'),
            equity_sum= Sum('equity'),
            deposit_sum= Sum('deposit'),
            data_lines=Count('csv_id')
        )
    

    @classmethod
    def get_csv_data_by_import_name_and_client(cls, import_name, client):
        if not isinstance(import_name, list):
            import_name = [import_name]
    
        # Realiza a filtragem com base no nome de importação e no cliente
        return CsvData.objects.filter(import_name__import_name__in=import_name, import_name__client=client)
        
    @classmethod
    def get_monthly_balance_summary(cls, csv_data):
        """Agrupa por mês e soma a coluna balance"""
        balance_sumary= csv_data.annotate(
            month= TruncMonth("date_time")
        ).values(
            'month','import_name__import_name'
        ).annotate(
            total_balance= Sum('balance')
        ).order_by('month')

        #Extrar id dos imports
        import_names= csv_data.values_list('import_name__import_name', flat=True).distinct()
        
        response_data = {}
        for entry in balance_sumary:
            month= entry['month'].strftime('%Y-%m')
            import_name= entry['import_name__import_name']
            
            if month not in response_data:
                response_data[month]= {f'Import {i}':0 for i in import_names}
            
            response_data[month][f'Import {import_name}']= entry['total_balance']
            
        # Converter para lista de json
        formatted_response= []
        for month, import_data in response_data.items():
            formatted_entry= {'month':month}
            formatted_entry.update(import_data)
            formatted_response.append(formatted_entry)

        return formatted_response
    

    @classmethod
    def delete_csv_import(cls, import_name, client):
        try:
            # Tenta buscar a importação pelo nome e cliente
            csv_import = CsvImport.objects.get(import_name=import_name, client=client)
            
            # Deleta a importação e seus dados relacionados
            csv_import.delete()
            return True  # Retorna True para indicar que a deleção foi bem-sucedida
        except CsvImport.DoesNotExist:
            return False  # Retorna False se a importação não for encontrada
        except Exception as e:
            # Pode retornar uma mensagem de erro para logs ou depuração
            return {"error": str(e)}
    
        