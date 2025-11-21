function emailText(result, original_amount) {
  return (
    (result.toFixed(2) * original_amount).toFixed(2) +
    " (" +
    (result * 100).toFixed(2) +
    "%)"
  );
}
function calculateEmailResults() {
  const x_one = parseFloat(document.getElementById("x_one").value) || 0;
  const y_one = parseFloat(document.getElementById("y_one").value) || 0;
  const x_two = parseFloat(document.getElementById("x_two").value) || 0;
  const y_two = parseFloat(document.getElementById("y_two").value) || 0;

  const original_amount =
    parseFloat(document.getElementById("email_original_amount").value) || 0;

  if (x_one === 0 || y_one === 0 || x_two === 0 || y_two === 0) {
    document.getElementById("new_amount").textContent = "0.00";
    return;
  }

  let new_amount_result = (x_two * y_two) / (x_one * y_one);

  document.getElementById("new_amount").textContent = emailText(
    1 - new_amount_result,
    original_amount
  );

  chrome.storage.local.set({
    ["new_amount"]: 1 - new_amount_result.toFixed(2),
  });

  document.getElementById("excl_amount").textContent = emailText(
    new_amount_result,
    original_amount
  );

  chrome.storage.local.set({
    ["excl_amount"]: new_amount_result.toFixed(2),
  });
}

function clearEmailResults() {
  const inputs = ["x_one", "y_one", "x_two", "y_two", "email_original_amount"];
  inputs.forEach((input) => {
    document.getElementById(input).value = "";
    chrome.storage.local.remove(input);
  });

  chrome.storage.local.remove("new_amount");
  document.getElementById("new_amount").textContent = "0.00";

  chrome.storage.local.remove("excl_amount");
  document.getElementById("excl_amount").textContent = "0.00";
}

const onEmailLoad = () => {
  chrome.storage.local.get(["email_original_amount"], (result) => {
    if (result["email_original_amount"]) {
      const original_amount = parseFloat(result["email_original_amount"]);

      if (original_amount === 0) {
        return;
      }

      chrome.storage.local.get(["new_amount"], (result) => {
        if (result["new_amount"]) {
          document.getElementById("new_amount").textContent = emailText(
            parseFloat(result["new_amount"]),
            original_amount
          );
        } else {
          document.getElementById("new_amount").textContent = "0.00";
        }
      });

      chrome.storage.local.get(["excl_amount"], (result) => {
        if (result["excl_amount"]) {
          document.getElementById("excl_amount").textContent = emailText(
            parseFloat(result["excl_amount"]),
            original_amount
          );
        } else {
          document.getElementById("excl_amount").textContent = "0.00";
        }
      });
    }
  });
};

const initialize_email = () => {
  onEmailLoad();
  const inputs = document.querySelectorAll("input[type='number']");
  inputs.forEach((input) => {
    input.addEventListener("input", saveTextOnChange);
  });

  document
    .getElementById("calculateEmailBtn")
    .addEventListener("click", calculateEmailResults);

  document
    .getElementById("clearEmailBtn")
    .addEventListener("click", clearEmailResults);
};

document.addEventListener("DOMContentLoaded", initialize_email());
