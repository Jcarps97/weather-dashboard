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
var mainTemp = $(".temp")
var mainWind = $(".wind")
var mainHum = $(".humidity")


//Calling the API
function getAPI(location) {
     var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apikey}`; 
                
    fetch(apiUrl)
        .then(function (response) {
                return response.json();
        })
        .then(function (data) {
            // console.log(data.wind.speed);
            // console.log(data.main.temp);
            // console.log(data.main.humidity);
            mainTemp.text(data.main.temp);
            mainWind.text(data.wind.speed + "mph");
            mainHum.text(data.main.humidity);

        });
        
}

//Displaying fetched data
function displayData() {

}

//Search Button
searchBtn.on("click", function(){
    cityName = $(".searchBar").val()
    localStorage.setItem("city-history", cityName)
    console.log(cityName)
        
    getAPI()
    })