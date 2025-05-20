const loginPage = document.getElementById("login-page");
const dashboardPage = document.getElementById("dashboard-page");
const usernameInput = document.getElementById("username");
const nameInput = document.getElementById("name-input");
const displayName = document.getElementById("display-name");
const recordsList = document.getElementById("records");

function login() {
  const username = usernameInput.value.trim();
  if (!username) return alert("Enter a username.");
  displayName.textContent = username;
  loginPage.classList.add("hidden");
  dashboardPage.classList.remove("hidden");
  loadRecords();
}

function logout() {
  usernameInput.value = "";
  nameInput.value = "";
  loginPage.classList.remove("hidden");
  dashboardPage.classList.add("hidden");
}

function recordName() {
  const name = nameInput.value.trim();
  if (!name) return;
  const time = new Date().toLocaleString();
  const record = { name, time };

  const records = JSON.parse(localStorage.getItem("records")) || [];
  records.push(record);
  localStorage.setItem("records", JSON.stringify(records));
  nameInput.value = "";
  loadRecords();
}

function loadRecords() {
  const records = JSON.parse(localStorage.getItem("records")) || [];
  recordsList.innerHTML = "";
  records.forEach((rec, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${rec.name}</strong>
        <span>${rec.time}</span>
      </div>
      <button class="danger" onclick="deleteRecord(${index})">Delete</button>
    `;
    recordsList.appendChild(li);
  });
}

function deleteRecord(index) {
  const records = JSON.parse(localStorage.getItem("records")) || [];
  records.splice(index, 1);
  localStorage.setItem("records", JSON.stringify(records));
  loadRecords();
}

// Service Worker for offline support
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then(() => console.log("Service Worker registered"))
      .catch((err) => console.log("SW registration failed", err));
  });
}
