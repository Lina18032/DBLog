#import os
#from dotenv import load_dotenv

#load_dotenv()

#class Config:
    #DATABASE_URIS = {
        #"Flask DB": os.getenv("DATABASE_A"),
        #"Quiz db": os.getenv("DATABASE_B"),
        #"algiers db": os.getenv("DATABASE_C"),
        #"pharma db": os.getenv("DATABASE_D"),
        #"students db": os.getenv("DATABASE_E"),
    #}

import json
import os

class Config:
    DATABASE_URIS_PATH = "database_uris.json"

    DATABASE_URIS = {}  

    @staticmethod
    def load_database_uris():
        if os.path.exists(Config.DATABASE_URIS_PATH):
            with open(Config.DATABASE_URIS_PATH) as f:
                return json.load(f)
        return {}

    @staticmethod
    def save_database_uris(data):
        print(f"Saving DBs: {data}")
        with open(Config.DATABASE_URIS_PATH, "w") as f:
            json.dump(data, f, indent=4)

