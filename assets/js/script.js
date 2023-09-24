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

// This takes the user input and calls the weatherToSearch() function to search the OpenWeather API for a city's weather information.
searchFormContainer.addEventListener("submit", function (event) {
    event.preventDefault();

    let cityName = toTitle(cityUserInput.value);

    if (cityName !== "") {
        weatherToSearch(cityName);
    };

});

/ This function searches for the current weather and forecast information from the OpenWeather API.
function weatherToSearch(cityName) {

    let currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" +
        weatherApiKey + "&units=imperial";

    fetch(currentWeatherUrl).then(function (response) {

        if (response.ok) {

            response.json().then(function (data) {

                currentWeatherToView(data);
                searchHistoryToSave(cityName);

            });

        } else {
            alert("Error: " + response.statusText);
        };

    });

    let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" +
        weatherApiKey + "&units=imperial";

    fetch(forecastUrl).then(function (response) {

        if (response.ok) {

            response.json().then(function (data) {

                forecastToView(data);
            });

        } else {
            alert("Error: " + response.statusText);
        };
    });

};

// This function saves each search to the local storage.
function searchHistoryToSave(cityName) {

    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    searchHistory.push(cityName);

    if (searchHistory.length > 5) {
        searchHistory.shift();
    };

    let checkForCopies = [];

    searchHistory.forEach(function (cityName) {
        if (!checkForCopies.includes(cityName)) {
            checkForCopies.push(cityName);
        }
    });

    localStorage.setItem("searchHistory", JSON.stringify(checkForCopies)
    );

    searchHistoryToView();

};

// This function creates the buttons for each city saved in local storage, and displays the buttons on the webpage.
function searchHistoryToView() {

    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    let searchHistoryHtml = "<h3>Search History</h3>";

    searchHistory.forEach(function (cityName) {
        searchHistoryHtml += "<button class=button>" + cityName + "</button>";
    });

    searchHistoryContainer.innerHTML = searchHistoryHtml;

};