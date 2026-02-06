const apiKey = "57e14c8e8dc38da37b4437e1115bfb36";
const result = document.getElementById("result");
const input = document.getElementById("city");


// 🔹 Press ENTER to search
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
});


// 🔹 Get weather by city
async function getWeather(cityName) {

    const city = cityName || input.value;

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetchWeather(url);
}


// 🔹 Get weather by coordinates (auto location)
async function getWeatherByCoords(lat, lon) {

    const url =
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetchWeather(url);
}


// 🔹 Common fetch function
async function fetchWeather(url) {

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
        result.innerHTML = "City not found ❌";
        return;
    }

    const icon = data.weather[0].icon;
    const condition = data.weather[0].main;

    result.innerHTML = `
        <h2>${data.name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
        <div class="temp">${data.main.temp}°C</div>
        <p>${condition}</p>

        <div class="details">
            <span>💧 ${data.main.humidity}%</span>
            <span>🌬 ${data.wind.speed} m/s</span>
        </div>
    `;

    changeBackground(condition);
}


// 🔹 Change background dynamically
function changeBackground(condition) {

    if (condition.includes("Clear")) {
        document.body.style.background =
            "linear-gradient(135deg, #fceabb, #f8b500)";
    }
    else if (condition.includes("Rain")) {
        document.body.style.background =
            "linear-gradient(135deg, #616161, #9bc5c3)";
    }
    else if (condition.includes("Cloud")) {
        document.body.style.background =
            "linear-gradient(135deg, #bdc3c7, #2c3e50)";
    }
    else {
        document.body.style.background =
            "linear-gradient(135deg, #4facfe, #00f2fe)";
    }
}


// 🔹 Auto detect location on load
navigator.geolocation.getCurrentPosition((pos) => {
    getWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
});
