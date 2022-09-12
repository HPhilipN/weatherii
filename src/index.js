import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const api_forecast = {
  key: "7ba9aae10b8921577465d3fe25ba5d59",
  base: "https://api_forecast.openweathermap.org/data/2.5/"
}
/*
const api_time = {
  key: "I8VYN3XIQGHY", 
  base: "http://api.timezonedb.com"
}
*/
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

const slider = document.querySelector('.checkbox');
slider.addEventListener('click', setQuery);
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api_forecast.base}weather?q=${query}&units=metric&APPID=${api_forecast.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}
////function get_Time (query) {

//}
function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

/*function toggletime (event){
  if(event.checkbox){

  }
}*/

