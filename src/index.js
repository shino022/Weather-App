import "./style.scss";
const buttonElem = document.querySelector("button");

buttonElem.addEventListener("click", async () => {
  const inputElem = document.querySelector("input");
  const input = inputElem.value;
  const { temp, weather } = await getWeather(input);
  render(temp, weather);
});

async function getWeather(city) {
  try {
    const apiKey = "2712f1d3ba36c50d8daa24851c720d6e";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    );
    const data = await res.json();
    const temp = Math.floor(data.main.temp);
    const weather = data.weather[0].main;
    console.log(typeof temp);
    return { temp, weather };
  } catch (err) {
    console.error(err);
  }
}

async function render(temp, weather) {
  const background = document.querySelector(".background");
  const body = document.querySelector("body");
  const gifUrl = await getGif(weather);
  const cover = document.querySelector(".cover");
  const tempElem = document.querySelector(".temp");
  const weatherElem = document.querySelector(".weather");
  tempElem.textContent = `${temp}℉`;
  weatherElem.textContent = weather;
  background.src = gifUrl;
  body.prepend(background);
  cover.classList.remove("hidden");
  background.classList.remove("hidden");
}

async function getGif(weather) {
  const apiKey = "sh6ESpeJXcVDktrTttVi3U8b1iisKU9l";
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/translate?s=${weather}&apiKey=${apiKey}`
  );
  const data = await res.json();
  const url = data.data.images.original.url;
  return url;
}
