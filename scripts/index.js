const apiKey = "1407d58240fb0125b4512f467a9b0a50";
const apiCountryUrl = "https://flagsapi.com/png";
const cityInput = document.querySelector("#cityInput");
const secondPart = document.querySelector("#mainContentSecondPart");
const secondPartButtons = document.querySelectorAll(
  ".mainContentButtonsPartButtons"
);
const loadingPart = document.querySelector("#loadingPart");
const erro = document.querySelector("#erro");
const weatherData = document.querySelector("#weatherData");
const cityElement = document.querySelector("#city");
const wind = document.querySelector("#wind span");
const description = document.querySelector("#description");
const weatherIcon = document.querySelector("#weatherIcon");
const humidity = document.querySelector("#humidity span");
const temperature = document.querySelector("#temperature span");
const countryFlag = document.querySelector("#coutnryFlag");

const getWeatherData = async (city) => {
  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  const res = await fetch(apiWeatherUrl);
  const data = await res.json();
  return data;
};

const loading = async () => {
  loadingPart.classList.remove("hide");
  secondPart.classList.add("hide");
  weatherData.classList.add("hide");
  erro.classList.add("hide");
};

const hideLoading = async (error) => {
  loadingPart.classList.add("hide");
  if (error == 1) {
    erro.classList.remove("hide");
  } else {
    weatherData.classList.remove("hide");
  }
};

const showWeather = async (city) => {
  await loading();
  const data = await getWeatherData(city);
  if (data.message == "city not found" || city == "") {
    hideLoading(1);
    cityInput.value = "";
  } else {
    countryFlag.src = await getFlag(data.sys.country);
    cityElement.innerText = data.name;
    temperature.innerText = parseInt(data.main.temp);
    humidity.innerText = data.main.humidity;
    wind.innerText = data.wind.speed.toFixed(1);
    description.innerText = data.weather[0].description;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    cityInput.value = "";
    hideLoading(0);
  }
};

const getFlag = async (country) => {
  return `https://flagsapi.com/${country}/shiny/64.png`;
};

document.querySelector("#searchButton").addEventListener("click", (ev) => {
  ev.preventDefault();
  showWeather(cityInput.value);
});

secondPartButtons.forEach((input) => {
  input.addEventListener("click", (ev) => {
    ev.preventDefault();
    showWeather(ev.target.value);
  });
});

cityInput.addEventListener("keyup", (ev) => {
  if (ev.code == "Enter") {
    showWeather(cityInput.value);
  }
});
