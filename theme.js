// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Get the dark mode icon element
    let darkModeIcon = document.getElementById("darkModeIcon");

    // Check if dark mode is active and update the icon accordingly
    if (document.body.classList.contains("dark-mode")) {
        darkModeIcon.src = "https://assets.onecompiler.app/43a927tw7/43a8vw8y2/icons8-light-48.png"; // Dark mode icon
    } else {
        darkModeIcon.src = "https://assets.onecompiler.app/43a927tw7/43a8vw8y2/icons8-do-not-disturb-ios-48.png"; // Light mode icon
    }
}

