from models.csv_data import CsvData  # Import table
from django.db import models
from models.csv_import import CsvImport,Client

### EXAMPLEEEE
## METHOD POST
@classmethod
def create_csv_import(import_id,date_time, balance, equity, deposit):
    import_record = CsvImport.objects.get(import_id = import_id)
    csv = CsvData(
        import_id = import_record,
        date_time = date_time,
        balance = balance,
        equity = equity,
        deposit = deposit
       )
    

