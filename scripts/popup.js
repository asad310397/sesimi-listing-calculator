const getStorageTab = (tabs) => {
  chrome.storage.local.get(["selected_tab"], (result) => {
    if (result["selected_tab"]) {
      tabs.filter((tab) => tab.id == result["selected_tab"])[0].showTab();
    } else {
      tabs.filter((tab) => tab.activeByDefault)[0].showTab()
    }
  });
};

const openTab = (tabs, tabName) => {
  tabs.forEach((tab) => {
    document.getElementById(tab.name).style.display = "none";
    document.getElementById(tab.btnName).classList.remove("active");
  })

  if(typeof tabName === "undefined"){
    getStorageTab(tabs)
  }
  else{
    tabs.filter((tab) => tab.name == tabName)[0].showTab()
  }
}


const initialize = () => {
  const tabs = [new Tab("listing", "listing-calculator", "listingTab", true),
     new Tab("email", "email-calculator", "emailTab")]

  tabs.forEach((tab) => {
    document
      .getElementById(tab.btnName)
      .addEventListener("click", () => {openTab(tabs, tab.name)})
  })

  openTab(tabs);
  loadText();

};

document.addEventListener("DOMContentLoaded", initialize());
