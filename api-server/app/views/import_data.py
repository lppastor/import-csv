from django.shortcuts import render
from django.http import Http404
from django.http import JsonResponse
from django.http import HttpResponse
from django.core.exceptions import BadRequest
from django.views.decorators.csrf import csrf_exempt
from ..repository.client import ClientRepository # type: ignore
from ..repository.csv_data import CsvDataRepository
import json
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi



# POST CSV DATA R
@csrf_exempt
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'client_id': openapi.Schema(type=openapi.TYPE_STRING, description='ID do cliente'),
            'import_type': openapi.Schema(type=openapi.TYPE_STRING, description='Tipo de importação'),
            'data': openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'date': openapi.Schema(type=openapi.TYPE_STRING, description='Data em formato ISO'),
                        'balance': openapi.Schema(type=openapi.TYPE_NUMBER, description='Saldo'),
                        'equity': openapi.Schema(type=openapi.TYPE_NUMBER, description='Equity'),
                        'deposit': openapi.Schema(type=openapi.TYPE_NUMBER, description='Depósito'),
                    }
                )
            ),
        },
        required=['client_id', 'import_type', 'data'],
        example={
            'client_id': '12345',
            'import_type': 'tipo_de_importacao',
            'data': [
                {
                    'date': '2024-09-11T00:00:00Z',
                    'balance': 1000.0,
                    'equity': 1500.0,
                    'deposit': 500.0,
                },
                {
                    'date': '2024-09-12T00:00:00Z',
                    'balance': 2000.0,
                    'equity': 2500.0,
                    'deposit': 1000.0,
                }
            ]
        }
    )
)
@api_view(['POST'])
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
        
@api_view(['GET'])          
def get_csv_data(request):
    client_id = request.GET.get('client')
    import_id_str = request.GET.get('import_id')

    import_id = int(import_id_str)
   # Buscar dados que correspondam ao cliente e à importação
    csv_data = CsvDataRepository.get_csv_data_by_import_id_and_client(import_id, client_id)
        
       
    if not csv_data.exists(): 
        return JsonResponse({"status": "CSV data not found."}, status=404)
 
    csv_list = []

    
    for obj in csv_data:
        csv_list.append({
            "csv_import_id": obj.import_id.import_id,
            "date_time": obj.date_time.isoformat(),  
            "balance": float(obj.balance),  
            "equity": float(obj.equity),    
            "deposit": float(obj.deposit)   
        })
        
    # Retornar os dados como JSON com status 200
    return JsonResponse(csv_list, safe=False, status=200)

