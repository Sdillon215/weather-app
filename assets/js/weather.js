var searchInputEl = document.querySelector("#search-input");
var searchFormEl = document.querySelector("#search-form");
var apiKey = "c845404333af03f8f793eadcc58eeb29";

var searchSubmitHandler = function(event) {
    event.preventDefault();
    var city = searchInputEl.value.trim();
    // console.log(city);
    if (city) {
        getCurrentWeather(city);
        weatherStorage(city);
        getFiveWeather(city);
    } else {
        alert("Please enter a valid city.");
    }
};

var getCurrentWeather = function(city) {
    var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    fetch(apiUrlCurrent)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var wind = data.wind.speed;
                var temp = data.main.temp;
                var hum = data.main.humidity;

                renderData(city, wind, temp, hum);
              });
        }
    })
};

var getFiveWeather = function(city) {
    var apiUrlFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
    fetch(apiUrlFive)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // var wind = data.wind.speed;
                // var temp = data.main.temp;
                // var hum = data.main.humidity;

                // renderData(city, wind, temp, hum);
                console.log(data);
              });
        }
    })
};

var renderData = function(city, wind, temp, hum) {
    temp = ((temp-273.15)*1.8)+32;
    var fahTemp = temp.toFixed(1);
    document.getElementById("city-one").innerHTML = city;
    document.getElementById("display-city").innerHTML = city;
    document.getElementById("display-temp").innerHTML = "Temperature: " + fahTemp;
    document.getElementById("display-hum").innerHTML = "Humidity: " + hum + "%";
    document.getElementById("display-wind").innerHTML = "Wind speed: " + wind + "mph";
};

var weatherStorage = function(city) {
    // add city to localStorage
}

searchFormEl.addEventListener("submit", searchSubmitHandler);


// var apiUrlFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
//     console.log(apiUrlFive);
// fetch(apiUrlFive)
//     .then(function(response) {
//         if (response.ok) {
//             response.json().then(function(data) {
//                 console.log(apiUrlFive);
//             })
//         }
//     })