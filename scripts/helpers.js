function saveTextOnChange() {
  const newText = this.value;
  chrome.storage.local.set({ [this.id]: newText });

  document.getElementById("new_cars_result").textContent = "0.00";
  document.getElementById("cpo_cars_result").textContent = "0.00";
  document.getElementById("new_amount").textContent = "0.00";
  document.getElementById("excl_amount").textContent = "0.00";
  chrome.storage.local.remove("new_cars_result");
  chrome.storage.local.remove("cpo_cars_result");
  chrome.storage.local.remove("new_amount");
  chrome.storage.local.remove("excl_amount");
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
}
