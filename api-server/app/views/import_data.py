from django.shortcuts import render
from django.http import Http404
from django.http import JsonResponse
from django.http import HttpResponse
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
                "status":"Deu bao fi"
            },status=201)        
        
        except Exception as e:
            return JsonResponse({
                "error":"deu ruim"
            })
  
  
  
def get_user_imports(request, user_id):
    Client= ClientRepository.get_client_by_id(user_id)
    if not Client:
        raise Http404('Client not found. Please check the client ID and try again')
    
    #Busca informações sobre os dados do csv    
    imports = CsvDataRepository.get_import_by_client(Client)
    
    response_data = []
    for import_obj in imports:
        csv_data_list = list(
            CsvDataRepository.get_csv_data_by_import(import_obj)
        )
        
        import_data = {
            "import_id":import_obj.import_id,
            "import_type": import_obj.type_import,
            "created_at": import_obj.created_at,
            "data": csv_data_list
        }
        
        response_data.append(import_data)
        
    return JsonResponse(response_data, safe=False, status=200)