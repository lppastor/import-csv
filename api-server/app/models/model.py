from pydantic import BaseModel
from datetime import date
from uuid import UUID

class Client(BaseModel):
    name: str
    email: str
    password: str

class Csv_import(BaseModel):
    csv_import_date: date
    client_id_fk: UUID
    
class Csv_data(BaseModel):
    date: date
    balance: float
    equity: float
    deposit: float
    csv_import_id_fk: UUID
