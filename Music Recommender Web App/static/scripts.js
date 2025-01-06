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
        document.getElementById("results").innerHTML = `<h2>Mood: ${moodPrediction}</h2>`;

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

function displayPlaylistResults(playlists) {
    const musicResultsDiv = document.getElementById("musicResults");
    musicResultsDiv.innerHTML = "<h1>Playlist Recommendations:</h1>";

    if (playlists.length === 0) {
        musicResultsDiv.innerHTML += "<p>No playlists found.</p>";
        return;
    }

    playlists.forEach(playlist => {
        // Create a container div for each playlist
        const playlistDiv = document.createElement("div");
        playlistDiv.style.border = "1px solid #ccc";
        playlistDiv.style.borderRadius = "8px";
        playlistDiv.style.padding = "10px";
        playlistDiv.style.margin = "5px 0"; // Reduced top and bottom margin
        playlistDiv.style.backgroundColor = "#f9f9f9";
        playlistDiv.style.position = "relative"; // Needed for positioning the button
        playlistDiv.style.minHeight = "70px"; // Adjusted height for better alignment

        // Create a label for the playlist name
        const playlistLabel = document.createElement("span");
        playlistLabel.textContent = playlist.name;
        playlistLabel.style.fontSize = "16px";
        playlistLabel.style.fontWeight = "bold";
        playlistLabel.style.display = "block";
        playlistLabel.style.marginBottom = "10px"; // Spacing between name and button
        playlistLabel.style.textAlign = "left"; // Left-align the label
        playlistLabel.style.wordBreak = "break-word"; // Handle long text properly

        // Create a button to route to the playlist link
        const playlistButton = document.createElement("button");
        playlistButton.textContent = "Open Playlist";

        // Apply button styles
        playlistButton.style.position = "absolute"; // Enables precise positioning
        playlistButton.style.bottom = "10px";
        playlistButton.style.right = "10px";
        playlistButton.style.padding = "0.5rem 1rem";
        playlistButton.style.borderRadius = "10rem";
        playlistButton.style.color = "#fff";
        playlistButton.style.textTransform = "uppercase";
        playlistButton.style.fontSize = "0.9rem";
        playlistButton.style.letterSpacing = "0.1rem";
        playlistButton.style.transition = "all 0.3s";
        playlistButton.style.backgroundColor = "#7478c1";
        playlistButton.style.border = "none";
        playlistButton.style.cursor = "pointer";

        // Add hover effects for the button
        playlistButton.addEventListener("mouseenter", () => {
            playlistButton.style.color = "#fff";
            playlistButton.style.backgroundColor = "#0ac";
        });
        playlistButton.addEventListener("mouseleave", () => {
            playlistButton.style.backgroundColor = "#7478c1";
        });

        // Add click event to navigate to the playlist link
        playlistButton.addEventListener("click", () => {
            window.open(playlist.link, "_blank");
        });

        // Append the label and button to the playlist div
        playlistDiv.appendChild(playlistLabel);
        playlistDiv.appendChild(playlistButton);

        // Append the playlist div to the main results container
        musicResultsDiv.appendChild(playlistDiv);
    });
}
