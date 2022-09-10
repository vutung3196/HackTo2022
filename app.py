import os

from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

def fetch_data(severity):
    df = pd.read_csv("./6719b900-1bf9-4678-b9a0-547e30a24846.csv", index_col ="_id", low_memory=False)
    newdf = df.query('ACCLASS == "' + severity + '"')
    neighborhood = newdf['NEIGHBOURHOOD'].value_counts()
    return neighborhood

@app.route("/")
def hello():
    return jsonify("hello!"), 200

@app.get("/fatal")
def get_neighbourhood_fatal():
    data = fetch_data("Fatal").to_json()
    print(data)
    return data,200

@app.get("/nonfatal")
def get_neighbourhood_nonfatal():
    data = fetch_data("Non-Fatal Injury").to_json()
    print(data)
    return data,200

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)