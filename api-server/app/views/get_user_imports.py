from ..repository.csv_data import CsvDataRepository
from ..repository.client import ClientRepository
from django.http import Http404
from django.http import JsonResponse
from django.core.exceptions import BadRequest
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter(
            'Authorization',  
            openapi.IN_HEADER,  
            description="Token JWT no formato: Bearer <token>",
            type=openapi.TYPE_STRING
        )
    ],
    responses={
        200: 'Sucesso',
        401: 'Não autorizado, token inválido ou ausente'
    }
)
@api_view(['GET'])
@permission_classes([AllowAny])  # Pode realizar requisição sem estar autenticado 
def get_user_imports(request):
    
    if not request.user or request.user.is_anonymous:
        raise BadRequest('Client not found. Please check the client ID and try again') ## Return error
    
    
    client= request.user

    #Busca informações sobre os dados do csv    
    imports = CsvDataRepository.get_import_by_client(client)
    
    response_data = []
    for import_obj in imports:
        csv_data_sumary = CsvDataRepository.get_csv_data_by_import(import_obj)
        
        if import_obj.type_import  not in [1,2]:
            type_import = 'unknow'
        
        elif import_obj.type_import == 1:
            type_import_str = 'direct'
        
        elif import_obj.type_import == 2:
            type_import_str =  'indirect'
        
        
        import_data = [
            {
            "csv_id": import_obj.import_id,
            "import_type": type_import_str,
            "created_at": import_obj.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            "balance_sum":csv_data_sumary.get('balance_sum',0),
            "equity_sum": csv_data_sumary.get("equity_sum",0),
            "deposit_sum": csv_data_sumary.get("deposit_sum",0),
            }
        ]
        
        response_data.append(import_data)
        
    return JsonResponse(response_data, safe=False, status=status.HTTP_200_OK)