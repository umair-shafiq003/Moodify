# Music Recommender Web App  

This is a Music Recommender Web App that uses Spotify's API to recommend music based on user preferences. Follow the steps below to set up and run the application on your local system.  

---

## Setup Instructions  

### 1. Download the Model  
- Download the pre-trained model from the provided drive link.  
- Update the model's file path in the following location:  
  `\Music Recommender Web App\app\models.py`  

### 2. Install Dependencies  
- Navigate to the project directory.  
- Install the required dependencies using `pip` by running the following command in your terminal:  
  `pip install -r \Music Recommender Web App\requirements.txt`  

### 3. Run the Application  
- Start the application by running:  
  `python \Music Recommender Web App\run.py`  

### 4. Configure Spotify API Credentials  
To enable Spotify functionality, you need to set up a project on the Spotify Developers Dashboard and provide your Client ID and Client Secret ID. Update these credentials in the following file:  
` \Music Recommender Web App\app\spotify.py `  

---

## Steps to Create a Spotify Project  

1. **Sign in to Spotify Developer Dashboard**  
   - Visit [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).  
   - Log in with your Spotify account credentials.  

2. **Create a New Project**  
   - Click on the **Create an App** button.  
   - Fill out the required details like the app name and description.  

3. **Get Client ID and Client Secret**  
   - After creating the app, you'll find the **Client ID** and **Client Secret** on the app's dashboard.  

4. **Set Redirect URIs**  
   - In the app settings, scroll down to **Redirect URIs** and add a URI (e.g., `http://localhost:8888/callback`).  
   - Save the settings.  

5. **Update the Application**  
   - Copy the **Client ID** and **Client Secret** from the Spotify Developer Dashboard.  
   - Paste them into the `\Music Recommender Web App\app\spotify.py` file:  
     ```python  
     CLIENT_ID = "your_client_id_here"  
     CLIENT_SECRET = "your_client_secret_here"  
     ```  
## Notes  
- Ensure that Python is installed on your system (recommended version: 3.8 or above).  
- Make sure to configure the Redirect URI in both the Spotify Developer Dashboard and the app if you are running locally.  
