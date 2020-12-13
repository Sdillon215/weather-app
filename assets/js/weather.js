var searchInputEl = document.querySelector("#search-input");
var searchFormEl = document.querySelector("#search-form");
var apiKey = "c845404333af03f8f793eadcc58eeb29";

var searchSubmitHandler = function (event) {
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

var getCurrentWeather = function (city) {
    var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    fetch(apiUrlCurrent)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var wind = data.wind.speed;
                    var temp = data.main.temp;
                    var hum = data.main.humidity;

                    renderData(city, wind, temp, hum);
                });
            }
        })
};

var getFiveWeather = function (city) {
    var apiUrlFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&cnt=5&units=imperial";
    fetch(apiUrlFive)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // create for loop to iterate through 5 day weather
                    for (var i = 0; i < data.list.length; i++) {
                        var fiveDate = data.list[i].dt_txt;
                        var fiveTemp = data.list[i].main.temp;
                        var fiveHum = data.list[i].main.humidity;
                        var fiveWind = data.list[i].wind.speed;
                        var fiveIcon = data.list[i].weather.icon;

                        console.log(fiveDate);

                        // create div for card, <p> for date, img for weather icon, <p> for wind, <p> for hum, <p> for temp, add bootstrap classes to each, 
                        // pull data for each item set inner.html or textContent for each tag
                        // append card to #fiveCard then append the rest to the card
                        var cardEl = document.createElement("div");
                        cardEl.classList.add("card");
                        var dateEl = document.createElement("p");
                        dateEl.classList.add("date-element");
                        var imgEl = document.createElement("img");
                        imgEl.classList.add("img-element");
                        var tempEl = document.createElement("p");
                        tempEl.classList.add("temp-element");
                        var humEl = document.createElement("p");
                        humEl.classList.add("hum-element");
                        var windEl = document.createElement("p");
                        windEl.classList.add("wind-element");

                        cardEl.appendChild(dateEl);
                        cardEl.appendChild(imgEl);
                        cardEl.appendChild(tempEl);
                        cardEl.appendChild(humEl);
                        cardEl.appendChild(windEl);
                        document.getElementById("fiveCard").appendChild(cardEl);

                        dateEl.textContent = fiveDate;
                        tempEl.textContent = fiveTemp;
                        humEl.textContent = fiveHum;
                        windEl.textContent = fiveWind;
                        imgEl.textContent = fiveIcon;
                        console.log(data);

                    }
                });
            }
        })
};

var renderData = function (city, wind, temp, hum) {
    temp = ((temp - 273.15) * 1.8) + 32;
    var fahTemp = temp.toFixed(1);
    document.getElementById("city-one").innerHTML = city;
    document.getElementById("display-city").innerHTML = city;
    document.getElementById("display-temp").innerHTML = "Temperature: " + fahTemp;
    document.getElementById("display-hum").innerHTML = "Humidity: " + hum + "%";
    document.getElementById("display-wind").innerHTML = "Wind speed: " + wind + "mph";
};

var weatherStorage = function (city) {
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