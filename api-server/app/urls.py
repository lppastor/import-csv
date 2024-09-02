from django.urls import path
from .views.import_data import import_data,get_user_imports
urlpatterns = [
    path("import-data/", import_data, name="import_data"),
    path('user-imports/<str:user_id>/', get_user_imports, name='user_imports')
]