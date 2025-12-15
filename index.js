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

const now = new Date();
let hours = now.getHours();
const minutes = now.getMinutes();
const ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12 || 12;

async function getweather(city) {
  try {
    const API = "de8d3c33f0a0b14f6cc84e3f90f80700";
    let raw = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`
    );
    if (!raw.ok) {
      throw new Error(
        "city not found or something went wrong please try again"
      );
    }
    let real = await raw.json();
    console.log(real);
    locationE1.innerHTML = real.name + "  ," + real.sys.country;
    tempE1.innerHTML = real.main.temp + "°C";
    humidity.innerHTML = real.main.humidity + "%";
    wind.innerHTML = real.wind.speed + ", Km,h";
    time.innerHTML = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
    console.log(real);
    Feels.innerHTML = real.main.feels_like;

    function formatTime(unix) {
      return new Date(unix * 1000).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // 🔥 force AM/PM
      });
    }
    const sunrisee = formatTime(real.sys.sunrise);
    const sunsete = formatTime(real.sys.sunset);
    sunrise.innerHTML = sunrisee;
    sunset.innerHTML = sunsete;
    Vw.innerHTML = real.wind.gust + " Vw";
    const vis = (real.visibility / 1000).toFixed(0);
    console.log(vis + " km");
    let statuse =
      vis >= 9000
        ? "Clear🌤️"
        : vis >= 5000
        ? "Hazy🌫️"
        : vis >= 2000
        ? "Misty🌁"
        : "Foggy🌫️";

    Visiblity.innerHTML = vis + "km";
    status.innerHTML = statuse;
    console.log(statuse);
    function tempCondition(temp) {
      if (temp <= 0) return "Freezing❄️";
      if (temp <= 10) return "Very Cold 🥶";
      if (temp <= 18) return "Cold 🌬️";
      if (temp <= 25) return "Pleasant 😌";
      if (temp <= 32) return "Warm 🌤️";
      if (temp <= 38) return "Hot 🔥";
      return "Extreme Heat 🥵";
    }
    let cond = tempCondition(real.main.temp);
    p.innerHTML = cond;
  } catch (err) {
    console.error(err);
  }
}
function Enter() {
  const value = input.value.trim();
  if (value === "") {
    alert("Type something first" + value);
  } else {
    getweather(value);
    inputE1.value = "";
  }
}

btn.addEventListener("click", () => {
  Enter();
});

inputE1.addEventListener("keydown", function (dets) {
  if (dets.key === "Enter") {
    Enter();
  }
});
