from django.contrib import admin
from app.models.client import Client
from app.models.csv_data import CsvData
from app.models.csv_import import CsvImport

admin.site.register(Client)
admin.site.register(CsvData)
admin.site.register(CsvImport)
