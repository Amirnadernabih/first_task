// Drop area start
const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const fileInfo = document.getElementById('file-info');
const fileName = document.getElementById('file-name');
const fileType = document.getElementById('file-type');
const fileSize = document.getElementById('file-size');

dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.classList.add('border-primary');
});

dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('border-primary');
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  dropArea.classList.remove('border-primary');
  const file = e.dataTransfer.files[0];
  handleFile(file);
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  handleFile(file);
});
// Drop area end

// Checkbox of متكرر start
document.getElementById('showInputCheckbox').addEventListener('change', function() {
  if (this.checked) {
    document.getElementById('inputGroup2').style.display = 'block';
  } else {
    document.getElementById('inputGroup2').style.display = 'none';
  }
});
// Checkbox of متكرر end

// Disable the "Amount2" input
document.getElementById("Amount2").disabled = true;











// Function to add a new row
function addRow() {
    var table = document.getElementById("table1").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length - 3); // Inserting before the last three rows (total, VAT, total)
  
    // Insert cells
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
  
    // Cell 1
    var selectInput = document.createElement("select");
    selectInput.className = "custom-select";
    selectInput.innerHTML = '    <option selected>آلي</option><option value="1">متعدد</option>'; // Add your options
    cell1.appendChild(selectInput);
  
    // Cell 2
    var textInput = document.createElement("input");
    textInput.type = "text";
    textInput.className = "form-control";
    cell2.appendChild(textInput);
  
    // Cell 3
    var numberInput = document.createElement("input");
    numberInput.type = "number";
    numberInput.className = "form-control";
    cell3.appendChild(numberInput);
  
    // Cell 4
    var selectInput4 = document.createElement("select");
    selectInput4.className = "custom-select";
    selectInput4.innerHTML = '<option value="1">-</option><option value="2">ضريبة القيمة المضافة</option>'; // Add your options
    cell4.appendChild(selectInput4);
  
    // Cell 5
    var selectInput5 = document.createElement("select");
    selectInput5.className = "custom-select";
    selectInput5.innerHTML = '<option value="1">القاهرة</option><option value="2">مركز تكلفة الرياض</option>'; // Add your options
    cell5.appendChild(selectInput5);
  

    updateTotalAmount();
    calculateAndUpdateTotalTax();
}

  
  // Function to update the total amount in each row
  function updateTotalAmount() {
    var table = document.getElementById("table1").getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
  
    // Update total amount for each row
    for (var i = 0; i < rows.length - 3; i++) { 
      var row = rows[i];
      var cells = row.getElementsByTagName('td');
      var numberInput = cells[2].getElementsByTagName('input')[0];
  
      // Add event listener to the number input
      numberInput.addEventListener('blur', function() {
        calculateAndUpdateTotal();
      });
    }
  }
  
















// Function to calculate and update the total amount
function calculateAndUpdateTotal() {
    var table = document.getElementById("table1").getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    var tottalCell = document.getElementById('tottal');

    var totalAmount = 0;

    // Calculate total amount for each row
    for (var i = 0; i < rows.length - 3; i++) { 
        var row = rows[i];
        var cells = row.getElementsByTagName('td');
        var amount = parseFloat(cells[2].getElementsByTagName('input')[0].value) || 0;
        totalAmount += amount;
    }

    
    tottalCell.textContent = totalAmount.toFixed(2);
    calculateAndUpdateFullTotal();
}

// Function to calculate and update the total tax
function calculateAndUpdateTotalTax() {
    var table = document.getElementById("table1").getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    var totalTaxCell = document.getElementById('totaltax');

   
    var totalTax = 0;

    // Calculate total tax for each row if the selected option is "ضريبة القيمة المضافة"
    for (var i = 0; i < rows.length - 3; i++) { 
        var row = rows[i];
        var cells = row.getElementsByTagName('td');
        var selectInput = cells[3].getElementsByTagName('select')[0];
        var amount = parseFloat(cells[2].getElementsByTagName('input')[0].value) || 0;

        // Check if the selected option is "ضريبة القيمة المضافة" (VAT)
        if (selectInput.value == "2") {
            totalTax += (amount * 0.14); 
        }
    }


    totalTaxCell.textContent = totalTax.toFixed(2);
    calculateAndUpdateFullTotal();
}







// Function to calculate and update the full total
function calculateAndUpdateFullTotal() {
    var tottalCell = document.getElementById('tottal');
    var totalTaxCell = document.getElementById('totaltax');
    var fullTotalCell = document.getElementById('fulltotal');
    var amount2Input = document.getElementById('Amount2');

    // Get the values from tottal and totaltax cells
    var tottalAmount = parseFloat(tottalCell.textContent) || 0;
    var totalTaxAmount = parseFloat(totalTaxCell.textContent) || 0;

    // Calculate the full total
    var fullTotal = tottalAmount + totalTaxAmount;

    // Display the full total in the fulltotal cell
    fullTotalCell.textContent = fullTotal.toFixed(2);

    // Update the value of the Amount2 input
    amount2Input.value = fullTotal.toFixed(2);
}
