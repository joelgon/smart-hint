import os
import time
from dotenv import load_dotenv
from urllib.parse import quote_plus
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_PASSWORD = quote_plus(os.getenv("DATABASE_PASSWORD"))
DATABASE_HOST = os.getenv("DATABASE_HOST")
DATABASE_PORT = os.getenv("DATABASE_PORT")
DATABASE_NAME = os.getenv("DATABASE_NAME")
DATABASE_URL = f"postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}?client_encoding=utf8"

def wait_for_db_connection(retries=5, delay=5):
    while retries > 0:
        try:
            print("Tentando conectar ao banco de dados...")
            engine = create_engine(DATABASE_URL, echo=True)
            with engine.connect() as connection:
                print("Conexão com o banco de dados bem-sucedida!")
                return engine
        except OperationalError as e:
            print(f"Erro ao conectar ao banco de dados: {e}")
            retries -= 1
            print(f"Tentando novamente em {delay} segundos... ({retries} tentativas restantes)")
            time.sleep(delay)
    
    print("Não foi possível conectar ao banco de dados após várias tentativas.")
    raise Exception("Conexão com o banco de dados falhou.")

engine = wait_for_db_connection(retries=10, delay=5)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        print(f"Erro de conexão: {e}")
    finally:
        db.close()
