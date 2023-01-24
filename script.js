const myLocation = 'Vilnius';
const myAPIkey = '5dc65a05b2b9cfc577519e09ef1870be';
//Fahrenheit (imperial) or Celsius (metric)
const myUnits = 'metric'

//gets data from Openweathermap API and returns it as a promise
const createWeatherObj = async (location, APIkey = myAPIkey, units = myUnits) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${APIkey}&units=${units}`, {mode: 'cors'});
    const weatherData = await response.json();

    const Weather = {
      place: weatherData.name,
      temp: weatherData.main.temp,
      description: weatherData.weather[0].description
    };

    console.log(weatherData);
    return Weather;
}

//takes a promise and updates html 

createWeatherObj(myLocation).then(data => {
  console.log(data)
  const place = document.getElementById('place');
  const temp = document.getElementById('temp');
  const description = document.getElementById('description');
  place.innerHTML = data.place;
  temp.innerHTML = data.temp;
  description.innerHTML = data.description;
});