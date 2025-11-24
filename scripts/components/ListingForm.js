class ListingForm {
  constructor() {
    this.form = new TabForm(
      [
        {
          id: "new_cars",
          name: "new_cars",
          default: "",
          original_amount: false,
        },
        {
          id: "cpo_cars",
          name: "cpo_cars",
          default: "",
          original_amount: false,
        },
        {
          id: "total_cars",
          name: "total_cars",
          default: "",
          original_amount: false,
        },
        {
          id: "original_amount",
          name: "original_amount",
          default: "",
          original_amount: true,
        },
      ],
      [
        { id: "new_cars_result", name: "new_cars_result", default: "0.00" },
        { id: "cpo_cars_result", name: "cpo_cars_result", default: "0.00" },
      ],
      this.textFormatter
    );

    document
      .getElementById("calculateListingBtn")
      .addEventListener("click", this.calculate);

    document
      .getElementById("clearListingBtn")
      .addEventListener("click", this.form.clear);
  }

  calculate = () => {
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

    document.getElementById("new_cars_result").textContent = this.textFormatter(
      newCarResult.toFixed(2),
      original_amount
    );
    document.getElementById("cpo_cars_result").textContent = this.textFormatter(
      cpoCarResult.toFixed(2),
      original_amount
    );

    chrome.storage.local.set({ ["new_cars_result"]: newCarResult.toFixed(2) });
    chrome.storage.local.set({ ["cpo_cars_result"]: cpoCarResult.toFixed(2) });
  };

  textFormatter = (result, original_amount) => {
    return result + " (-" + (original_amount - result).toFixed(2) + ")";
  };
}
