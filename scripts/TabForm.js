class TabForm{
  constructor(inputs, outputs, calculateFn, calculateBtn, clearBtn, textFormatter){
    this.inputs = inputs
    this.outputs = outputs
    this.calculateFn = calculateFn
    this.textFormatter = textFormatter
    
    this.onLoad()

    document
        .getElementById(calculateBtn)
        .addEventListener("click", this.calculateFn);

    document
        .getElementById(clearBtn)
        .addEventListener("click", this.clear);
  }

  onLoad(){
    let original_amount = 0;
    let original_amount_field = this.inputs.filter((field) => field.original_amount);

    chrome.storage.local.get([original_amount_field.id], (result) => {
        if(result[original_amount_field.id]){
            original_amount = parseFloat(result[original_amount_field.id])
        }

        if(original_amount == 0){
            return;
        }

        this.outputs.forEach((element) => {
            chrome.storage.local.get([element.id], (result) => {
                if (result[element.id]) {
                    document.getElementById(element.id).textContent = this.textFormatter(
                            parseFloat(result[element.id]),
                            original_amount
                        );
                } else {
                    document.getElementById(element.id).textContent = element.defaultValue;
                }
            });
        })
    })

  }

  clear(){
    this.fields = [this.inputs, this.outputs]
    this.fields.forEach((element) => {
        document.getElementById(element.id).value = element.default;
        chrome.storage.local.remove(element.id);
    });
  }

}
