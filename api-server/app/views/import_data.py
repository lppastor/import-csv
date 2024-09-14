from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ..repository.client import ClientRepository # type: ignore
from ..repository.csv_data import CsvDataRepository
import json
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from app.serializers import CsvDataSerializer, ImportDataSerializer
from rest_framework import status
from rest_framework.response import Response




@csrf_exempt
@swagger_auto_schema(
    method='post',
    request_body=ImportDataSerializer,  # Definindo o corpo da requisição
    responses={
        201: openapi.Response('Insert successfully completed'),
        404: openapi.Response('Client not found'),
        400: openapi.Response('Unable to insert csv, please check the information and try again.')
    }
)
@api_view(['POST'])
def import_data(request):
    if request.method == "POST":
        try:
            serializer = ImportDataSerializer(data=request.data)
            
            if serializer.is_valid():
                validate_data = serializer.validated_data

                client_id = validate_data['client_id']
                import_type = validate_data['import_type']
                data_list = validate_data['data']
                client = ClientRepository.get_client_by_id(client_id) # Indentifica o Cliente 
            
                if not client:
                    return JsonResponse({
                        "error":"Client not found"
                        },status=status.HTTP_400_BAD_REQUEST
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
                },status=status.HTTP_201_CREATED) 
                
            else:
                return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
      

        except Exception as e:
            print(f"Erro: {str(e)}")
            return JsonResponse({
                "error": "Unable to insert csv, please check the information and try again.",
                "details": str(e)  
            }, status=status.HTTP_400_BAD_REQUEST)



@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter('client', openapi.IN_QUERY, description="Client ID", type=openapi.TYPE_STRING),
        openapi.Parameter('import_id', openapi.IN_QUERY, description="Import ID", type=openapi.TYPE_INTEGER)
    ]
)   
@api_view(['GET'])          
def get_csv_data(request):
    client_id = request.GET.get('client')
    import_id_str = request.GET.get('import_id')

    import_id = int(import_id_str)
   # Buscar dados que correspondam ao cliente e à importação
    csv_data = CsvDataRepository.get_csv_data_by_import_id_and_client(import_id, client_id)
        
       
    if not csv_data.exists(): 
        return JsonResponse({"status": "CSV data not found."}, status=status.HTTP_400_BAD_REQUEST)
 
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
    return JsonResponse(csv_list, safe=False, status=status.HTTP_200_OK)

