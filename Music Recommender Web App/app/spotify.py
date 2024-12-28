import spotipy
from spotipy.oauth2 import SpotifyOAuth
from random import random,choice

# Spotify API credentials
CLIENT_ID = 'CLIENT_ID'
CLIENT_SECRET = 'CLIENT_SECRET'
REDIRECT_URI = 'http://localhost:8888/callback'
SCOPE = 'user-library-read user-top-read playlist-modify-public'

# Initialize Spotify client
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    redirect_uri=REDIRECT_URI,
    scope=SCOPE,
    cache_path=".cache"  # Caches token for reuse
))

import random
import spotipy
from spotipy.oauth2 import SpotifyOAuth

import random

# Updated mood-to-playlist mapping
MOOD_PLAYLIST_MAP = {
    'joy': ['party'], 
            
    'sadness': ['melancholy', 
                'chill',
                'sad'],  
                    
    'neutral': ['focus',      # Playlists for study, focus, or relaxation
                'chillhop',    # Lo-fi and chill hip-hop for concentration
                'ambient',     # Calm, instrumental music for background relaxation
                'acoustic']    # Soothing acoustic tracks for unwinding
}

def get_playlist_recommendations(mood):
    """Fetch playlist recommendations based on mood, randomly selecting from mapped genres."""
    # Get playlist categories for the given mood and pick one randomly
    mood_query = random.choice(MOOD_PLAYLIST_MAP.get(mood, ['happy']))  # Default to 'happy' if mood not found
    try:
        print(f"Searching playlists for mood: {mood_query}")  # Debug log
        results = sp.search(q=f'playlist {mood_query}', type='playlist', limit=5)
        print(f"API Response: {results}")  # Debug log

        return [
            {
                'name': playlist['name'],
                'link': playlist['external_urls']['spotify']
            }
            for playlist in results['playlists']['items']
        ]
    except spotipy.exceptions.SpotifyException as e:
        print(f"Spotify API error: {e}")
        return [{'error': 'Failed to fetch playlists'}]
    except Exception as e:
        print(f"Unexpected error: {e}")
        return [{'error': 'An unexpected error occurred'}]
