const tabs = ["listing", "email"]
function saveTextOnChange() {
  const newText = this.value;
  chrome.storage.local.set({ [this.id]: newText });

  document.getElementById("new_cars_result").textContent = "0.00";
  document.getElementById("cpo_cars_result").textContent = "0.00";
  document.getElementById("new_amount").textContent = "0.00";
  document.getElementById("excl_amount").textContent = "0.00";
}

function showTab(tab) {
  tabs.forEach((tab) => {
    document.getElementById(`${tab}-calculator`).style.display = "none";
    document.getElementById(`${tab}Tab`).classList.remove("active");
  })
  
  document.getElementById(`${tab}-calculator`).style.display = "block";
  document.getElementById(`${tab}Tab`).classList.add("active");
  chrome.storage.local.set({ ["selected_tab"]: tab });
}

const setTabs = () => {
  chrome.storage.local.get(["selected_tab"], (result) => {
    if (result["selected_tab"]) {
      selected_tab = result["selected_tab"];
      showTab(selected_tab)
    } else {
      chrome.storage.local.set({ ["selected_tab"]: "listing" });
      showTab("listing")
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

  tabs.forEach((tab) => {
    document
      .getElementById(`${tab}Tab`)
      .addEventListener("click", () => showTab(tab));
  })

};

document.addEventListener("DOMContentLoaded", initialize());
