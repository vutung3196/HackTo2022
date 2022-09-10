from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

def fetch_data():
    df = pd.read_csv("./6719b900-1bf9-4678-b9a0-547e30a24846.csv", index_col ="_id", low_memory=False)
    newdf = df.query('ACCLASS == "Fatal"')
    neighborhood = newdf['NEIGHBOURHOOD'].value_counts()
    print(neighborhood)


@app.route("/")
def hello():
    return jsonify("hello!"), 200

@app.get("/fatal")
def get_neighbourhood():
    data = fetch_data().to_json()
    print(data)
    return data,200