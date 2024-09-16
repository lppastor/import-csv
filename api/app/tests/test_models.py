from app.models.client import Client
from app.models.csv_data import CsvData
from app.models.csv_import import CsvImport
from django.test import TestCase
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from uuid import uuid4


class TestModels(TestCase):
    
    def setUp(self):
        self.client = Client.objects.create(
            client_id= uuid4() ,
            client_date = timezone.now(),
            name= "Lucas.Campos",
            email= "Lucasmacielcampos90@gmail.com",
            password= make_password("br@@remoto")   
        )
        
        self.csv_import = CsvImport.objects.create(
            import_id = 1,
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



    def test_client_creation(self):
        self.assertEqual(self.client.name, "Lucas.Campos")
        self.assertEqual(self.client.email, "Lucasmacielcampos90@gmail.com")
        
    def test_csv_import_creation(self):
        self.assertEqual(self.csv_import.client, self.client)
        self.assertEqual(self.csv_import.type_import, 1)
        
        

    def test_csv_data_creation(self):
        self.assertEqual(self.csv_data.balance, 1000.0)
        self.assertEqual(self.csv_data.balance, 1000.0)
        self.assertEqual(self.csv_data.equity, 500.0)
        self.assertEqual(self.csv_data.deposit, 200.0)
        self.assertEqual(self.csv_data.import_id, self.csv_import)        
