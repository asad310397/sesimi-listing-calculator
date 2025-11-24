function saveTextOnChange() {
  const newText = this.value;
  chrome.storage.local.set({ [this.id]: newText });

  document.getElementById("new_cars_result").textContent = "0.00";
  document.getElementById("cpo_cars_result").textContent = "0.00";
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