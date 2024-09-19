from django.urls import path
from .views.import_data import import_data, get_csv_data
from .views.get_user_imports import get_user_imports
from .views.graphdata import get_balance_summary
from .views.Client import Create_client, ClientLogin, get_client
from .views.google import google_login_callback
from .views.import_data import delete_csv_data

urlpatterns = [
    path("import-data/", import_data, name="import_data"),
    path('user-imports/', get_user_imports, name='user_imports'),
    path('graph-data/', get_balance_summary, name='graph-data'),
    path('csv-data/', get_csv_data, name='csv-data'),
    path('client/register_client/', Create_client, name="Register Client"),
    path('client/login/', ClientLogin, name= "Login"),
    path('client/me/', get_client, name= "Get Client"),
    path('google_callback', google_login_callback, name='google callback'),
    path('delete/import/', delete_csv_data, name='import delete')
]