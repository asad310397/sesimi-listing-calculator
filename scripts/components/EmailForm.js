class EmailForm {
  constructor() {
    this.form = new TabForm(
      [
        { id: "x_one", name: "x_one", default: "", original_amount: false },
        { id: "y_one", name: "y_one", default: "", original_amount: false },
        { id: "x_two", name: "x_two", default: "", original_amount: false },
        { id: "y_two", name: "y_two", default: "", original_amount: false },
        {
          id: "email_original_amount",
          name: "email_original_amount",
          default: "",
          original_amount: true,
        },
      ],
      [
        {
          id: "new_amount",
          name: "new_amount",
          default: "0.00",
        },
        {
          id: "excl_amount",
          name: "excl_amount",
          default: "0.00",
        },
      ],
      this.textFormatter
    );

    this.form.onLoad();

    document
      .getElementById("calculateEmailBtn")
      .addEventListener("click", this.calculate);

    document
      .getElementById("clearEmailBtn")
      .addEventListener("click", this.form.clear);
  }

  calculate = () => {
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

    document.getElementById("new_amount").textContent = this.textFormatter(
      1 - new_amount_result,
      original_amount
    );

    chrome.storage.local.set({
      ["new_amount"]: 1 - new_amount_result.toFixed(2),
    });

    document.getElementById("excl_amount").textContent = this.textFormatter(
      new_amount_result,
      original_amount
    );

    chrome.storage.local.set({
      ["excl_amount"]: new_amount_result.toFixed(2),
    });
  };

  textFormatter = (result, original_amount) => {
    return (
      (result.toFixed(2) * original_amount).toFixed(2) +
      " (" +
      (result * 100).toFixed(2) +
      "%)"
    );
  };
}
