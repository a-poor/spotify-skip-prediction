
import requests
import json
import os
from dotenv import load_dotenv


dotenv_path = os.path.join(os.path.dirname(__file__),'.env')
load_dotenv(dotenv_path)


APP_NAME = os.environment['APP_NAME'] 
CLIENT_ID = os.environment['CLIENT_ID'] 
CLIENT_SECRET = os.environment['CLIENT_SECRET'] 

requests.get(
   
)




