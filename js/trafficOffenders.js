let tableBody = document.getElementById("table-body");
let searchInput = document.getElementById("search");

// Retrieve data from local storage
let offenders = JSON.parse(localStorage.getItem("offenders")) || [];

// Display existing data in the table
offenders.forEach((offender) => {
  let tableRow = document.createElement("tr");
  let nameCell = document.createElement("td");
  nameCell.textContent = offender.name;
  let offenceCell = document.createElement("td");
  offenceCell.textContent = offender.offence;
  let actionCell = document.createElement("td");
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => deleteOffender(offender.name);
  actionCell.appendChild(deleteButton);
  tableRow.appendChild(nameCell);
  tableRow.appendChild(offenceCell);
  tableRow.appendChild(actionCell);
  tableBody.appendChild(tableRow);
});

function saveOffender() {
  let nameInput = document.getElementById("name");
  let offenceInput = document.getElementById("offence");
  let name = nameInput.value;
  let offence = offenceInput.value;
  nameInput.value = "";
  offenceInput.value = "";

  let offender = { name, offence };
  offenders.push(offender);
  localStorage.setItem("offenders", JSON.stringify(offenders));

  let tableRow = document.createElement("tr");
  let nameCell = document.createElement("td");
  nameCell.textContent = name;
  let offenceCell = document.createElement("td");
  offenceCell.textContent = offence;
  let actionCell = document.createElement("td");
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => deleteOffender(name);
  actionCell.appendChild(deleteButton);
  tableRow.appendChild(nameCell);
  tableRow.appendChild(offenceCell);
  tableRow.appendChild(actionCell);
  tableBody.appendChild(tableRow);
}

function searchOffender() {
  let searchValue = searchInput.value.toLowerCase();
  let tableRows = tableBody.getElementsByTagName("tr");

  for (let i = 0; i < tableRows.length; i++) {
    let nameCell = tableRows[i].getElementsByTagName("td")[0];
    if (nameCell.textContent.toLowerCase().includes(searchValue)) {
      tableRows[i].style.display = "";
    } else {
      tableRows[i].style.display = "none";
    }
  }
}

function deleteOffender(name) {
  offenders = offenders.filter((offender) => offender.name !== name);
  localStorage.setItem("offenders", JSON.stringify(offenders));
  let tableRows = tableBody.getElementsByTagName("tr");

  for (let i = 0; i < tableRows.length; i++) {
    let nameCell = tableRows[i].getElementsByTagName("td")[0];
    if (nameCell.textContent === name) {
      tableBody.removeChild(tableRows[i]);
      break;
    }
  }
}

