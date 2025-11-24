class Tab{
    constructor(id, name, btnName, activeByDefault=false){
        this.id = id
        this.name = name
        this.btnName = btnName
        this.activeByDefault = activeByDefault
    }

    showTab() {
        document.getElementById(this.name).style.display = "block";
        document.getElementById(this.btnName).classList.add("active");
        chrome.storage.local.set({ ["selected_tab"]:  this.id});
    }
}