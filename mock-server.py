from flask import  Flask, send_file

app = Flask(__name__, static_folder='build/static')

@app.route()