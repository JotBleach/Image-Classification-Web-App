from flask import Flask, request, jsonify
from flask_cors import CORS
from model import model_predict
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set the upload folder
UPLOAD_FOLDER = 'uploads/'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/predict', methods=['POST'])
def predict():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    file = request.files['file']
    # If user does not select file, browser may submit an empty part without filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        # Make prediction
        try:
            preds = model_predict(filepath)
        except Exception as e:
            os.remove(filepath)
            return jsonify({'error': str(e)}), 500
        # Remove the file after prediction
        os.remove(filepath)
        # Return the predictions
        return jsonify({'predictions': preds})
    else:
        return jsonify({'error': 'File type not allowed'}), 400

if __name__ == '__main__':
    app.run(debug=True)