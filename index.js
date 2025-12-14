// // function debounce(fn, delay) {
// //   let timer;
// //   return function () {
// //     clearTimeout(timer);
// //     timer = setTimeout(fn, delay);
// //   };
// // }
// // document.querySelector("input").addEventListener(
// //   "input",
// //   debounce(function () {
// //     console.log("chalegaa");
// //   }, 400)
// // );

let tempE1 = document.querySelector("#temp");
let locationE1 = document.querySelector("#location");
let inputE1 = document.querySelector("#input");
let btnE1 = document.querySelector("#btn");

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
  } catch (err) {
    console.error(err);
  }
}
function Enter() {
  const value = input.value.trim();
  if (value === "") {
    alert("Type something first 👀");
  } else {
    console.log("Searching for:", value);
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
