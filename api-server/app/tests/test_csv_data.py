from django.test import TestCase
from unittest.mock import MagicMock, patch
from app.models.csv_data import CsvData
from app.models.client import Client
from app.repository.csv_data import CsvDataRepository
from app.models.csv_import import CsvImport
from uuid import uuid4
from django.utils import timezone
from django.contrib.auth.hashers import make_password

class CsvDataRepositoryTest(TestCase):
    
    def setUp(self):
        self.client = Client.objects.create(
            client_id= uuid4() ,
            client_date = timezone.now(),
            name= "Lucas.Campos",
            email= "Lucasmacielcampos90@gmail.com",
            password= make_password("br@@remoto")   
        )
        
        self.csv_import = CsvImport.objects.create(
            csv_import_date = timezone.now(),
            type_import = 1,
            client = self.client,
            created_at = timezone.now()

        )
        
        self.csv_data= CsvData.objects.create(
            csv_id = uuid4(),
            import_id = self.csv_import,
            date_time= timezone.now(),
            balance= 1000.0,
            equity= 500.0,
            deposit= 200.0
            
        )
    
    
    def test_create_csv_import(self):
        import_obj = CsvDataRepository.create_csv_import(self.client, import_type=999)
        self.assertIsNotNone(import_obj)
        self.assertEqual(import_obj.client, self.client)
        self.assertEqual(import_obj.type_import, 999)
        
    def test_create_csv_data(self):
        csv_data_obj = CsvDataRepository.create_csv_data(
            csv_import= self.csv_import,
            date_time= timezone.now(),
            balance= 500.0,
            equity= 500.0,
            deposit= 300.0
        )
        self.assertIsNotNone(csv_data_obj)
        self.assertEqual(csv_data_obj.import_id, self.csv_import)
        self.assertEqual(csv_data_obj.balance, 500.0)
        self.assertEqual(csv_data_obj.equity,500)
        self.assertEqual(csv_data_obj.deposit,300.0)
    
    def test_get_import_by_client(self):
        imports = CsvDataRepository.get_import_by_client(self.client)
        self.assertEqual(len(imports),1)
        self.assertEqual(imports[0], self.csv_import)

    def test_get_csv_data_by_import(self):
        CsvData.objects.create(
            csv_id=uuid4(),
            import_id=self.csv_import,
            date_time=timezone.now(),
            balance=1500.0,
            equity=800.0,
            deposit=400.0
        )
        
        summary = CsvDataRepository.get_csv_data_by_import(self.csv_import) 
        
        self.assertEqual(summary['balance_sum'], 1000.0 + 1500.0)
        self.assertEqual(summary['equity_sum'], 500.0 + 800.0)
        self.assertEqual(summary['deposit_sum'], 200.0 + 400.0)
        self.assertEqual(summary['data_lines'],2)
    
    def test_get_csv_data_by_import_id_and_client(self):
        csv_data = CsvDataRepository.get_csv_data_by_import_id_and_client(self.csv_import.import_id, self.client)
        self.assertEqual(len(csv_data),1)
        self.assertEqual(csv_data[0],self.csv_data)
        
    def test_get_monthly_balance_summary(self):
        
        new_csv_import = CsvImport.objects.create(
            csv_import_date=timezone.now(),
            type_import=2,
            client=self.client,
            created_at=timezone.now()
        )
        
        new_csv= CsvData.objects.create(
            csv_id=uuid4(),
            import_id=self.csv_import,
            date_time=timezone.now(),
            balance=2000.0,
            equity=700.0,
            deposit=400.0
        )
        
        
        csv_data = CsvData.objects.all()
        summary = CsvDataRepository.get_monthly_balance_summary(csv_data)
        self.assertEqual(len(summary), 1)
        self.assertEqual(summary[0]['month'], timezone.now().strftime('%Y-%m'))
        self.assertEqual(summary[0][f'Import {self.csv_import.import_id}'], 3000.0)
        self.assertEqual(summary[0][f'Import {self.csv_import.import_id}'], 3000.0)


        