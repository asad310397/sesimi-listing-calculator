function calculateResults() {
  const new_cars = parseFloat(document.getElementById("new_cars").value) || 0;
  const cpo_cars = parseFloat(document.getElementById("cpo_cars").value) || 0;
  const total_cars =
    parseFloat(document.getElementById("total_cars").value) || 0;
  const original_amount =
    parseFloat(document.getElementById("original_amount").value) || 0;

  document.getElementById("new_cars_result").textContent = (
    (new_cars / total_cars) *
    original_amount
  ).toFixed(2);
  document.getElementById("cpo_cars_result").textContent = (
    (cpo_cars / total_cars) *
    original_amount
  ).toFixed(2);
}

document
  .getElementById("calculateBtn")
  .addEventListener("click", calculateResults);
