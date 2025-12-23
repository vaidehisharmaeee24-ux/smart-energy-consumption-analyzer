// Store appliance data
let appliances = JSON.parse(localStorage.getItem("appliances")) || [];
let editIndex = null;
let energyChart = null;

// DOM elements
const nameInput = document.getElementById("applianceName");
const powerInput = document.getElementById("power");
const hoursInput = document.getElementById("hours");
const costInput = document.getElementById("unitCost");
const tableBody = document.getElementById("tableBody");

const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");

// Add appliance
addBtn.addEventListener("click", () => {
  const name = nameInput.value;
  const power = Number(powerInput.value);
  const hours = Number(hoursInput.value);
  const unitCost = Number(costInput.value);

  if (!name || power <= 0 || hours <= 0 || unitCost <= 0) {
    alert("Please enter valid values");
    return;
  }

  const energy = (power * hours) / 1000; // kWh
  const cost = energy * unitCost;

  appliances.push({ name, power, hours, energy, cost });
  clearInputs();
  renderTable();
});

// Render table and summary
function renderTable() {
  tableBody.innerHTML = "";

  let totalEnergy = 0;
  let totalCost = 0;
  let maxEnergy = 0;
  let peakAppliance = "";

  appliances.forEach((item, index) => {
    totalEnergy += item.energy;
    totalCost += item.cost;

    if (item.energy > maxEnergy) {
      maxEnergy = item.energy;
      peakAppliance = item.name;
    }

    const row = `
      <tr>
        <td>${item.name}</td>
        <td>${item.power}</td>
        <td>${item.hours}</td>
        <td>${item.energy.toFixed(2)}</td>
        <td>₹${item.cost.toFixed(2)}</td>
        <td>
          <button onclick="editAppliance(${index})">Edit</button>
          <button onclick="deleteAppliance(${index})">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });

  document.getElementById("totalEnergy").innerText =
    `Total Energy: ${totalEnergy.toFixed(2)} kWh`;

  document.getElementById("totalCost").innerText =
    `Total Cost: ₹${totalCost.toFixed(2)}`;

  document.getElementById("peakUsage").innerText =
    peakAppliance ? `Highest Consumption: ${peakAppliance}` : "";

  localStorage.setItem("appliances", JSON.stringify(appliances));
  updateChart();
}

// Edit appliance
function editAppliance(index) {
  const item = appliances[index];
  nameInput.value = item.name;
  powerInput.value = item.power;
  hoursInput.value = item.hours;
  costInput.value = item.cost / item.energy;

  editIndex = index;
  addBtn.classList.add("hidden");
  updateBtn.classList.remove("hidden");
}

// Update appliance
updateBtn.addEventListener("click", () => {
  const energy = (powerInput.value * hoursInput.value) / 1000;
  const cost = energy * costInput.value;

  appliances[editIndex] = {
    name: nameInput.value,
    power: Number(powerInput.value),
    hours: Number(hoursInput.value),
    energy,
    cost
  };

  editIndex = null;
  addBtn.classList.remove("hidden");
  updateBtn.classList.add("hidden");
  clearInputs();
  renderTable();
});

// Delete appliance
function deleteAppliance(index) {
  appliances.splice(index, 1);
  renderTable();
}

// Clear inputs
function clearInputs() {
  nameInput.value = "";
  powerInput.value = "";
  hoursInput.value = "";
  costInput.value = "";
}

// Chart logic
function updateChart() {
  const labels = appliances.map(appliance => appliance.name);
  const energyValues = appliances.map(appliance => appliance.energy);

  const ctx = document.getElementById("energyChart").getContext("2d");

  if (energyChart) {
    energyChart.destroy();
  }

  energyChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Energy Consumption (kWh)",
        data: energyValues,
        backgroundColor: "#4f46e5"
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Initial load
renderTable();