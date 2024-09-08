from ..repository.csv_data import CsvDataRepository
from ..repository.client import ClientRepository
from django.http import Http404
from django.http import JsonResponse
from django.core.exceptions import BadRequest



def get_user_imports(request, user_id):
    Client= ClientRepository.get_client_by_id(user_id)
    if not Client:
        raise BadRequest('Client not found. Please check the client ID and try again') ## Return error
    
    #Busca informações sobre os dados do csv    
    imports = CsvDataRepository.get_import_by_client(Client)
    
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
        
    return JsonResponse(response_data, safe=False, status=200)