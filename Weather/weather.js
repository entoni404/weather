const weatherApp = document.getElementById("weather-app");
const citySearch = document.querySelector("input");
const citySearchValue = citySearch.value;
const inputAlert = document.getElementById("alert");
const submit = document.getElementById("submit-btn");
const form = document.getElementById("search-location");
const cloudC = document.getElementById("cloudy-c");
const humidityC = document.getElementById("humidity-c");
const windyC = document.getElementById("windy-c");
const temp = document.querySelector(".temp");
const where = document.getElementById("where");
const time = document.querySelector(".when");
const weatherIcon = document.getElementById("weatherIcon");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log(citySearch.value);
  fetchWeather();
  fetchHWeather();
});

//fetch weather api and show on the interface

const fetchWeather = () => {
  if (citySearch.value.trim() === "") {
    inputAlert.style.display = "block";
  } else if (citySearch.value.trim() !== "") {
    API_KEY = "f73a6b04d6a84de6ae6195038230703";
    url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${citySearch.value}&aqi=no`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("This is :" + data.current.condition);
        if (data.message === "city not found") {
          inputAlert.style.display = "block";
        } else {
          inputAlert.style.display = "none";
          cloudC.innerText = `${data.current.cloud}%`;
          humidityC.innerText = `${data.current.humidity}%`;
          windyC.innerText = `${data.current.wind_kph} km/h`;
          temp.innerText = `${Math.floor(data.current.temp_c)} °`;
          where.innerText = `${data.location.name}`;

          let day_night = "day";
          if (!data.current.is_day) {
            day_night = "night";
          }

          const iconId = data.current.condition.icon.substr(
            `//cdn.weatherapi.com/weather/64x64/${day_night}`.length
          );
          weatherIcon.src =
            `/Weather/weather-content/icon/${day_night}` + iconId;

          const code = data.current.condition.code;
          if (code == 1000) {
            weatherApp.style.backgroundImage = `url(/Weather/weather-content/${day_night}/clear.jpg)`;
          } else if (
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282
          ) {
            weatherApp.style.backgroundImage = `url(/Weather/weather-content/${day_night}/cloudy.jpg)`;
          } else if (
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 ||
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1252
          ) {
            weatherApp.style.backgroundImage = `url(/Weather/weather-content/${day_night}/rainy.jpg)`;
          } else {
            weatherApp.style.backgroundImage = `url(/Weather/weather-content/${day_night}/snow.jpg)`;
          }
        }
      })
      .catch((inputAlert.style.display = "block"));
  }
  citySearch.value = "";
};

const fetchHWeather = () => {
  API_KEY =
    "http://api.weatherapi.com/v1/current.json?key=f73a6b04d6a84de6ae6195038230703&q=&aqi=no";
  url = `http://api.weatherapi.com/v1/current.json?key=f73a6b04d6a84de6ae6195038230703&q=${citySearch.value}&aqi=no`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data));
};
