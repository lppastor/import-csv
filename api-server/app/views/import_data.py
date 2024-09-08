from django.shortcuts import render
from django.http import Http404
from django.http import JsonResponse
from django.http import HttpResponse
from django.core.exceptions import BadRequest
from django.views.decorators.csrf import csrf_exempt
from ..repository.client import ClientRepository # type: ignore
from ..repository.csv_data import CsvDataRepository
import json

# POST CSV DATA R
@csrf_exempt
def import_data(request):
    if request.method == "POST":
        try:
            #Data Parse
            body= json.loads(request.body)
            client_id= body.get('client_id')
            import_type = body.get('import_type')
            data_list = body.get("data")

            client = ClientRepository.get_client_by_id(client_id) # Indentifica o Cliente 
            
            if not client:
                return JsonResponse({
                    "error":"Client not found"
                    },status=404
                    )
                
            
            #Insert em csv_import
            csv_import = CsvDataRepository.create_csv_import(
                client= client,
                import_type= import_type
            )
            
            # Insert em Csv_data
            
            for data in data_list:
                CsvDataRepository.create_csv_data(
                    csv_import= csv_import,
                    date_time= data['date'],
                    balance= data['balance'],
                    equity= data['equity'],
                    deposit= data['deposit']
                    
                )
                
            return JsonResponse({
                "status":"Insert successfully completed"
            },status=201)        
        
        except Exception as e:
            return BadRequest('Unable to insert csv, please check the information and try again.')