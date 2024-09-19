from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ..repository.client import ClientRepository # type: ignore
from ..repository.csv_data import CsvDataRepository
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from app.serializers import CsvDataSerializer, ImportDataSerializer
from rest_framework import status
from rest_framework.response import Response




@swagger_auto_schema(
    method='post',
    request_body=ImportDataSerializer,  # Definindo o corpo da requisição
    manual_parameters=[
        openapi.Parameter(
            'Authorization',
            openapi.IN_HEADER,
            description="Token JWT no formato Bearer <token>",
            type=openapi.TYPE_STRING
        )
    ],
    responses={
        201: openapi.Response('Insert successfully completed'),
        404: openapi.Response('Client not found'),
        400: openapi.Response('Unable to insert csv, please check the information and try again.')
    }
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def import_data(request):
    if request.method == "POST":
        try:
            serializer= ImportDataSerializer(data=request.data)
            
            if serializer.is_valid():
                validate_data= serializer.validated_data

                client= request.user #Indentifica o cliente em meu token
        
                if not client:
                    return JsonResponse({
                        "error":"Client not found"
                        },status=status.HTTP_400_BAD_REQUEST
                        )
                    
                import_name= validate_data['import_name']
                import_type= validate_data['import_type']
                data_list= validate_data['data']        

                if CsvDataRepository.import_id_exists(import_name, client):
                    return Response({
                        "error": "This import_name already exists"
                    }, status= status.HTTP_400_BAD_REQUEST)
                
                if import_type not in [1,2]:
                    return Response({
                        "error": "Type import invalid, please check and try again"
                    }, status= status.HTTP_400_BAD_REQUEST)
                
                #Insert em csv_import
                csv_import = CsvDataRepository.create_csv_import(
                    client= client,
                    import_type= import_type,
                    import_name= import_name,
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
    manual_parameters= [
        openapi.Parameter(
            'Authorization',
            openapi.IN_HEADER,
            description= "Token JWT no formato Bearer <token>",
            type= openapi.TYPE_STRING
        ),
        openapi.Parameter(
            'import_name', 
            openapi.IN_QUERY, 
            description= "Import name", 
            type= openapi.TYPE_INTEGER
        )
    ]
)   
@api_view(['GET'])
@permission_classes([IsAuthenticated])        
def get_csv_data(request):
    client= request.user
    import_name_str = request.GET.get('import_name')

    if import_name_str is None:
        return JsonResponse({"error": "Import name not provided."}, status=status.HTTP_400_BAD_REQUEST)

    import_name = int(import_name_str)
   # Buscar dados que correspondam ao cliente e à importação
    csv_data = CsvDataRepository.get_csv_data_by_import_name_and_client(import_name, client)
        
       
    if not csv_data.exists(): 
        return JsonResponse({"status": "CSV data not found."}, status=status.HTTP_400_BAD_REQUEST)
 
    csv_list = []

    
    for obj in csv_data:
        csv_list.append({
            "csv_import_name": obj.import_name.import_name,
            "date_time": obj.date_time.isoformat(),  
            "balance": float(obj.balance),  
            "equity": float(obj.equity),    
            "deposit": float(obj.deposit)   
        })
        
    # Retornar os dados como JSON com status 200
    return JsonResponse(csv_list, safe=False, status=status.HTTP_200_OK)




@swagger_auto_schema(
    method='get',
    manual_parameters= [
        openapi.Parameter(
            'Authorization',
            openapi.IN_HEADER,
            description= "Token JWT no formato Bearer <token>",
            type= openapi.TYPE_STRING
        ),
        openapi.Parameter(
            'import_name', 
            openapi.IN_QUERY, 
            description= "Import name", 
            type= openapi.TYPE_INTEGER
        )
    ]
) 
@api_view(['GET'])
@permission_classes([IsAuthenticated])   
def delete_csv_data(request):
    client = request.user
    import_name = request.GET.get('import_name')

    if import_name is None:
        return JsonResponse({"error": "Import name not provided."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        import_name = int(import_name)
    except ValueError:
        return JsonResponse({"error": "Invalid import name format."}, status=status.HTTP_400_BAD_REQUEST)

    result = CsvDataRepository.delete_csv_import(import_name, client)
    
    if result is True:
        return JsonResponse({"status": "Deleted import and related CSV data"}, status=status.HTTP_204_NO_CONTENT)
    elif result is False:
        return JsonResponse({"error": "CSV import not found."}, status=status.HTTP_404_NOT_FOUND)
        
      

