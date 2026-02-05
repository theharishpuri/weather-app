// Get elements
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const cityName = document.getElementById("city");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const humidity = document.getElementById("humidity");


// When button clicked
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    getWeather(city);
});


// Function to fetch weather
async function getWeather(city) {
    const apiKey = "57e14c8e8dc38da37b4437e1115bfb36"; // we will add this next step

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Update UI
        cityName.innerText = data.name;
        temp.innerText = `Temperature: ${data.main.temp} °C`;
        desc.innerText = `Condition: ${data.weather[0].description}`;
        humidity.innerText = `Humidity: ${data.main.humidity}%`;

    } catch (error) {
        alert("City not found!");
        console.log(error);
    }
}

