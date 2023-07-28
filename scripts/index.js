const apiKey = "1407d58240fb0125b4512f467a9b0a50";
const apiCountryUrl = "https://flagsapi.com/png";

const cityInput = document.querySelector("#cityInput");
const secondPart = document.querySelector("#mainContentSecondPart");
const secondPartButtons = document.querySelectorAll(
  ".mainContentButtonsPartButtons"
);
const carregando = document.querySelector("#carregando");
const erro = document.querySelector("#erro");
const weatherData = document.querySelector("#weatherData");
const cityElement = document.querySelector("#city");
const wind = document.querySelector("#wind span");
const description = document.querySelector("#description");
const weatherIcon = document.querySelector("#weatherIcon");
const umidity = document.querySelector("#umidity span");
const temperature = document.querySelector("#temperature span");
const countryFlag = document.querySelector("#coutnryFlag");

const getWeatherData = async (city) => {
  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  const res = await fetch(apiWeatherUrl);
  const data = await res.json();
  return data;
};

const loading = async () => {
  carregando.classList.remove("hide");
  secondPart.classList.add("hide");
  weatherData.classList.add("hide");
  erro.classList.add("hide");
  setTimeout(() => {
    carregando.classList.add("hide");
  }, 2000);
};

const showWeather = async (city) => {
  await loading();
  const data = await getWeatherData(city);
  if (data.message == "city not found") {
    erro.classList.remove("hide");
  } else {
    weatherData.classList.remove("hide");
    cityElement.innerText = data.name;
    temperature.innerText = parseInt(data.main.temp);
    umidity.innerText = data.main.humidity;
    wind.innerText = data.wind.speed.toFixed(1);
    description.innerText = data.weather[0].description;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    countryFlag.src = `https://flagsapi.com/${data.sys.country}/shiny/64.png`;
    console.log(data);
  }
};

document.querySelector("#searchButton").addEventListener("click", (ev) => {
  ev.preventDefault();
  showWeather(cityInput.value);
});

//secondPartButtons.forEach(
//  addEventListener("click", (ev) => {
//    ev.preventDefault();
//    showWeather(ev.target.value);
//  })
//);

cityInput.addEventListener("keyup", (ev) => {
  if (ev.code == "Enter") {
    showWeather(cityInput.value);
  }
});
