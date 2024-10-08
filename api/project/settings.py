from pathlib import Path
import os
from dotenv import load_dotenv 
from datetime import timedelta
from django.http import HttpResponseRedirect

load_dotenv() # build .env

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("DJANGO_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['0.0.0.0', '127.0.0.1', 'localhost']
CORS_ORIGIN_ALLOW_ALL=True

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'rest_framework',
    'rest_framework_simplejwt',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'drf_yasg',
    'app',
    'allauth.socialaccount.providers.google'

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'allauth.account.middleware.AccountMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware'
]

ROOT_URLCONF = 'project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('POSTGRES_DB'),
        'USER': os.getenv('POSTGRES_USER'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
        'HOST': os.getenv('POSTGRES_HOST'),
        'PORT': os.getenv('POSTGRES_PORT'),
        
    }
}

AUTH_USER_MODEL = 'app.Client'

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',  # Adicione isso
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),  # Tempo de expiração do token de acesso
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),  # Tempo de expiração do token de refresh
    'USER_ID_FIELD': 'client_id',  # Valor padrão que o JWT busca é o campo id, como o nosso é client_id tenho que apontar este
    'USER_ID_CLAIM': 'client_id',  # O campo que será incluído no payload do JWT
    'AUTH_HEADER_TYPES': ('Bearer',),  # Tipo do cabeçalho de autenticação
    
}

SITE_ID = 4 # Define o id do site na tabela djago_site do banco de dados 
CORS_ORIGIN_ALLOW_ALL = True  

# Cria automaticamente uma conta se o usuário fizer login com uma rede social e não tiver uma conta existente.
SOCIALACCOUNT_AUTO_SIGNUP = True

# Define o campo de e-mail no modelo de usuário que será usado para login e associações.
ACCOUNT_USER_MODEL_EMAIL_FIELD = 'email'

# Exige que google retorne o e-mail do usuário para completar o login ou cadastro.
SOCIALACCOUNT_EMAIL_REQUIRED = True

# Desativa verificação de Email dentro da aplicação pois ja é verificado o email dentro do google
SOCIALACCOUNT_EMAIL_VERIFICATION = 'none'

# Usa o e-mail retornado pela rede social para autenticação de usuários.
SOCIALACCOUNT_EMAIL_AUTHENTICATION = True


# Define os scope retornado do google
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    }
}

# Envia o cliente direto para url de autenticação do google
SOCIALACCOUNT_LOGIN_ON_GET = True

# Rota onde sera direcionado o cliente após login
LOGIN_REDIRECT_URL = '/app/google_callback'