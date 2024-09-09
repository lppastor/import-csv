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
        
    # class csv_data(models.Model):
    # csv_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # import_id = models.ForeignKey(CsvImport, on_delete=models.CASCADE)
    # date_time = models.DateTimeField()
    # balance = models.FloatField()
    # equity = models.FloatField()
    # deposit = models.FloatField()


    
    # import_id = models.AutoField(primary_key=True)
    # csv_import_date = models.DateTimeField(auto_now_add=True)
    # type_import = models.IntegerField()
    # client = models.ForeignKey(Client, on_delete=models.CASCADE)
    # created_at = models.DateTimeField(auto_now_add=True)

        
        
        
    #     class CsvData(models.Model):
    # csv_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # import_id = models.ForeignKey(CsvImport, on_delete=models.CASCADE)
    # date_time = models.DateTimeField()
    # balance = models.FloatField()
    # equity = models.FloatField()
    # deposit = models.FloatField()

    # def __str__(self):
    #     return f"Data record {self.csv_id} for import {self.import_id.import_id}"
