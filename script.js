async function getWeather() {

    const city = document.getElementById("city").value;
    const apiKey = "57e14c8e8dc38da37b4437e1115bfb36";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const result = document.getElementById("result");

    if (data.cod === 200) {

        const icon = data.weather[0].icon;

        result.innerHTML = `
            <h2>${data.name}</h2>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
            <div class="temp">${data.main.temp}°C</div>
            <p>${data.weather[0].main}</p>

            <div class="details">
                <span>💧 ${data.main.humidity}%</span>
                <span>🌬 ${data.wind.speed} m/s</span>
            </div>
        `;
    }
    else {
        result.innerHTML = "City not found ❌";
    }
}
