const apiKey = "57e14c8e8dc38da37b4437e1115bfb36";

const result = document.getElementById("result");
const forecastDiv = document.getElementById("forecast");
const input = document.getElementById("city");


// Enter key search
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") getWeather();
});


// ------------------ CURRENT WEATHER ------------------
async function getWeather(cityName) {

    const city = cityName || input.value;

    const currentURL =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const forecastURL =
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    fetchCurrent(currentURL);
    fetchForecast(forecastURL);
}


async function fetchCurrent(url) {

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


// ------------------ 5 DAY FORECAST ------------------
async function fetchForecast(url) {

    const response = await fetch(url);
    const data = await response.json();

    forecastDiv.innerHTML = "";

    // pick one forecast per day (every 8th = 24 hours)
    const daily = data.list.filter((item, index) => index % 8 === 0);

    daily.slice(0, 5).forEach(day => {

        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

        const icon = day.weather[0].icon;
        const temp = Math.round(day.main.temp);

        const card = `
            <div class="day-card">
                <p>${dayName}</p>
                <img src="https://openweathermap.org/img/wn/${icon}.png">
                <p>${temp}°</p>
            </div>
        `;

        forecastDiv.innerHTML += card;
    });
}


// ------------------ BACKGROUND ------------------
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


// ------------------ AUTO LOCATION ------------------
navigator.geolocation.getCurrentPosition((pos) => {
    getWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
});


async function getWeatherByCoords(lat, lon) {

    const currentURL =
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    const forecastURL =
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetchCurrent(currentURL);
    fetchForecast(forecastURL);
}
