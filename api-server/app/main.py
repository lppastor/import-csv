from fastapi import FastAPI
# Importar rotas do controllers 


app = FastAPI(debug=True)

# Incluir rotas do controller Example
# app.include_router(user_controller.router, prefix="/users", tags=["users"])