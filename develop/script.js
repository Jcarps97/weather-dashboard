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


//Calling the API
function getAPI() {
     var apiUrl = "api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=4846f5792a31d91f265afac91672a4b8";
    fetch(apiUrl)
        .then(function (response) {
                return response.json();
         })
        .then(function (data) {
                console.log(data);
        });
        
}


function displayData() {

}

//Search Button
searchBtn.on("click", function(){
    cityName = $(".searchBar").val()
        
    getAPI()
    })