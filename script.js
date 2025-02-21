const datumsor = document.getElementById("datum");
const ido = document.getElementById("ido");
const eventTimeSpan = document.getElementById("eventTime");
const inputForm = document.getElementById("inputForm");
const eventInput = document.getElementById("eventInput");
let events = {};

function ÓraFrissites() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  ido.textContent = `${hours}:${minutes}:${seconds}`;
}

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

  if (!event) {
    alert("Kérlek írd be a terveidet");
    return;
  }

  if (!events[day]) {
    events[day] = {};
  }
  events[day][time] = event;

  updateCalendar();

  inputForm.style.display = "none";
}

function updateCalendar() {
  document.querySelectorAll(".clickable").forEach((cell) => {
    const day = cell.getAttribute("data-day");
    const time = cell.getAttribute("data-time");
    const eventCell = cell.querySelector(".event");
    if (eventCell) {
      eventCell.remove();
    }

    if (events[day] && events[day][time]) {
      const event = events[day][time];
      const eventElement = document.createElement("div");
      eventElement.classList.add("event");
      eventElement.textContent = event;
      cell.appendChild(eventElement);
    }
  });
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

// Példa, hogyan jelenítsük meg a pop-upot 10 másodperc után
setTimeout(showPopup, 10000);  // 10 másodperc után megjelenik




/*
function setReminder() {
  let text = document.getElementById("reminder-text").value;
  let time = document.getElementById("reminder-time").value;
  
  if (!text || !time) {
      alert("Kérlek, adj meg egy teendőt és egy időpontot!");
      return;
  }

  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  reminders.push({ text, time });
  localStorage.setItem("reminders", JSON.stringify(reminders));

  displayReminders();
}

function displayReminders() {
  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  let reminderList = document.getElementById("reminders");
  reminderList.innerHTML = "";

  reminders.forEach((reminder, index) => {
      let li = document.createElement("li");
      li.textContent = `${reminder.text} - ${new Date(reminder.time).toLocaleString()}`;
      
      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌";
      deleteBtn.onclick = () => deleteReminder(index);

      li.appendChild(deleteBtn);
      reminderList.appendChild(li);
  });
}

function deleteReminder(index) {
  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  reminders.splice(index, 1);
  localStorage.setItem("reminders", JSON.stringify(reminders));
  displayReminders();
}

// Ellenőrizzük az időt, és ha eljön az idő, értesítést küldünk
setInterval(() => {
  let now = new Date().getTime();
  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

  reminders.forEach((reminder, index) => {
      let reminderTime = new Date(reminder.time).getTime();
      if (reminderTime <= now) {
          alert(`⏰ Emlékeztető: ${reminder.text}`);
          deleteReminder(index); // Automatikusan törli a teljesített emlékeztetőt
      }
  });
}, 60000); // 60 másodpercenként ellenőrzi
*/
