from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


def index(request):
    return HttpResponse("Hello word")


def helloWord(request):
    return HttpResponse("Pai é bão")