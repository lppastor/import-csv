import google.auth.transport.requests
import google.oauth2.id_token
from allauth.socialaccount.models import SocialAccount
from rest_framework_simplejwt.tokens import RefreshToken

from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

@api_view(['GET'])
@permission_classes([AllowAny])
def google_login_callback(request):
    
    return JsonResponse({"status":"rota de redirect após autenticação"})
    
    
    
    
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
