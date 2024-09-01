from django.urls import path

from  .views import views

urlpatterns = [
    path("", views.index, name= "index"),
    path("imports/", views.helloWord, name="members"), ## Return array de ids importado pelo usuarip
]