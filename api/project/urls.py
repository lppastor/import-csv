from django.contrib import admin
from django.urls import include, path
from django.contrib import admin
from django.urls import path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Import-csv API",
        default_version='v1',
        description="Documentação descritiva de nossos endpoints",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="lucasmacielcampos27@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
    authentication_classes=[],
)


urlpatterns = [
    path( 'app/swagger/' , schema_view.with_ui( 'swagger' , cache_timeout= 0 ), name= 'schema-swagger-ui' ), 
    path( 'app/redoc/' , schema_view.with_ui( 'redoc' , cache_timeout= 0 ), name= 'schema-redoc' ), 
    path("app/", include("app.urls")),
    path('admin/', admin.site.urls)
]
