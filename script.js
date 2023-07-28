//Declaring the array globally so it is easier to modify
let tableScores = [];
let index = 0;

// Declaring values for passers
// Decided to filter the passers into 2
// In case I need to filter the passers into 2
let sciencePasser = 0;
let humanPasser = 0;

function createTable() {
  //get the number of examinees. 
  let numRowsInput = document.getElementById("numRows");
  //made numRowsInput as a number type and declared it as a variable as numRows
  let numRows = parseInt(numRowsInput.value);

  // validating the input to make sure the user has input a value
  if (isNaN(numRows) || numRows <= 0 || numRows > 1000) {
    alert("Please enter a valid number of rows (between 1 and 1000).");
    return;
  }

  // clearing tables that are currently existing on the page
  let tableContainer = document.getElementById("tableContainer");
  tableContainer.innerHTML = "";
  sciencePasser = 0;
  humanPasser = 0;

  //creating table element
  let table = document.createElement("table");

  //create header rows for readability of the user
  let thead = document.createElement("thead");
  let headerRow = document.createElement("tr");

  let columnHeaders = [
    "Section",
    "English",
    "Math",
    "Science",
    "Japanese",
    "Geography",
    "Science Subjects",
    "Humanities Subjects",
    "All Subjects",
    "Results"
  ];

  for (let i = 0; i < columnHeaders.length; i++) {
    let th = document.createElement("th");
    th.textContent = columnHeaders[i];
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body rows
  let tbody = document.createElement("tbody");

  // Used nested for loop to print the body row
  for (let row = 0; row < numRows; row++) {
    // first layer of the loop, I want to create 1 row
    let tr = document.createElement("tr");
    // Every turn of the first layer, this for loop will create 6 data and (6 input elements) for every 1 row, this are the division and the subjects
    for (let col = 0; col < columnHeaders.length - 4; col++) {
      let td = document.createElement("td");
      let input = document.createElement("input");
      // Filtering the input types, for elements under the section header, it must be text. For the subjects, it must be number
      if (col === 0) {
        input.type = "text";
        input.id = "division";
      } else {
        input.type = "number";
        input.id = "subjects";
      }
      // this code will put the data and input elements on HTML doc
      td.appendChild(input);
      tr.appendChild(td);
    }
    // this code will add readonly elements starting from science subjects
    tbody.appendChild(tr);
    for (let col = 7; col <= columnHeaders.length; col++) {
      let td = document.createElement("td");
      let input = document.createElement("input");
      input.type = "number";
      input.readOnly = true;
      input.id = "newCells";
      td.appendChild(input);
      tr.appendChild(td);
    }
  }

  table.appendChild(tbody);

  tableContainer.appendChild(table);

  // I decided to make the input value for section/division input elements to be limited to 1 character, it is either 's' or 'l'.
  let divisionInputs = document.querySelectorAll('input[id="division"]');
  divisionInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      if (input.value.length > 1) {
        input.value = input.value.substring(0, 1);
      }
    });
  });

  // Limited the input value for subjects into 3 digits
  let subjectInputs = document.querySelectorAll('input[id="subjects"]');
  subjectInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      if (input.value.length > 3) {
        input.value = input.value.substring(0, 3);
      }
    });
  });

  //Adding specialized buttons as part of the creation of the table so it won't be displayed without creating table
  //specialized buttons includes reset, generate, calculate and category
  createSpecializedButtons();

  //clear passers on HTML output when creating new table
  let passers = document.getElementById("passers");
  if (passers){
    passers.remove();
  }
  
}
function submitTable() {
  // Get values from the user upon submitting
  let tableRows = document.querySelectorAll("#tableContainer table tbody tr");
  let tempTableScores = [];
  let isInvalidInput = false;

  //For each method to input the values into the array, making an array of objects
  tableRows.forEach((row) => {
    let inputElements = row.querySelectorAll("input");

    let division = inputElements[0].value.trim().toLowerCase();
    let eng = parseInt(inputElements[1].value);
    let math = parseInt(inputElements[2].value);
    let sci = parseInt(inputElements[3].value);
    let jap = parseInt(inputElements[4].value);
    let geoHis = parseInt(inputElements[5].value);

    // Validate the input, make sure that it is filled with correct values.
    // isNaN(subject) is to check whether the user didn't fill out the input elements
    // > 100 to check if the user is inputting the right values, not more than 100
    // filtered for l and s only for division
    if (
      isNaN(eng) ||
      isNaN(math) ||
      isNaN(sci) ||
      isNaN(jap) ||
      isNaN(geoHis) ||
      eng > 100 ||
      math > 100 ||
      sci > 100 ||
      jap > 100 ||
      geoHis > 100 || eng < 0 || math < 0 || sci < 0 || jap < 0 || geoHis < 0 ||
      (division !== "s" && division !== "l")
    ) {
      isInvalidInput = true;
      return; 
    }

    // Create a new object for each row and add it to the temporary array
    let rowData = {
      division: division,
      subjects: {
        eng: eng,
        math: math,
        sci: sci,
        jap: jap,
        geoHis: geoHis,
      },
    };
    // Create object to the new array
    tempTableScores.push(rowData);
  });

  // If there's no invalid input, update the tableScores array
  tableScores = tempTableScores;
  index = 0;
  sciencePasser = 0;
  humanPasser = 0;
  //if statement to stop calculation that puts 0 passers on HTML if there are no values on the input elements
  if (isInvalidInput) {
    alert(
      `Please double check the values before calculating passers.   IMPORTANT: Put 's' or 'l' under section and less than or equal to 100 under subjects`
    );
    return;
  }
  //if there's no issues, call calculate function and print the results
  if (!isInvalidInput) {
    calculateResults();
    printPasser(totalPassers);
  }
  //array check for checking
  console.log(tableScores);
  console.log(tableRows);
}

function calculateResults() {
  let tableRows = document.querySelectorAll("#tableContainer table tbody tr");

  tableRows.forEach((currentRow, index) => {
    let row = tableScores[index];
    let division = row.division;
    let subjects = row.subjects;

    let resultSci = subjects.math + subjects.sci;
    let resultHum = subjects.geoHis + subjects.jap;
    
    //created variable for new categories' total
    let categoryTotal = 0; 

    //calculate the sum of the new category subjects
    let categoryInputs = currentRow.querySelectorAll('.newSubject');
    categoryInputs.forEach((input) => {
      if (!isNaN(parseInt(input.value))) {
        categoryTotal += parseInt(input.value);
      }
    });

    //completing the total with adding subject english
    let total = resultSci + resultHum + categoryTotal + subjects.eng;

    //filtering the passers of human
    if (division === "l" && total >= 350 && resultHum >= 160) {
      humanPasser++;

      //10th column
      createPassFailElement(currentRow, "PASS", "green"); 
      //filtering the passers of science
    } else if (division === "s" && total >= 350 && resultSci >= 160) {
      sciencePasser++;
      
      //10th column
      createPassFailElement(currentRow, "PASS", "green");
    }
    else{
      //10th column
      createPassFailElement(currentRow, "FAIL", "darkred");
    }
    //7 8 and 9th column
    currentRow.children[6].textContent = resultSci; 
    currentRow.children[7].textContent = resultHum; 
    currentRow.children[8].textContent = total; 
  });

  totalPassers = humanPasser + sciencePasser;
}

function createPassFailElement(currentRow, statusText, bgColor) {
  let pElement = document.createElement("p");
  pElement.textContent = statusText;
  pElement.style.backgroundColor = bgColor;
  pElement.id = 'result';
  //clearing existing content
  currentRow.children[9].innerHTML = ""; 
  currentRow.children[9].appendChild(pElement);
}

function createSpecializedButtons() {

  //creating div for the buttons
  let buttonsDiv = document.getElementById("specializedButtons");
  
  //deleting existing buttons when creating new table to prevent multiple button regeneration
  let existingReset = document.getElementById("resetBtn");
  if (existingReset) {
    existingReset.remove(); 
  }

  let existingGen = document.getElementById("genBtn");
  if (existingGen) {
    existingGen.remove(); 
  }

  let existingSubmit = document.getElementById("submitBtn");
  if (existingSubmit) {
    existingSubmit.remove(); 
  }

  let existingCategory = document.getElementById("addCategoryBtn");
  if (existingCategory) {
    existingCategory.remove(); 
  }

  //submit button
  let submit = document.createElement("button");
  submit.innerText = "Calculate Passers";
  submit.onclick = submitTable;
  submit.id = "submitBtn";

  //reset button
  let resetButton = document.createElement("button");
  resetButton.innerText = "Reset Data";
  resetButton.id = "resetBtn"
  resetButton.onclick = resetData;

  //random button, this is mainly for checking
  let genButton = document.createElement("button");
  genButton.innerText = "Generate Random Scores";
  genButton.id = "genBtn";
  genButton.onclick = generateRandomData;

  //add category button
  let addCategoryButton = document.createElement('button');
  addCategoryButton.innerText = 'Add Category';
  addCategoryButton.id = ('addCategoryBtn');
  addCategoryButton.onclick = addCategory;

  //adding the buttons to the div
  buttonsDiv.appendChild(resetButton);
  buttonsDiv.appendChild(genButton);
  buttonsDiv.appendChild(submit);
  buttonsDiv.appendChild(addCategoryButton);

  //add the div to the dom
  document.body.appendChild(buttonsDiv);
}

function resetData() {
  //clear the main input elements (Section and subjects)
  let inputElements = document.querySelectorAll("#tableContainer table input");
  inputElements.forEach((input) => {
    input.value = "";
  });

  //clear the values of the additional categories
  let categoryInputs = document.querySelectorAll('.newSubject');
  categoryInputs.forEach((input) => {
    input.value = "";
  });

  //clear the values in the 7th, 8th, and 9th columns
  let tableRows = document.querySelectorAll("#tableContainer table tbody tr");
  tableRows.forEach((currentRow) => {
    currentRow.children[6].textContent = "";
    currentRow.children[7].textContent = "";
    currentRow.children[8].textContent = "";
    currentRow.children[9].innerHTML = ""; // Clear the pass/fail status <p> element
  });

  // reset the passers count
  humanPasser = 0;
  sciencePasser = 0;
  totalPassers = 0;

  //clear passers on HTML output
  let passers = document.getElementById("passers");
  passers.remove();
}

function generateRandomData() {
  let tableRows = document.querySelectorAll("#tableContainer table tbody tr");
  tableRows.forEach((row) => {
    let inputElements = row.querySelectorAll("input");
    if (inputElements[0]) {
      //randomly selecting values for division
      inputElements[0].value = Math.random() < 0.5 ? "s" : "l";
    }

    //random scores for the main subjects, not including additional test categories
    for (let i = 1; i <= 5; i++) {
      if (inputElements[i]) {
        inputElements[i].value = Math.round(Math.random() * 100);
      }
    }
  });

}

function printPasser(totalPassers) {
  //check if the passers display already exists, if so, remove
  let existingPassersDisplay = document.getElementById("passers");
  if (existingPassersDisplay) {
    existingPassersDisplay.remove(); 
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();

 //print passers
  const showPasser = document.createElement("p");
  showPasser.innerText = `TOTAL PASSERS: ${totalPassers}
    Please create a new table for a new calculation or edit the values to re-calculate
    Calculated at date and time: ${formattedDate}`;
  showPasser.id = "passers";
  document.body.appendChild(showPasser);
}

function addCategory() {
  // prompt message 
  let categoryName = prompt('Please enter a category name');

  // do nothing if the user cancels
  if (categoryName === null || categoryName.trim() === '') {
    return;
  }

  //added function check if there's an exsting name, if valid again, then create
  if (categoryNameSearch(categoryName)) {
    alert('Category name already exists or is invalid. Please enter a different name');
  } else {
    addColumnToTable(categoryName);
  }
}

function categoryNameSearch(name) {
  // Get values from the first row, return true if there is a match
  let firstRow = document.querySelector('#tableContainer table tr');
  let categories = firstRow.querySelectorAll('th');
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].textContent === name) {
      return true;
    }
  }
  return false;
}

function addColumnToTable(name) {
  let tableRows = document.querySelectorAll('#tableContainer table tr');
  tableRows.forEach((row, index) => {
    let newCell = document.createElement(index === 0 ? 'th' : 'td');
    if (index !== 0) {
      let input = document.createElement('input');
      input.type = 'number';
      input.classList.add('newSubject');
      input.id = `${name.toLowerCase().replace(/\s/g, '')}${index}`;
      input.addEventListener('input', function () {
        if (input.value.length > 3) {
          input.value = input.value.substring(0, 3);
        }
      });
      newCell.appendChild(input);
    } else {
      newCell.textContent = name;
    }
    row.appendChild(newCell);
  });
  calculateResults();
}

