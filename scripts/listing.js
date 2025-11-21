function listingText(result, original_amount) {
  return (
    result.toFixed(2) +
    " (-" +
    (original_amount - result.toFixed(2)).toFixed(2) +
    ")"
  );
}
function calculateListingResults() {
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

  document.getElementById("new_cars_result").textContent = listingText(
    newCarResult,
    original_amount
  );
  document.getElementById("cpo_cars_result").textContent = listingText(
    cpoCarResult,
    original_amount
  );

  chrome.storage.local.set({ ["new_cars_result"]: newCarResult.toFixed(2) });
  chrome.storage.local.set({ ["cpo_cars_result"]: cpoCarResult.toFixed(2) });
}

function clearListingResults() {
  const inputs = ["new_cars", "cpo_cars", "total_cars", "original_amount"];
  inputs.forEach((input) => {
    document.getElementById(input).value = "";
    chrome.storage.local.remove(input);
  });

  chrome.storage.local.remove("new_cars_result");
  chrome.storage.local.remove("cpo_cars_result");
  document.getElementById("new_cars_result").textContent = "0.00";
  document.getElementById("cpo_cars_result").textContent = "0.00";
}

const onListingLoad = () => {
  let original_amount = 0;
  chrome.storage.local.get(["original_amount"], (result) => {
    if (result["original_amount"]) {
      original_amount = parseFloat(result["original_amount"]);
    }
  });
  if (original_amount === 0) {
    return;
  }

  chrome.storage.local.get(["new_cars_result"], (result) => {
    if (result["new_cars_result"]) {
      document.getElementById("new_cars_result").textContent = listingText(
        parseFloat(result["new_cars_result"]),
        original_amount
      );
    } else {
      document.getElementById("new_cars_result").textContent = "0.00";
    }
  });

  chrome.storage.local.get(["cpo_cars_result"], (result) => {
    if (result["cpo_cars_result"]) {
      document.getElementById("cpo_cars_result").textContent = listingText(
        parseFloat(result["cpo_cars_result"]),
        original_amount
      );
    } else {
      document.getElementById("cpo_cars_result").textContent = "0.00";
    }
  });
};

function initialize_listing() {
  const inputs = document.querySelectorAll("input[type='number']");
  inputs.forEach((input) => {
    input.addEventListener("input", saveTextOnChange);
  });

  onListingLoad();

  document
    .getElementById("calculateListingBtn")
    .addEventListener("click", calculateListingResults);

  document
    .getElementById("clearListingBtn")
    .addEventListener("click", clearListingResults);
}

document.addEventListener("DOMContentLoaded", initialize_listing());
