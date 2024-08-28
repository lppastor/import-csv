# Django setup

## Seguindo este tutorial

- https://docs.djangoproject.com/en/5.1/intro/tutorial01/#creating-a-project

### Start config

```
django-admin startproject myapp

```

### Run server

```
$ python manage.py runserver

```
Acesse: http://127.0.0.1:8000/


O servidor de desenvolvimento recarrega automaticamente o código Python para cada solicitação, conforme necessário. Você não precisa reiniciar o servidor para que as alterações no código entrem em vigor. No entanto, algumas ações, como adicionar arquivos, não acionam uma reinicialização, então você terá que reiniciar o servidor nesses casos.

### Directory

``` shell
mysite/
    manage.py
    mysite/
        __init__.py
        settings.py
        urls.py
        asgi.py
        wsgi.py

```
- Manage.py  Arquivo de inicialização do app >[documentation](https://docs.djangoproject.com/en/5.1/ref/django-admin/)
- mysite/settings.py Arquivo de configurações  > [documentation](https://docs.djangoproject.com/en/5.1/topics/settings/)
- mysite/urls Arquivo de declaração de urls > [documentation](https://docs.djangoproject.com/en/5.1/topics/http/urls/)
- mysite/asgi.py Arquivo de declaração de servidores ASGI > [documentation](https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/)
- mysite/wsgi.py Arquivo de declaração de servidores WSGI > [documentation](https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/)


### Iniciando poll

Projetos vs. aplicativos

Qual é a diferença entre um projeto e um aplicativo? Um aplicativo é um aplicativo da web que faz algo – por exemplo, um sistema de blog, um banco de dados de registros públicos ou um pequeno aplicativo de pesquisa. Um projeto é uma coleção de configurações e aplicativos para um site específico. Um projeto pode conter vários aplicativos. Um aplicativo pode estar em vários projetos.

``` shell
 python manage.py startapp polls
```

## Directory pools

```
polls/
    __init__.py
    admin.py
    apps.py
    migrations/
        __init__.py
    models.py
    tests.py
    views.py
```


## Migrations
É Mais recomendado pelo framework ultilizar models.py invés de models.sql diretamente.

### Criar nova migrations com base nas alterações em models.py

Irá criar um arquivo 001_inicial.py em /polls/migrations

```
python manage.py makemigrations
```

### Aplicar migrations no banco de dados

```
python manage.py migrate
```

### Ver Migrations aplicadas

```
python manage.py showmigrations
```