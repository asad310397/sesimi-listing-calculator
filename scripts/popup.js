function calculateResults() {
  const new_cars = parseFloat(document.getElementById("new_cars").value) || 0;
  const cpo_cars = parseFloat(document.getElementById("cpo_cars").value) || 0;
  const total_cars =
    parseFloat(document.getElementById("total_cars").value) || 0;
  const original_amount =
    parseFloat(document.getElementById("original_amount").value) || 0;

  if (total_cars === 0) {
    document.getElementById("new_cars_result").textContent = "0.00";
    document.getElementById("cpo_cars_result").textContent = "0.00";
    return;
  }
  let newCarResult = (new_cars / total_cars) * original_amount;
  let cpoCarResult = (cpo_cars / total_cars) * original_amount;
  document.getElementById("new_cars_result").textContent =
    newCarResult.toFixed(2);
  document.getElementById("cpo_cars_result").textContent =
    cpoCarResult.toFixed(2);

  chrome.storage.local.set({ ["new_cars_result"]: newCarResult.toFixed(2) });

  chrome.storage.local.set({ ["cpo_cars_result"]: cpoCarResult.toFixed(2) });
}

function loadText() {
  let elements = document.querySelectorAll("input[type='number']");
  for (let i = 0; i < elements.length; i++) {
    let currentKey = elements[i].id;
    chrome.storage.local.get([currentKey], (result) => {
      if (result[currentKey]) {
        elements[i].value = result[currentKey];
      }
    });
  }

  chrome.storage.local.get(["new_cars_result"], (result) => {
    if (result["new_cars_result"]) {
      document.getElementById("new_cars_result").textContent =
        result["new_cars_result"];
    }
  });

  chrome.storage.local.get(["cpo_cars_result"], (result) => {
    if (result["cpo_cars_result"]) {
      document.getElementById("cpo_cars_result").textContent =
        result["cpo_cars_result"];
    }
  });
}

function saveTextOnChange() {
  const newText = this.value;
  chrome.storage.local.set({ [this.id]: newText });

  document.getElementById("new_cars_result").textContent = "0.00";
  document.getElementById("cpo_cars_result").textContent = "0.00";
}

function clearResults() {
  const inputs = document.querySelectorAll("input[type='number']");
  inputs.forEach((input) => {
    input.value = "";
    chrome.storage.local.remove(input.id);
  });

  chrome.storage.local.remove("new_cars_result");
  chrome.storage.local.remove("cpo_cars_result");
  document.getElementById("new_cars_result").textContent = "0.00";
  document.getElementById("cpo_cars_result").textContent = "0.00";
}

function initialize() {
  const inputs = document.querySelectorAll("input[type='number']");
  inputs.forEach((input) => {
    input.addEventListener("input", saveTextOnChange);
  });

  loadText();

  document
    .getElementById("calculateBtn")
    .addEventListener("click", calculateResults);

  document.getElementById("clearBtn").addEventListener("click", clearResults);
}

document.addEventListener("DOMContentLoaded", initialize);
