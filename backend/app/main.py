from fastapi import FastAPI

app = FastAPI(
    title="FastAPI Template",
    description="A template for FastAPI projects",
    version="0.1.0",
    openapi_url="/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)


@app.get("/")
def read_root():
    return {"message": "Hello World"}
