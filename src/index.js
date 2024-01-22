function updateIcon(response) {
  const iconElement = document.querySelector("#weather-app-icon-image");
  const description = response.data.condition.description.toLowerCase();

  switch (description) {
    case "clear sky":
      iconElement.src = "assets/ClearSkyDay.png";
      iconElement.alt = "Clear Sky";
      break;
    case "few clouds":
      iconElement.src = "assets/FewCloudsDay.png";
      iconElement.alt = "Few Clouds";
      break;
    case "scattered clouds":
      iconElement.src = "assets/ScatteredCloudsDay.png";
      iconElement.alt = "Scattered Clouds";
      break;
    case "overcast clouds":
      iconElement.src = "assets/ScatteredCloudsDay.png";
      iconElement.alt = "Overcast Clouds";
      break;
    case "broken clouds":
      iconElement.src = "assets/BrokenCloudsDay.png";
      iconElement.alt = "Broken Clouds";
      break;
    case "shower rain":
      iconElement.src = "assets/ShowerRainDay.png";
      iconElement.alt = "Shower Rain";
      break;
    case "rain":
      iconElement.src = "assets/RainDay.png";
      iconElement.alt = "Rain";
      break;
    case "moderate rain":
      iconElement.src = "assets/RainDay.png";
      iconElement.alt = "Moderate Rain";
      break;
    case "light rain":
      iconElement.src = "assets/RainDay.png";
      iconElement.alt = "Light Rain";
      break;
    case "thunderstorm":
      iconElement.src = "assets/ThunderstormDay.png";
      iconElement.alt = "Thunderstorm";
      break;
    case "snow":
      iconElement.src = "assets/SnowDay.png";
      iconElement.alt = "Snow";
      break;
    case "mist":
      iconElement.src = "assets/MistDay.png";
      iconElement.alt = "Mist";
      break;
    case "windy":
      iconElement.src = "assets/WindyDay.png";
      iconElement.alt = "Windy";
      break;
  }
}

function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = capitalizeWords(
    response.data.condition.description
  );
  updateIcon(response);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  temperatureElement.innerHTML = Math.round(temperature);

  let roundedWindSpeed = Math.round(response.data.wind.speed);
  windSpeedElement.innerHTML = `${roundedWindSpeed} mph`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  hours = hours % 12 || 12;
  let amPm = hours >= 12 ? "PM" : "AM";
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes} ${amPm}`;
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

function searchCity(city) {
  // Goal: Make API Call & Update UI
  // Note: Separation of Concerns
  let apiKey = "3oet065fc2868d480dfba1d0d3a951b0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("San Francisco");
