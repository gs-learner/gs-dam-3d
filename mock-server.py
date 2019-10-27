from flask import  Flask, send_file

app = Flask(__name__, static_folder='build/static')

@app.route('/')
def index():
    return send_file('build/index.html')

@app.route('/<p>')
def index_file(p):
    return send_file('build/'+p)

@app.route('/image/<p>')
def image_file(p):
    return send_file('build/image/'+p)

if __name__ == "__main__":
    app.run(host="0.0.0.0")
