from fastapi import FastAPI
from starlette.staticfiles import StaticFiles

from os.path import dirname, join, split


app = FastAPI()




@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


app.mount("/", StaticFiles(directory=join(split(__file__)[0], 'public')), name="static")
