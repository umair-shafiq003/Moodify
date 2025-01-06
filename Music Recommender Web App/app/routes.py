from flask import Response, request, jsonify
from app import app
from app.spotify import get_playlist_recommendations
from app.model import predict_mood
import os

@app.route("/")
def index():
    with open('index.html', 'r') as file:
        html_content = file.read()
    return Response(html_content, content_type='text/html')

@app.route("/styles.css")
def css():
    with open('static/styles.css', 'r') as file:
        html_content = file.read()
    return Response(html_content, content_type='text/css')

@app.route("/scripts.js")
def js():
    with open('static/scripts.js', 'r') as file:
        html_content = file.read()
    return Response(html_content, content_type='text/js')

@app.route("/cloud.jpg")
def pic():
    with open('cloud.jpg', 'rb') as file:  
        image_data = file.read()
    return Response(image_data, content_type='image/jpeg')



@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get('text', '')
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    mood = predict_mood(text)
    return jsonify({'prediction': mood})

@app.route('/playlist-recommendations')
def playlist_recommendations():
    mood = request.args.get('mood', '')
    if not mood:
        return jsonify({'error': 'Mood not provided'}), 400

    playlists = get_playlist_recommendations(mood)
    return jsonify({'playlists': playlists})