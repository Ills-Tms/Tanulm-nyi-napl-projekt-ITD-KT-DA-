const datumsor = document.getElementById("datum");
const ido = document.getElementById("ido");
const eventTimeSpan = document.getElementById("eventTime");
const inputForm = document.getElementById("inputForm");
const eventInput = document.getElementById("eventInput");
const eventTypeSelect = document.getElementById("eventType"); // Legördülő lista hivatkozás
let events = {};

function ÓraFrissites() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  ido.textContent = `${hours}:${minutes}:${seconds}`;
}

const eventStyles = {
  dolgozat: "doldozat",
  beadando:"beadando",
  feleles: "feleles",
  meeting: "meeting",
  szakkor:"szakkor",
  egyebDolgok:"egyebDolgok"
};


function frissit() {
  const now = new Date();
  const ev = now.getFullYear();
  const honap = String(now.getMonth() + 1).padStart(2, "0");
  const nap = String(now.getDate()).padStart(2, "0");

  datumsor.innerText = `${ev}.${honap}.${nap}`;
}

setInterval(ÓraFrissites, 1000);
ÓraFrissites();

setInterval(frissit, 1000);
frissit();

document.querySelectorAll(".clickable").forEach((cell) => {
  cell.addEventListener("click", function () {
    const day = this.getAttribute("data-day");
    const time = this.getAttribute("data-time");
    eventTimeSpan.textContent = `${day}. nap - ${time}`;
    inputForm.style.display = "block";
    eventInput.value = "";
    eventInput.focus();

    inputForm.setAttribute("data-day", day);
    inputForm.setAttribute("data-time", time);
  });
});

function saveEvent() {
  const day = inputForm.getAttribute("data-day");
  const time = inputForm.getAttribute("data-time");
  const event = eventInput.value;
  const eventType = eventTypeSelect.value; // Az esemény típusa a legördülő listából

  if (!event) {
    alert("Kérlek írd be a terveidet");
    return;
  }

  if (!events[day]) {
    events[day] = {};
  }
  events[day][time] = { text: event, type: eventType };

  updateCalendar();

  inputForm.style.display = "none";
}

function updateCalendar() {
  document.querySelectorAll(".clickable").forEach((cell) => {
    const day = cell.getAttribute("data-day");
    const time = cell.getAttribute("data-time");

    if (events[day] && events[day][time]) {
      const { text, type } = events[day][time];

      cell.innerHTML = `<div class="event ${eventStyles[type]}">${text}</div>`;
    } else {
      cell.innerHTML = "";
    }
  });
}

function showPopup() {
  document.getElementById("popup").style.display = "flex";
}

// A pop-up ablak bezárása
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// Teendők oldal megnyitása (ideiglenes, pl. új oldalra mutathat)
function viewTasks() {
  window.location.href = "/Tanulm-nyi-napl-projekt-ITD-KT-DA-/teendok";  // Cseréld ki a megfelelő linkre
}

function showLogin(){
  document.getElementById("loginForm").style.display="flex";
}

function closeLogin(){
  document.getElementById("loginForm").style.display="none";
}

function showRegister(){
  document.getElementById("registerForm").style.display="flex";
}

function closeRegister(){
  document.getElementById("registerForm").style.display="none";
}

const apiKey = "f02435607a5e4bf090773090dfb62ae1";
 const submitBtn = document.getElementById("submit-btn");
 const cityInput = document.getElementById("city-input");
 const weatherInfo = document.getElementById("weather-info");
 const loadingMessage = document.getElementById("loading-message");
 const errorMessage = document.getElementById("error-message");
 
 function getWeather(city) {
   loadingMessage.style.display = "block";
   errorMessage.textContent = "";
   weatherInfo.textContent = "";
 
   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=hu`;
 
   fetch(apiUrl)
     .then((response) => response.json())
     .then((data) => {
       loadingMessage.style.display = "none";
 
       if (data.cod !== 200) {
         errorMessage.textContent = "Város nem található. Próbálkozz újra";
         return;
       }
 
       const { name, weather, main } = data;
       weatherInfo.innerHTML = `
                 <div class="weather-detail"><strong>Város:</strong> ${name}</div>
                 <div class="weather-detail"><strong>Időjárás:</strong> ${weather[0].description}</div>
                 <div class="weather-detail"><strong>Hőmérséglet:</strong> ${main.temp}°C</div>
                 <div class="weather-detail"><strong>Páratartalom:</strong> ${main.humidity}%</div>
             `;
     })
     .catch((error) => {
       loadingMessage.style.display = "none";
       errorMessage.textContent = "Probléma történt az adatok betöltésében";
       console.error("Probléma történt az adatok lekerésében:", error);
     });
 }
 
 submitBtn.addEventListener("click", () => {
   const city = cityInput.value.trim();
   if (city) {
     getWeather(city);
   } else {
     errorMessage.textContent = "Kérlek írj be egy várost";
   }
 });
 
 cityInput.addEventListener("keypress", (e) => {
   if (e.key === "Enter") {
     submitBtn.click();
   }
 });
 
 /*----------------------------------------------------------------------------------------------------*/
 
 // script.js
 // A pop-up ablak megjelenítése
 function showPopup() {
     document.getElementById("popup").style.display = "flex";
 }
 
 // A pop-up ablak bezárása
 function closePopup() {
     document.getElementById("popup").style.display = "none";
 }
 
 // Teendők oldal megnyitása (ideiglenes, pl. új oldalra mutathat)
 function viewTasks() {
     window.location.href = "/teendok.html";  // Cseréld ki a megfelelő linkre
 }
 
 // Példa, hogyan jelenítsük meg a pop-upot 
 setTimeout(showPopup, 60000);  