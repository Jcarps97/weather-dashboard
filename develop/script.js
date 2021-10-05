//Create Header with title
//Create sidebar with input field and search button
    //Event listener
//Query API for specified city, see if it's one request or two
    //Pull temp, wind and humidity for 5 day forecast, plus UV index for current day
    //Add div for main search and 5 day forecast
    //Colorcoded UV Index and cloud/sun icons
    //Save search entry to local storage
    //Create button for search history, queuing entries

//Global Variables
var searchBtn = $(".searchBtn");
var cityName;
var apikey = "4846f5792a31d91f265afac91672a4b8";
var mainUVI = $(".uvi")
var mainTemp = $(".temp")
var mainWind = $(".wind")
var mainHum = $(".humidity")
var currentDay = moment()
var searchedCity = $(".cityName")
var weatherIcon = $(".iconSpan")


//Calling the API
function getAPI(city) {
    var apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apikey}`; 
                
    fetch(apiUrl1)
        .then(function (response) {
                return response.json();
        })
        .then(function (data) {
            // console.log(data)
            var lat = data.coord.lat
            var long = data.coord.lon
            // console.log(lat)
            // console.log(long)
        


        displayData(lat, long);
        });
        
}

//Displaying fetched data
function displayData(lat, long) {
    var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&appid=" + apikey ;
    fetch(apiUrl2)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        console.log(data.current.dt)
            searchedCity.text(cityName)
            var weatherCode = data.current.weather[0].icon;
                weatherIcon.src = "http://openweathermap.org/img/wn/" + weatherCode + "@2x.png";
                mainTemp.text("Temperature " + data.current.temp + " F");
                mainWind.text("Wind " + data.current.wind_speed + "mph");
                mainHum.text("Humidity " + data.current.humidity + "%");
                mainUVI.text("UV Index " + data.current.uvi);

    forecast(data.daily);
    });

}


function forecast (data) {
    $(".forecast").empty();
    for( i = 0; i < 5; i++) {
        var forecastContainer = $("<div>")
            forecastContainer.addClass("container")
        // var forecastTime = $("<div>");
        //     forecastTime.text(data[i].dt);
        //         forecastContainer.append(forecastTime);
        var forecastTemp = $("<div>");
            forecastTemp.text(data[i].temp.day + " F");
                forecastContainer.append(forecastTemp);
        var forecastWind = $("<div>");
            forecastWind.text(data[i].wind_speed + " Mph");
                forecastContainer.append(forecastWind);
        var forecastHumid = $("<div>");
            forecastHumid.text(data[i].humidity + " %");
                forecastContainer.append(forecastHumid);
    $(".forecast").append(forecastContainer)
    }
}

function retrieveHistory() {
    var localArray = JSON.parse(localStorage.getItem("city-history")) || [];
    for (i = 0; i < localArray.length; i++) {
        var historyButton = $("<button>")
        historyButton.text(localArray[i])
            $(".history").append(historyButton)
    historyButton.on("click", function(event) {
            var selectedHistory = event.target.textContent;
                getAPI(selectedHistory);
            });
    };
}

//Search Button
searchBtn.on("click", function(){
    var cityArray = JSON.parse(localStorage.getItem("city-history")) || [];
    cityName = $(".searchBar").val();
    cityArray.push(cityName);
    localStorage.setItem("city-history", JSON.stringify(cityArray))   
        getAPI(cityName)
    var historyButton = $("<button>")
        historyButton.text(cityName)
            $(".history").append(historyButton)
    historyButton.on("click", function(event) {
            var selectedHistory = event.target.textContent;
                getAPI(selectedHistory);
    });
});

$(".currentDay").text(currentDay)

retrieveHistory();
