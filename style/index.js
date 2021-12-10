let citySearch = document.querySelector("#city-name");
let cityName = document.querySelector(".city-text");

function cityInput(event) {
  event.preventDefault();
  cityName.innerHTML = `<strong>${citySearch.value}</strong>`;
  cityInput2(citySearch.value);
}
let overallName = document.querySelector("#overall-name");
overallName.addEventListener("submit", cityInput);

let overallTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wensday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[overallTime.getDay()];

let numDay = overallTime.getDay();
if (numDay < 10) {
  numDay = `0${numDay}`;
}

let month = overallTime.getMonth();
console.log(month);
if (month < 10) {
  month = `0${month}`;
}
let cityDate = document.querySelector("#city-date");
cityDate.innerHTML = `${day} ${numDay}/${month}/${overallTime.getFullYear()}`;

let singleDigits = overallTime.getHours();
console.log(singleDigits);
if (singleDigits < 10) {
  singleDigits = `0${singleDigits}`;
}

let singleDigitsMin = overallTime.getMinutes();
console.log(singleDigitsMin);
if (singleDigitsMin < 10) {
  singleDigitsMin = `0${singleDigitsMin}`;
}

let cityHours = document.querySelector("#city-time");
cityHours.innerHTML = `${singleDigits}:${singleDigitsMin}`;

// the temp area
let textFunc;
function WeatherText(response) {
  textFunc = response.data.weather.description;
}
console.log(WeatherText);

function CFTemp(response) {
  tempreture = response.data.main.temp;
  return Number;
}
console.log(CFTemp);

let currentName;
function currentNameTry(response) {
  currentName = response.data.name;
}
console.log(currentName);

function current(event) {
  event.preventDefault();
  let currentButton = document.querySelector("#CFTemp");
  currentButton.innerHTML = Math.round(tempreture) + `°`;
  cityName.innerHTML = `<strong>${currentName}</strong>`;
}
let tempreture;
let Temp = document.querySelector("#CFTemp");

function convertC(event) {
  event.preventDefault();
  if (cityName.innerHTML === `<strong>${currentName}</strong>`) {
    Temp.innerHTML = Math.round(tempreture) + `°`;
  } else {
    Temp.innerHTML = Math.round(tempFromSeatch) + `°`;
  }
}

function convertF(event) {
  event.preventDefault();
  if (cityName.innerHTML === `<strong>${currentName}</strong>`) {
    Temp.innerHTML = Math.round(tempreture * 1.8 + 32) + `°`;
  } else {
    Temp.innerHTML = Math.round(tempFromSeatch * 1.8 + 32) + `°`;
  }
}
console.log(cityName.innerHTML);
console.log(Temp.innerHTML);

let apiKey = "59d5b6ff725fe884f0f5b8a2a1a57f06";

function showCoords(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}34&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(CFTemp, WeatherText, currentNameTry);
}

function currentTemp() {
  navigator.geolocation.getCurrentPosition(showCoords);
}

let tempFromSeatch;
function cityTemp(response) {
  console.log(response);
  tempFromSeatch = response.data.main.temp;
  Temp.innerHTML = Math.round(tempFromSeatch) + `°`;
}

function cityInput2() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(cityTemp);
}
currentTemp();

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertF);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertC);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", current);

let tempNum = document.querySelector("#CFTemp");
tempNum.innerHTML = tempreture + `°`;

let text = document.querySelector("#weatherState");
text.innerHTML = textFunc;
