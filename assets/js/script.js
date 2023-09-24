// These are Global Variables.
let weatherApiKey = "45cbba5c85dfa674bf1c6440aa5d1deb";
let searchFormContainer = document.querySelector("#search-form-container");
let cityUserInput = document.querySelector("#city-user-input");
let currentWeatherContainer = document.querySelector("#current-weather-container");
let forecastContainer = document.querySelector("#forecast-container");
let searchHistoryContainer = document.querySelector("#search-history");
let clearHistoryButton = document.getElementById("clear-history");

let options = { // This provides options for the date constructor.
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};