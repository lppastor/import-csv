import google.auth.transport.requests
import google.oauth2.id_token
from allauth.socialaccount.models import SocialAccount
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import redirect
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny



def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    
    
@api_view(['GET'])
@permission_classes([AllowAny])
def google_login_callback(request):
    # Verifica se o usuário está autenticado
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Usuário não autenticado."}, status=401)
    
    # Verifica se o campo client_id está presente
    if not hasattr(request.user, 'client_id') or not request.user.client_id:
        return JsonResponse({"error": "Client ID não encontrado para o usuário."}, status=400)

    # Gera o JWT para o usuário autenticado
    tokens = get_tokens_for_user(request.user)
    access_token = tokens['access']
    
    # URL do frontend
    frontend_url = 'http://127.0.0.1:8000/app/swagger/'
    redirect_url = f'{frontend_url}?token={access_token}'
    
    # Redireciona o usuário para o frontend com o token na URL
    return redirect(redirect_url)

    
    
    
    # token = request.data.get('token')  # O token JWT enviado pelo Google

    # try:
    #     # Valida o token do Google
    #     request_adapter = google.auth.transport.requests.Request()
    #     id_info = google.oauth2.id_token.verify_oauth2_token(token, request_adapter)

    #     # Se o token for válido, extraia o ID do usuário
    #     google_user_id = id_info['sub']
    #     email = id_info['email']
    #     name = id_info['name']

    #     # Verifique se o usuário já existe no banco de dados
    #     user = SocialAccount.objects.filter(uid=google_user_id).first()

    #     if user:
    #         # Gera o JWT usando o usuário existente
    #         refresh = RefreshToken.for_user(user.user)
    #         return JsonResponse({
    #             'token': str(refresh.access_token),
    #             'name': name,
    #             'email': email,
    #         })
    #     else:
    #         # Se o usuário não existir, crie uma nova conta ou associe o Google Account
    #         # Criação de novo usuário ou lógica de associação do Google Account aqui
    #         return JsonResponse({'error': 'User not found'}, status=404)
    
    # except ValueError:
    #     # Token inválido
    #     return JsonResponse({'error': 'Invalid token'}, status=401)
