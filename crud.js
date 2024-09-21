const userForm = document.getElementById("userForm");
const userTable = document
  .getElementById("userTable")
  .getElementsByTagName("tbody")[0];
const deleteAllButton = document.getElementById("deleteAll");
const filterInput = document.getElementById("filterInput");

userForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const number = document.getElementById("number").value;

  if (!userForm.checkValidity()) {
    return;
  }

  let emailDuplicate = false;
  let numberDuplicate = false;

  Array.from(userTable.rows).forEach((row) => {
    if (row.cells[1].innerText === email) {
      emailDuplicate = true;
    }
    if (row.cells[2].innerText === number) {
      numberDuplicate = true;
    }
  });

  if (emailDuplicate && numberDuplicate) {
    alert("Error: Email and Number already exist!");
    return;
  } else if (emailDuplicate) {
    alert("Error: Email already exists!");
    return;
  } else if (numberDuplicate) {
    alert("Error: Number already exists!");
    return;
  }

  const newRow = userTable.insertRow();
  newRow.insertCell(0).innerText = fname;
  newRow.insertCell(1).innerText = lname;
  newRow.insertCell(2).innerText = email;
  newRow.insertCell(3).innerText = number;

  const actionCell = newRow.insertCell(3);
  const modifyButton = document.createElement("button");
  modifyButton.innerText = "Modify";
  modifyButton.className = "modify";
  modifyButton.onclick = function () {
    document.getElementById("fname").value = fname;
    document.getElementById("lname").value = lname;
    document.getElementById("email").value = email;
    document.getElementById("number").value = number;
    userTable.deleteRow(newRow.rowIndex - 1);
  };

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  deleteButton.onclick = function () {
    const confirmDelete = confirm(
      "Are you sure you want to delete this entry?"
    );
    if (confirmDelete) {
      userTable.deleteRow(newRow.rowIndex - 1);
    }
  };

  const actionContainer = document.createElement("div");
  actionContainer.className = "action-buttons";
  actionContainer.appendChild(modifyButton);
  actionContainer.appendChild(deleteButton);
  actionCell.appendChild(actionContainer);

  userForm.reset();
});

deleteAllButton.addEventListener("click", () => {
  const confirmDelete = confirm("Are you sure you want to delete all entries?");
  if (confirmDelete) {
    userTable.innerHTML = "";
  }
});

// filterInput.addEventListener('input', () => {
//     const filterValue = filterInput.value.toLowerCase();
//     Array.from(userTable.rows).forEach(row => {
//         const nameCell = row.cells[0].innerText.toLowerCase();
//         const emailCell = row.cells[1].innerText.toLowerCase();
//         const numberCell = row.cells[2].innerText.toLowerCase();

//         if (nameCell.includes(filterValue) || emailCell.includes(filterValue) || numberCell.includes(filterValue)) {
//             row.style.display = '';
//         } else {
//             row.style.display = 'none';
//         }
//     });
// });
