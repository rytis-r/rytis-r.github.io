const myForm = document.getElementById('form');
// const myLocation = document.querySelector('input[name="locationfield"]').value;
const myAPIkey = '5dc65a05b2b9cfc577519e09ef1870be';
//Fahrenheit (imperial) or Celsius (metric)
const myUnits = 'metric';

//gets current weather data from Openweathermap API

const fetchDataCurrent = async (APIkey = myAPIkey, units = myUnits) => {
  let myLocation = document.querySelector('input[name="locationfield"]').value;
  if (!myLocation.valueOf()) {
    myLocation = 'Calgary';
  }
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${myLocation}&APPID=${APIkey}&units=${units}`, {mode: 'cors'});
  const weatherData = await response.json();
  return weatherData;
};

//gets the following 15 hours of weather data from Openweathermap API

const fetchData15hrs = async (APIkey = myAPIkey, units = myUnits) => {
  let myLocation = document.querySelector('input[name="locationfield"]').value;
  if (!myLocation.valueOf()) {
    myLocation = 'Calgary';
  }
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${myLocation}&units=${units}&cnt=5&appid=${APIkey}`, {mode: 'cors'});  
  const weatherData = await response.json();
  return weatherData;
};

//receives a promise and updates HTML

const updateHTMLCurrent = fetchedData => {
  fetchedData.then((data => {

    const Weather = {
      place: data.name,
      country: data.sys.country,
      temp: Math.round(data.main.temp),
      weather: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      feelslike: Math.round(data.main.feels_like),
      humidity: Math.round(data.main.humidity),
      windspeed: Math.round(data.wind.speed),
      // receives UNIX timestamp and timezone in seconds and returns local time in hours and minutes
      hoursMinutesTime: ((new Date((data.dt + data.timezone) * 1000)).toUTCString("en-GB")).substring(17, 22),
    };

    const place = document.querySelector('.place');
    const temp = document.querySelector('.temp');
    const description = document.querySelector('.description');
    const timenow = document.querySelector('.timenow');
    const icon = document.querySelector('.icon');
    const feelslike = document.querySelector('.feelslike');
    const humidity = document.querySelector('.humidity');
    const windspeed = document.querySelector('.windspeed');

    place.innerHTML = `${Weather.place}, ${Weather.country}`;
    temp.innerHTML = `${Weather.temp} &#8451;`;
    description.innerHTML = Weather.description;
    timenow.innerHTML = Weather.hoursMinutesTime;
    icon.src = `http://openweathermap.org/img/wn/${Weather.icon}.png`;
    feelslike.innerHTML = `Feels like: ${Weather.feelslike} &#8451;`;
    humidity.innerHTML = `Humidity: ${Weather.humidity} %`;
    windspeed.innerHTML = `Windspeed: ${Weather.windspeed} m/s`;
  })).catch((error => {
    alert("The place has not been found. Please try again.");
  }))
};

const updateHTML15hrs = fetchedData => {
  fetchedData.then((data => {
    for (let i = 0; i < 5; i++) {

    const Weather = {
      temp: Math.round(data.list[i].main.temp),
      icon: (data.list[i].weather[0].icon),
      // receives UNIX timestamp and timezone in seconds and returns local time in hours and minutes
      hoursMinutesTime: ((new Date((data.list[i].dt + data.city.timezone) * 1000)).toUTCString("en-GB")).substring(17, 22),
    };

    const temp = document.querySelector(`.forecast${i+1} .frcsttemp`);
    const time = document.querySelector(`.forecast${i+1} .frcsttime`);
    const icon = document.querySelector(`.forecast${i+1} .frcsticon`);
    
    temp.innerHTML = `${Weather.temp} &#8451;`;
    time.innerHTML = Weather.hoursMinutesTime;
    icon.src = `http://openweathermap.org/img/wn/${Weather.icon}.png`;
  }
})).catch((error => {
    alert("The place has not been found. Please try again.");
  }))
};

updateHTMLCurrent(fetchDataCurrent());
updateHTML15hrs(fetchData15hrs());

myForm.addEventListener('submit', (e) => {
  e.preventDefault();
  updateHTMLCurrent(fetchDataCurrent());
  updateHTML15hrs(fetchData15hrs());
  e.target.reset();
});