"use strict";
const taskList = document.querySelector(".taskList");
const taskForm = document.querySelector(".taskForm");
const taskInput = document.querySelector(".newTaskInput");
const descriptionInput = document.querySelector(".newDescriptionInput");
const tasks = loadTasks();
tasks.map((task) => createTask(task));
taskForm === null || taskForm === void 0 ? void 0 : taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (descriptionInput === null ||
        taskInput === null ||
        (descriptionInput === null || descriptionInput === void 0 ? void 0 : descriptionInput.value) === undefined ||
        (descriptionInput === null || descriptionInput === void 0 ? void 0 : descriptionInput.value) === "" ||
        (taskInput === null || taskInput === void 0 ? void 0 : taskInput.value) === undefined ||
        (taskInput === null || taskInput === void 0 ? void 0 : taskInput.value) === "") {
        return;
    }
    const newTask = {
        id: Math.random().toString(),
        task: taskInput === null || taskInput === void 0 ? void 0 : taskInput.value,
        description: descriptionInput === null || descriptionInput === void 0 ? void 0 : descriptionInput.value,
        isCompleted: false,
        createdAt: new Date(),
    };
    tasks.push(newTask);
    saveTasks();
    createTask(newTask);
    taskInput.value = "";
    descriptionInput.value = "";
});
function createTask(task) {
    const item = document.createElement("li");
    const title = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.isCompleted;
    checkbox.addEventListener("change", () => {
        task.isCompleted = checkbox.checked;
        title.classList.toggle("checked");
        saveTasks();
    });
    title.append(checkbox, task.task);
    const description = document.createElement("p");
    description.textContent = task.description;
    item.append(title, description);
    taskList === null || taskList === void 0 ? void 0 : taskList.append(item);
}
function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function loadTasks() {
    const tasksJSON = localStorage.getItem("TASKS");
    if (tasksJSON === null) {
        return [];
    }
    return JSON.parse(tasksJSON);
}

function closeModalHandler() {
    const editModal = document.getElementById('editModal');
    editModal.style.display = "none";
  }
  

const tableData = [
  ["Name", "Age", "City"],
  ["Alice", 30, "New York"],
  ["Bob", 25, "Los Angeles"],
];


  // 1. Create the table element
  const table = document.createElement('table');
	table.classList.add('table-class')
  // 2. Create table header row
  const headerRow = document.createElement('tr');

  // Loop through data header (assuming first element is the header)
  for (const header of tableData[0]) {
    const headerCell = document.createElement('th');
    headerCell.textContent = header;
    headerRow.appendChild(headerCell);
  }

  // Add the header row to the table
  table.appendChild(headerRow);

  // 3. Loop through data rows (excluding the header row)
  for (let i = 1; i < tableData.length; i++) {
    const row = document.createElement('tr');

    for (const cellData of tableData[i]) {
      const cell = document.createElement('td');
      cell.textContent = cellData;
      row.appendChild(cell);
    }

	 // Add edit button cell
    const editCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      const editModal = document.getElementById('editModal');
      const editForm = document.getElementById('editForm');

      // Clear existing form content
      editForm.innerHTML = "";

      // Get the data for the clicked row
      const rowIndex = i; // Store row index for update
      const rowData = tableData[i];

      // Create form fields based on data (assuming data is an array of objects)
      for (const key in rowData) {
        const label = document.createElement('label');
        label.textContent = key;
        editForm.appendChild(label);

        const input = document.createElement('input');
        input.type = 'text'; // Adjust input type as needed
        input.value = rowData[key];
        editForm.appendChild(input);
      }

      // Add submit button
      const submitButton = document.createElement('button');
      submitButton.type = 'submit';
      submitButton.textContent = 'Save Changes';
      editForm.appendChild(submitButton);

      // Form submission logic
      editForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get updated data from form fields
        const updatedData = {};
        for (const element of editForm.elements) {
          if (element.tagName === 'INPUT') {
            updatedData[element.name] = element.value;
          }
        }

        // Update data in the data array (assuming data is modifiable)
        tableData[rowIndex] = { ...tableData[rowIndex], ...updatedData };

        // Update table cell content based on updated data
        const tableRow = row.parentNode; // Get parent row element
        for (let j = 0; j < tableRow.children.length - 1; j++) { // Exclude edit button cell
          tableRow.children[j].textContent = tableData[rowIndex][Object.keys(tableData[rowIndex])[j]];
        }

        // Close the edit modal
        editModal.style.display = 'none';
      });

      // Open the edit modal
      editModal.style.display = 'block';

       // Close modal functionality (using close button or clicking outside)
      const closeModal = document.getElementsByClassName('close-modal')[0];

      // Remove any previously attached event listeners (prevents conflicts)
      closeModal.removeEventListener('click', closeModalHandler);

     // const closeModalHandler = function() {
     //   editModal.style.display = "none";
     // }

      closeModal.addEventListener('click', closeModalHandler);


    });
    editCell.appendChild(editButton);
    row.appendChild(editCell);


	
	
    table.appendChild(row);
  }

  // 4. Get the table container element from HTML
  const tableContainer = document.getElementById('table-container');

  // 5. Append the table to the container element
  tableContainer.appendChild(table);
  
  
  const url = 'http://httpbin.org/get'; // Replace with your actual URL


const xhr = new XMLHttpRequest();
xhr.open('GET', url); // Specify method (GET, POST, etc.)

xhr.onload = function() {
  if (xhr.status === 200) {
    try {
      const data = JSON.parse(xhr.responseText);
      console.log(data); // Log the parsed data for debugging

      const userList = document.getElementById('user-data');

      // Create list items for each property
      for (const key in data) {
        const listItem = document.createElement('li');
        listItem.textContent = `${key}: ${data[key]}`;
        userList.appendChild(listItem);
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  } else {
    console.error('Error:', xhr.statusText);
  }
};

xhr.send();