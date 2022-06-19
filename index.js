let myLeads = []
const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn')

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads')) //gets leads from local storage

const tabBtn = document.getElementById('tab-btn')

//This function checks if there are any leads stored up in local storage.
//If there are any leads in local storage, then it renders the leads.
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

//This code uses the chrome extension api to get the current window, and the active tab.
//This code gets current tab from the google chrome browser window.
//For this to work, you need to add "permision" on the MANIFEST.JSON FILE
tabBtn.addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    render(myLeads)
  })
})

//This function renders the leads to the screen
//This is done by looping through the array passed in as an argument.
//For each loop a new li tag is created
function render(leads) {
  let listItems = ''
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
  }
  ulEl.innerHTML = listItems
}

// The delete btn is double clicked and this function is run to delete all items from local storage.
//Sets my leads array to empty and renders the empty array to the screen.
deleteBtn.addEventListener('dblclick', function () {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

// On click of the save btn, this function is run.
//The inputed link is saved to local storage and rendered to the screen.
inputBtn.addEventListener('click', function () {
  myLeads.push(inputEl.value)
  inputEl.value = ''
  localStorage.setItem('myLeads', JSON.stringify(myLeads))
  render(myLeads)
})
