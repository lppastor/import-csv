from django.http import JsonResponse
from app.repository.client import ClientRepository
from app.repository.csv_data import CsvDataRepository
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import status


@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter(
            'Authorization',
            openapi.IN_HEADER,
            description= "Token JWT no formato Bearer <token>",
            type= openapi.TYPE_STRING
        ),
        openapi.Parameter(
            'import_name',
            openapi.IN_QUERY,
            description= "Import IDs (comma-separated)",
            type= openapi.TYPE_ARRAY,
            items= openapi.Items(type=openapi.TYPE_INTEGER))
    ]
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_balance_summary(request):
    client= request.user
    import_name = request.GET.get('import_name')
    if not import_name:
        return JsonResponse({"error": "Imports not found"}, status=status.HTTP_400_BAD_REQUEST)

    import_name= import_name.split(',')

    # Obtém o cliente pelo ID usando o ClientRepository
    if not client:
        return JsonResponse({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)

    # Filtra os dados CSV com base no client_id e nos import_name fornecidos.
    csv_data = CsvDataRepository.get_csv_data_by_import_name_and_client(import_name, client)

    # Agrupa por mês e por import_id, somando os valores de balance
    response_data = CsvDataRepository.get_monthly_balance_summary(csv_data)

    return JsonResponse(response_data, safe=False, status=status.HTTP_200_OK)
