from dotenv import load_dotenv
from psycopg2.extras import DictCursor
from os import getenv
import psycopg2


load_dotenv() # Load .env in /api-server/app

dbname = getenv('POSTGRES_DB')
dbuser = getenv('POSTGRES_USER')
dbpassword = getenv('POSTGRES_PASSWORD')
dbhost = getenv('POSTGRES_DB_HOST')
dbport = getenv('POSTGRES_DBPORT')

def ConnectDB():
    try:
        conn = psycopg2.connect(
            dbname = f'{dbname}',
            user = f'{dbuser}',
            password = f'{dbpassword}',
            host = f'{dbhost}',
            port= f'{dbport}'

        )

        cursor = conn.cursor(cursor_factory= DictCursor)
        return cursor

    except  psycopg2.Error as e:
        print(f"Erro ao se conectar:{e}")



    

