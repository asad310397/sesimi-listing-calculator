function listingText(result, original_amount) {
  return result + " (-" + (original_amount - result).toFixed(2) + ")";
}

function evalInput(value) {
  let stack = [];
  let currentNumber = "";
  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    if ("0123456789.".includes(char)) {
      currentNumber += char;
    } else if ("+-*/".includes(char)) {
      if (currentNumber) {
        stack.push(parseFloat(currentNumber));
        currentNumber = "";
      }
      stack.push(char);
    }
  }
  if (currentNumber) {
    stack.push(parseFloat(currentNumber));
  }

  // Evaluate the expression
  let result = 0;
  let operator = "+";
  for (let i = 0; i < stack.length; i++) {
    const item = stack[i];
    if (typeof item === "number") {
      if (operator === "+") {
        result += item;
      } else if (operator === "-") {
        result -= item;
      } else if (operator === "*") {
        result *= item;
      } else if (operator === "/") {
        result /= item;
      }
    } else {
      operator = item;
    }
  }
  return result;
}

function getValue(id) {
  const value = document.getElementById(id).value;
  if (
    value.indexOf("+") >= 0 ||
    value.indexOf("-") >= 0 ||
    value.indexOf("*") >= 0 ||
    value.indexOf("/") >= 0
  ) {
    let result = evalInput(value);
    document.getElementById(id + "_calc").textContent = "(" + result + ")";
    return result;
  }
  return isNaN(value) ? 0 : value;
}

function calculateListingResults() {
  const new_cars = getValue("new_cars");
  const cpo_cars = getValue("cpo_cars");
  const total_cars = getValue("total_cars");
  const original_amount = getValue("original_amount");

  if (total_cars === 0) {
    document.getElementById("new_cars_result").textContent = "0.00";
    document.getElementById("cpo_cars_result").textContent = "0.00";
    return;
  }
  let newCarResult = (new_cars / total_cars) * original_amount;
  let cpoCarResult = (cpo_cars / total_cars) * original_amount;

  document.getElementById("new_cars_result").textContent = listingText(
    newCarResult.toFixed(2),
    original_amount
  );
  document.getElementById("cpo_cars_result").textContent = listingText(
    cpoCarResult.toFixed(2),
    original_amount
  );

  chrome.storage.local.set({ ["new_cars_result"]: newCarResult });
  chrome.storage.local.set({ ["cpo_cars_result"]: cpoCarResult });
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
  chrome.storage.local.get(
    ["original_amount", "new_cars_result", "cpo_cars_result"],
    (result) => {
      if (result["original_amount"]) {
        original_amount = parseFloat(result["original_amount"]);

        if (isNaN(result["original_amount"])) {
          original_amount = evalInput(result["original_amount"]);
        }

        if (isNaN(original_amount)) {
          original_amount = 0;
        }

        if (result["new_cars_result"]) {
          document.getElementById("new_cars_result").textContent = listingText(
            parseFloat(result["new_cars_result"]).toFixed(2),
            original_amount
          );
        } else {
          document.getElementById("new_cars_result").textContent = "0.00";
        }

        if (result["cpo_cars_result"]) {
          document.getElementById("cpo_cars_result").textContent = listingText(
            parseFloat(result["cpo_cars_result"]).toFixed(2),
            original_amount
          );
        } else {
          document.getElementById("cpo_cars_result").textContent = "0.00";
        }
      }
    }
  );
};

function initialize_listing() {
  const inputs = document.querySelectorAll("input");
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
