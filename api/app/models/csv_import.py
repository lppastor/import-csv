from django.db import models

class CsvImport(models.Model):
    import_id= models.AutoField(primary_key= True)
    import_name= models.IntegerField()
    csv_import_date= models.DateTimeField(auto_now_add= True)
    type_import= models.IntegerField()
    client= models.ForeignKey('app.Client', to_field= "client_id", on_delete=models.CASCADE)
    created_at= models.DateTimeField(auto_now_add= True)
    
    def __str__(self):
        return f"Import {self.import_id} for {self.client}"
