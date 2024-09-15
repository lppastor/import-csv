from ..repository.client import ClientRepository
from app.serializers import ClientSerializer
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_exempt
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@csrf_exempt
@swagger_auto_schema(
    method='post',
    request_body=ClientSerializer,  # Definindo o corpo da requisição
    responses={
        201: openapi.Response('User created Successfully'),
        400: openapi.Response('Passwords do not match, please confirm password and try again')
    }
)
@api_view(['post'])
def Create_client(request):
    serializer = ClientSerializer(data = request.data)

    if serializer.is_valid():
        data = serializer.validated_data
        
        if data['password'] != data['password_confirm']:
            return Response({"error":"Passwords do not match, please confirm password and try again"}, status = status.HTTP_400_BAD_REQUEST)
        
        try:
            client = ClientRepository.create_user(
                first_name = data['first_name'],
                last_name= data['last_name'],
                email= data['email'],
                password= data['password'],
            )
            refresh = RefreshToken.for_user(client) # Gera token de refresh jwt
            
            return Response(
                {
                "refresh_token": str(refresh),
                "access_token": str(refresh.access_token),
                "message":"User created Successfully",
             

                
                }, status = status.HTTP_201_CREATED
                )

            
        except ValidationError as e:
            return Response({"Error":str(e)}, status= status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


            
            