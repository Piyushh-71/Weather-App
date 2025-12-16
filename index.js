let tempE1 = document.querySelector("#temp");
let locationE1 = document.querySelector("#location");
let inputE1 = document.querySelector("#input");
let btnE1 = document.querySelector("#btn");
let wind = document.querySelector("#wind");
let humidity = document.querySelector("#Humidity");
let time = document.querySelector("#time");
let Vw = document.querySelector("#Vw");
let Visiblity = document.querySelector("#Visiblity");
let status = document.querySelector("#status");
let p = document.querySelector("#p");
let sunrise = document.querySelector("#sunrise");
let sunset = document.querySelector("#sunset");
let Feels = document.querySelector("#Feels");
let bottom = document.querySelector("#bottom");
let remove = document.querySelector("#orim");

const now = new Date();
let hours = now.getHours();
const minutes = now.getMinutes();
const ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12 || 12;

async function getweather(city) {
  try {
    const API = "de8d3c33f0a0b14f6cc84e3f90f80700";

    const raw = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`
    );

    if (!raw.ok) throw new Error("City not found");

    const real = await raw.json();

    locationE1.innerHTML = real.name + " , " + real.sys.country;
    tempE1.innerHTML = real.main.temp + "°C";
    humidity.innerHTML = real.main.humidity + "%";
    wind.innerHTML = real.wind.speed + " km/h";
    Feels.innerHTML = real.main.feels_like + "°C";
    time.innerHTML = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;

    function formatTime(unix) {
      return new Date(unix * 1000)
        .toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .toUpperCase();
    }

    sunrise.innerHTML = formatTime(real.sys.sunrise);
    sunset.innerHTML = formatTime(real.sys.sunset);

    const vis = Math.floor(real.visibility / 1000);
    Visiblity.innerHTML = vis + " km";

    document.querySelector("#weather-icon")?.remove();

    let statuse =
      vis >= 9
        ? "Clear🌤️"
        : vis >= 5
        ? "Hazy🌫️"
        : vis >= 2
        ? "Misty🌁"
        : "Foggy🌫️";

    status.innerHTML = statuse;

    function tempCondition(temp) {
      if (temp <= 0) return "Freezing❄️";
      if (temp <= 10) return "Very Cold 🥶";
      if (temp <= 18) return "Cold 🌬️";
      if (temp <= 25) return "Pleasant 😌";
      if (temp <= 32) return "Warm 🌤️";
      if (temp <= 38) return "Hot 🔥";
      return "Extreme Heat 🥵";
    }

    const cond = tempCondition(real.main.temp);
    p.innerHTML = cond;

    const icon = document.createElement("img");
    icon.id = "weather-icon";

    if (cond === "Very Cold 🥶" || cond === "Freezing❄️") {
      icon.src = "https://img.icons8.com/fluency/48/snow.png";
      icon.alt = "snow";
    } else if (statuse === "Foggy🌫️") {
      icon.src = "https://img.icons8.com/fluency/48/foggy-night-1.png";
      icon.alt = "foggy";
    } else if (statuse === "Misty🌁") {
      icon.src = "https://img.icons8.com/fluency/48/wet.png";
      icon.alt = "misty";
    } else if (statuse === "Hazy🌫️") {
      icon.src = "https://img.icons8.com/fluency/48/smoke.png";
      icon.alt = "hazy";
    } else {
      icon.src = "https://img.icons8.com/fluency/48/partly-cloudy-day.png";
      icon.alt = "clear";
    }

    tempE1.before(icon);

    Vw.innerHTML = real.wind.gust ? real.wind.gust + " Vw" : "N/A";

    remove?.remove();
  } catch (err) {
    console.error(err);
  }
}

function Enter() {
  const value = inputE1.value.trim();
  if (!value) return alert("Type something first");
  getweather(value);
  inputE1.value = "";
}

btn.addEventListener("click", Enter);

inputE1.addEventListener("keydown", (e) => {
  if (e.key === "Enter") Enter();
});
