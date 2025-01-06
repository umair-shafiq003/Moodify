document.getElementById("submitBtn").addEventListener("click", async function () {
    const userInput = document.getElementById("userInput").value;

    if (!userInput) {
        alert("Please enter something!");
        return;
    }

    // Sending POST request to /predict route
    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: userInput })
        });

        if (!response.ok) {
            throw new Error("Failed to get mood prediction.");
        }

        const data = await response.json();

        if (data.error) {
            document.getElementById("results").innerHTML = `Error: ${data.error}`;
            return;
        }

        const moodPrediction = data.prediction;
        document.getElementById("results").innerHTML = `Mood: ${moodPrediction}`;

        // Fetching playlist recommendations based on predicted mood
        const playlistRecommendations = await getPlaylistRecommendations(moodPrediction);
        displayPlaylistResults(playlistRecommendations);

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("results").innerHTML = "An error occurred. Please try again.";
    }
});

document.getElementById("clearBtn").addEventListener("click", function () {
    // Clear the results and music recommendations
    document.getElementById("results").innerHTML = "";
    document.getElementById("musicResults").innerHTML = "";
    // Clear the user input field
    document.getElementById("userInput").value = "";
});

// Function to fetch playlist recommendations
async function getPlaylistRecommendations(mood) {
    try {
        const response = await fetch(`/playlist-recommendations?mood=${mood}`);
        if (!response.ok) {
            throw new Error("Failed to fetch playlist recommendations.");
        }
        const data = await response.json();
        return data.playlists || [];
    } catch (error) {
        console.error("Error fetching playlist recommendations:", error);
        return [];
    }
}

// Function to display playlist recommendations
function displayPlaylistResults(playlists) {
    const musicResultsDiv = document.getElementById("musicResults");
    musicResultsDiv.innerHTML = "<h3>Playlist Recommendations:</h3>";

    if (playlists.length === 0) {
        musicResultsDiv.innerHTML += "<p>No playlists found.</p>";
        return;
    }

    playlists.forEach(playlist => {
        const playlistElement = document.createElement("p");
        playlistElement.innerHTML = `<a href="${playlist.link}" target="_blank">${playlist.name}</a>`;
        musicResultsDiv.appendChild(playlistElement);
    });
}
