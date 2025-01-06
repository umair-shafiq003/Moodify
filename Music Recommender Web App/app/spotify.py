import spotipy
from spotipy.oauth2 import SpotifyOAuth
import random

# Spotify API credentials
CLIENT_ID = '4478604cd29f405780a5310c96a3cd23'
CLIENT_SECRET = '31d36da3c5f34b2d82f181ad0a4b4597'
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

# Updated mood-to-playlist mapping
MOOD_PLAYLIST_MAP = {
    'joy': ['party', 'happy', 'dance'],  # Keywords for joyful moods
    'sadness': ['chill', 'sad', 'melancholy'],  
    'neutral': ['focus', 'chillhop', 'ambient', 'acoustic']  # Relaxation or neutral vibes
}

def get_playlist_recommendations(mood):
    """Fetch playlist recommendations based on mood."""
    # Get playlist categories for the given mood and pick one randomly
    mood_query = random.choice(MOOD_PLAYLIST_MAP.get(mood, ['neutral']))

    try:
        print(f"Searching playlists for mood: {mood_query}")
        results = sp.search(q=f'playlist {mood_query}', type='playlist', limit=10)

        # Parse and format the response, safely handling missing data
        playlists = [
            {
                'name': playlist.get('name', 'Unknown Playlist'),
                'link': playlist.get('external_urls', {}).get('spotify', 'No URL available')
            }
            for playlist in results.get('playlists', {}).get('items', [])
            if playlist  # Filter out None values
        ]

        if not playlists:  # Handle empty results
            return [{'error': f'No playlists found for mood: {mood_query}'}]

        return playlists

    except spotipy.exceptions.SpotifyException as e:
        print(f"Spotify API error: {e}")
        return [{'error': 'Failed to fetch playlists from Spotify API'}]
    except Exception as e:
        print(f"Unexpected error: {e}")
        return [{'error': f'An unexpected error occurred: {str(e)}'}]