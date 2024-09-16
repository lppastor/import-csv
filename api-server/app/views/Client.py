from ..repository.client import ClientRepository
from app.serializers import ClientSerializer,ClientLoginSerializer
from ..models.client import Client
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@swagger_auto_schema(
    method='post',
    request_body=ClientSerializer,  # Definindo o corpo da requisição
    responses={
        201: openapi.Response('User created Successfully'),
        400: openapi.Response('Passwords do not match, please confirm password and try again')
    }
)
@api_view(['post'])
@permission_classes([AllowAny])
def Create_client(request):
    serializer = ClientSerializer(data = request.data)

    if serializer.is_valid():
        data = serializer.validated_data        
        
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




@swagger_auto_schema(
    method='post',
    request_body=ClientLoginSerializer,  # Definindo o corpo da requisição
    responses={
        200: openapi.Response('Login succesfully'),
        400: openapi.Response('Invalid user')
    }
)
@api_view(['POST'])
@permission_classes([AllowAny])
def ClientLogin(requests):
    serializer= ClientLoginSerializer(data= requests.data)

    if serializer.is_valid():
        try:
            tokens= ClientRepository.login(
                email=serializer.validated_data['email'],  
                password=serializer.validated_data['password'] 
            )
            
            return Response(tokens, status=status.HTTP_200_OK)
        
        except Client.DoesNotExist:
            # Caso o usuário não seja encontrado no banco de dados
            return Response({"error": "Invalid email or password. Please try again."}, status=status.HTTP_404_NOT_FOUND)
        
        except ValueError as e:
            return Response({"error":str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

            
            