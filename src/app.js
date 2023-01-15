function formatDate() {
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    p;
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "saturday",
  ];

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay() {
  let date = new Date();
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
         <div class="col-2">
   <div class="day">
<ul>
<li>${formatDay(forecastDay.dt)}</li>
<li class="size"> <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png
          alt=""
          width="42"
        /></li>
<li>${Math.round(forecastDay.temperature.maximum)}°</li>
<li>${Math.round(forecastDay.temperature.minimum)}°</li>
</ul>
</div></div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c9f615743fd9bf271obd0cc3t2aeaf2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayTemperature(response) {
  celsiustemp = response.data.temperature.current;
  let temp = Math.round(celsiustemp);
  let temperature = document.querySelector("#temp");
  let skyDescription = document.querySelector("#sky");
  let humidity = document.querySelector("#hum");
  let wind = document.querySelector("#wind");
  let feelsLike = document.querySelector("#feel");
  let iconElement = document.querySelector("#icon");
  let icon = response.data.condition.icon;
  let iconUrl = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`;
  let dateElement = document.querySelector("#date");
  temperature.innerHTML = temp;
  skyDescription.innerHTML = response.data.condition.description;
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  feelsLike.innerHTML = Math.round(response.data.temperature.feels_like);
  iconElement.setAttribute("src", iconUrl);
  dateElement.innerHTML = formatDate();
  getForecast(response.data.coordinates);
}
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value;
  showCity(cityInput.value);
}
function showCity(city) {
  let apiKey = "3c9f615743fd9bf271obd0cc3t2aeaf2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
let buttonControl = document.querySelector("#control");
buttonControl.addEventListener("submit", search);
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3c9f615743fd9bf271obd0cc3t2aeaf2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentCity);
}
function currentCity(response) {
  // response.preventDefault();
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;
  celsiustemp = response.data.temperature.current;
  let temp = Math.round(celsiustemp);
  let temperature = document.querySelector("#temp");
  let skyDescription = document.querySelector("#sky");
  let humidity = document.querySelector("#hum");
  let wind = document.querySelector("#wind");
  let feelsLike = document.querySelector("#feel");
  let iconElement = document.querySelector("#icon");
  let icon = response.data.condition.icon;
  let iconUrl = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`;
  let dateElement = document.querySelector("#date");
  temperature.innerHTML = temp;
  skyDescription.innerHTML = response.data.condition.description;
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  feelsLike.innerHTML = Math.round(response.data.temperature.feels_like);
  iconElement.setAttribute("src", iconUrl);
  dateElement.innerHTML = formatDate();
}
function geolocation() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let buttonCurrent = document.querySelector("#current-input");
buttonCurrent.addEventListener("submit", currentPosition);

//let celsiustemp = null;
