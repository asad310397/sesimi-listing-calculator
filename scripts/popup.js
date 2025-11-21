function saveTextOnChange() {
  const newText = this.value;
  chrome.storage.local.set({ [this.id]: newText });

  document.getElementById("new_cars_result").textContent = "0.00";
  document.getElementById("cpo_cars_result").textContent = "0.00";
}

function showListingCalculator() {
  document.getElementById("listing-calculator").style.display = "block";
  document.getElementById("email-calculator").style.display = "none";
  document.getElementById("listingTab").classList.add("active");
  document.getElementById("emailTab").classList.remove("active");
  chrome.storage.local.set({ ["selected_tab"]: "listing" });
}

function showEmailCalculator() {
  document.getElementById("listing-calculator").style.display = "none";
  document.getElementById("email-calculator").style.display = "block";
  document.getElementById("emailTab").classList.add("active");
  document.getElementById("listingTab").classList.remove("active");
  chrome.storage.local.set({ ["selected_tab"]: "email" });
}

const setTabs = () => {
  chrome.storage.local.get(["selected_tab"], (result) => {
    if (result["selected_tab"]) {
      selected_tab = result["selected_tab"];
      if (selected_tab === "listing") {
        showListingCalculator();
      } else if (selected_tab === "email") {
        showEmailCalculator();
      }
    } else {
      chrome.storage.local.set({ ["selected_tab"]: "listing" });
      showListingCalculator();
    }
  });
};

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
}

const initialize = () => {
  setTabs();

  loadText();

  document
    .getElementById("listingTab")
    .addEventListener("click", showListingCalculator);

  document
    .getElementById("emailTab")
    .addEventListener("click", showEmailCalculator);
};

document.addEventListener("DOMContentLoaded", initialize());
