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

    let userInput = toTitle(cityUserInput.value);

    if (userInput !== "") {
        weatherToSearch(userInput);
    };

});

// This function searches for the current weather and forecast information from the OpenWeather API.
function weatherToSearch(UserInput) {

    let currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + UserInput + "&appid=" +
        weatherApiKey + "&units=imperial";

    fetch(currentWeatherUrl).then(function (response) {

        if (response.ok) {

            response.json().then(function (data) {

                currentWeatherToView(data);
                searchHistoryToSave(UserInput);

            });

        } else {
            alert("Error: " + response.statusText);
        };

    });

    let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + UserInput + "&appid=" +
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
function searchHistoryToSave(UserInput) {

    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    searchHistory.push(UserInput);

    if (searchHistory.length > 5) {
        searchHistory.shift();
    };

    let checkForCopies = [];

    searchHistory.forEach(function (UserInput) {
        if (!checkForCopies.includes(UserInput)) {
            checkForCopies.push(UserInput);
        }
    });

    localStorage.setItem("searchHistory", JSON.stringify(checkForCopies)
    );

    searchHistoryToView();

};

// This function creates the buttons for each city saved in the local storage, and displays the buttons on the webpage.
function searchHistoryToView() {

    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    let searchHistoryHtml = "<h3>Search History</h3>";

    searchHistory.forEach(function (UserInput) {
        searchHistoryHtml += "<button class=button>" + UserInput + "</button>";
    });

    searchHistoryContainer.innerHTML = searchHistoryHtml;

};

// This function displays the weather and forecast information for the city saved in the local storage.
function weatherHistoryToView(event) {

    let UserInput = toTitle(event.target.textContent);
    weatherToSearch(UserInput);

};

// This function displays the current weather information on the webpage.
function currentWeatherToView(data) {

    let cityName = data.name;
    let cityDate = new Date(data.dt * 1000).toLocaleDateString('en-US', options);
    let weatherIconUrl = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    let cityTemp = data.main.temp;
    let cityHumidity = data.main.humidity;
    let cityWindSpeed = data.wind.speed;

    let currentWeatherHtml = "<h4>" + cityName.toUpperCase() + "<br>(" + cityDate + ")</h4>" +
        "<h4>Current Weather: </h4>" + "<img src='" + weatherIconUrl + "' alt='" + data.weather[0].description + "'>" +
        "<p>Temperature: " + cityTemp + " &deg;F</p>" + "<p>Humidity: " + cityHumidity + "%</p>" + "<p>Wind Speed: " +
        cityWindSpeed + " mph</p>";

    currentWeatherContainer.innerHTML = currentWeatherHtml;
    currentWeatherContainer.classList.add("current-weather-container");

};

// This function displays the five (5) day forecast information on the webpage.
function forecastToView(data) {

    let informationToForecast = data.list.filter(function (info) {
        return info.dt_txt.includes("12:00:00");
    });

    let forecastHtml = "<h3>5 Day <br> Weather <br> Forecast:</h3>";

    informationToForecast.forEach(function (info) {
        let cityDate = new Date(info.dt * 1000).toLocaleDateString('en-US', options);
        let weatherIconUrl = "https://openweathermap.org/img/w/" + info.weather[0].icon + ".png";
        let cityTemp = info.main.temp;
        let cityWindSpeed = info.wind.speed;

        forecastHtml += "<div>" + "<h5>" + cityDate + "</h5>" + "<img src='" + weatherIconUrl + "' alt='" +
            info.weather[0].description + "'>" + "<p>Temp: " + cityTemp + " &deg;F</p>" + "<p>Humidity: " +
            info.main.humidity + "%</p>" + "<p>Wind Speed: " + cityWindSpeed + " mph</p>" + "</div>";
    });

    forecastContainer.innerHTML = forecastHtml;
    forecastContainer.classList.add("forecast-container");

};

// This function clears the local storage and refreshes the webpage.
let clearSearchHistory = function () {

    localStorage.clear();
    location.reload();

};

// This calls the search history from the local storage when the button with the city name is clicked.
searchHistoryContainer.addEventListener("click", weatherHistoryToView);

// This calls the clearSearchHistory() function when the "Clear History" button is clicked.
clearHistoryButton.addEventListener("click", clearSearchHistory);

searchHistoryToView();