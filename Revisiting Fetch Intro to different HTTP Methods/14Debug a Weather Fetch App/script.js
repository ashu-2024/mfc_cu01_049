const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('city');
const weatherDisplay = document.getElementById('weather');
const errorMessage = document.getElementById('error-message');

// API Key (Replace with your actual OpenWeather API key)
const API_KEY = "YOUR_API_KEY";

// Event listener for form submission
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        weatherDisplay.textContent = "";
        return;
    }

    fetchWeather(city);
});

// Function to fetch and display weather
async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`City not found. Please enter a valid city.`);
        }

        const data = await response.json();

        // Display weather details
        weatherDisplay.innerHTML = `
            <p><strong>City:</strong> ${data.name}</p>
            <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        `;

        errorMessage.textContent = ""; // Clear any previous errors
    } catch (error) {
        errorMessage.textContent = error.message;
        weatherDisplay.textContent = "";
    }
}
