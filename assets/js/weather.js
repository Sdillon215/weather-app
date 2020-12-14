var searchInputEl = document.querySelector("#search-input");
var searchFormEl = document.querySelector("#search-form");
var apiKey = "c845404333af03f8f793eadcc58eeb29";

var searchSubmitHandler = function (event) {
    event.preventDefault();
    var city = searchInputEl.value.trim();
    if (city) {
        getCurrentWeather(city);
        weatherStorage(city);
        getFiveWeather(city);
        clearDiv();
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

                        var cardEl = document.createElement("div");
                        cardEl.classList.add("card", "cityCard");
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
                    }
                });
            }
        })
};

var renderData = function (city, wind, temp, hum) {
    temp = ((temp - 273.15) * 1.8) + 32;
    var fahTemp = temp.toFixed(1);
    document.getElementById("display-city").innerHTML = city;
    document.getElementById("display-temp").innerHTML = "Temperature: " + fahTemp;
    document.getElementById("display-hum").innerHTML = "Humidity: " + hum + "%";
    document.getElementById("display-wind").innerHTML = "Wind speed: " + wind + "mph";
};

var weatherStorage = function (city) {
    var listEl = document.createElement("li");
    document.getElementById("cityList").appendChild(listEl);
    listEl.textContent = city;
    // add city to localStorage
    localStorage.setItem("city", JSON.stringify(city));

};

var clearDiv = function () {
    $(".cityCard").remove();
}

searchFormEl.addEventListener("submit", searchSubmitHandler);
