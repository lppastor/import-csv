from django.urls import path
from .views.import_data import import_data
from .views.get_user_imports import get_user_imports
from .views.graphdata import get_balance_summary

urlpatterns = [
    path("import-data/", import_data, name="import_data"),
    path('user-imports/<str:user_id>/', get_user_imports, name='user_imports'),
    path('graph-data/', get_balance_summary, name='graph-data'),
]