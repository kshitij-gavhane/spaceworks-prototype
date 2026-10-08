from fastapi import FastAPI
from pydantic import BaseModel, EmailStr

app = FastAPI(title='Spaceworks API', version='0.1.0')

class Enquiry(BaseModel):
    name: str
    email: EmailStr
    phone: str
    project_type: str
    location: str | None = None
    message: str | None = None

@app.get('/health')
def health():
    return {'status': 'ok', 'service': 'spaceworks-api'}

@app.post('/enquiry')
def create_enquiry(payload: Enquiry):
    # Prototype only. Persist to PostgreSQL in the production integration phase.
    return {'status': 'received', 'name': payload.name}
