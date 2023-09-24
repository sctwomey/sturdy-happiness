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

// This is a function to convert the first letters of words to an uppercase and the rest of the letters to lowercase as in titles (from code.tutsplus.com).
function toTitle(str) {
    let splitStr = str.toLowerCase().split(' ');

    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    };
    return splitStr.join(' ');

};