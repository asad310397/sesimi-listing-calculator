class TabForm {
  constructor(inputs, outputs, textFormatter) {
    this.inputs = inputs;
    this.outputs = outputs;
    this.textFormatter = textFormatter;

    this.inputs.forEach((input) => {
      const inputElement = document.getElementById(input.id);
      inputElement.addEventListener("input", saveTextOnChange);
    });

    this.onLoad();
  }

  onLoad() {
    let original_amount = 0;
    let original_amount_field = this.inputs.find(
      (field) => field.original_amount
    );

    chrome.storage.local.get([original_amount_field.id], (result) => {
      if (result[original_amount_field.id]) {
        original_amount = parseFloat(result[original_amount_field.id]);
      }

      if (original_amount == 0) {
        return;
      }

      this.outputs.forEach((element) => {
        chrome.storage.local.get([element.id], (result) => {
          if (result[element.id]) {
            document.getElementById(element.id).textContent =
              this.textFormatter(
                parseFloat(result[element.id]),
                original_amount
              );
          } else {
            document.getElementById(element.id).textContent = element.default;
          }
        });
      });
    });
  }

  clear = () => {
    this.inputs.forEach((element) => {
      document.getElementById(element.id).value = element.default;
      chrome.storage.local.remove(element.id);
    });

    this.outputs.forEach((element) => {
      document.getElementById(element.id).textContent = element.default;
      chrome.storage.local.remove(element.id);
    });
  };
}
