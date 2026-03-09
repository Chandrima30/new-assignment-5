const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

const container = document.getElementById("issueContainer")

const spinner = document.getElementById("spinner")


function showSpinner(){

spinner.classList.remove("hidden")

}

function hideSpinner(){

spinner.classList.add("hidden")

}



function loadIssues(type){

showSpinner()

fetch(API)
.then(res => res.json())
.then(data => {

let issues = data.data

if(type === "open"){

issues = issues.filter(i => i.status === "open")

}

if(type === "closed"){

issues = issues.filter(i => i.status === "closed")

}

displayIssues(issues)

hideSpinner()

})

}



function displayIssues(issues){

container.innerHTML = ""

issues.forEach(issue => {

const card = document.createElement("div")

card.className = "bg-white p-4 rounded shadow cursor-pointer"

if(issue.status === "open"){

card.style.borderTop = "5px solid green"

}else{

card.style.borderTop = "5px solid purple"

}

card.innerHTML = `

<h3 class="font-bold">${issue.title}</h3>

<p>${issue.description}</p>

<p>Status: ${issue.status}</p>

<p>Author: ${issue.author}</p>

<p>Priority: ${issue.priority}</p>

<p>Label: ${issue.label}</p>

<p>${issue.createdAt}</p>

`

card.onclick = () => showModal(issue)

container.appendChild(card)

})

}



function showModal(issue){

document.getElementById("modal").classList.remove("hidden")

document.getElementById("modalTitle").innerText = issue.title

document.getElementById("modalDesc").innerText = issue.description

document.getElementById("modalAuthor").innerText = "Author: " + issue.author

document.getElementById("modalPriority").innerText = "Priority: " + issue.priority

document.getElementById("modalDate").innerText = issue.createdAt

}



function closeModal(){

document.getElementById("modal").classList.add("hidden")

}



function searchIssue(){

const text = document.getElementById("searchInput").value

fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)

.then(res => res.json())

.then(data => {

displayIssues(data.data)

})

}



loadIssues("all")