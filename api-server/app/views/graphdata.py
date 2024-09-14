from django.http import JsonResponse
from app.repository.client import ClientRepository
from app.repository.csv_data import CsvDataRepository
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import status


@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter('client_id', openapi.IN_QUERY, description="Client ID", type=openapi.TYPE_STRING),
        openapi.Parameter('import_ids', openapi.IN_QUERY, description="Import IDs (comma-separated)", type=openapi.TYPE_ARRAY, items=openapi.Items(type=openapi.TYPE_INTEGER))
    ]
)
@api_view(['GET'])
def get_balance_summary(request):
    client_id = request.GET.get('client_id')
    import_ids= request.GET.get('import_ids')
    
    if not import_ids:
        return JsonResponse({"error": "Client not found"}, status=status.HTTP_400_BAD_REQUEST)

    import_ids= import_ids.split(',')

    # Obtém o cliente pelo ID usando o ClientRepository
    client = ClientRepository.get_client_by_id(client_id)
    if not client:
        return JsonResponse({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)

    # Filtra os dados CSV com base no client_id e nos import_ids fornecidos.
    csv_data = CsvDataRepository.get_csv_data_by_import_ids_and_client(import_ids, client)

    # Agrupa por mês e por import_id, somando os valores de balance
    response_data = CsvDataRepository.get_monthly_balance_summary(csv_data)

    return JsonResponse(response_data, safe=False, status=status.HTTP_400_BAD_REQUEST)
