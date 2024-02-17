document.getElementById('taxButton').addEventListener('click', function() {
    if (this.innerText === 'إضافة ضرائب') {
      this.innerText = 'إزالة الضرائب';
      document.getElementById('inputGroup').style.display = 'block';
    } else {
      this.innerText = 'إضافة ضرائب';
      document.getElementById('inputGroup').style.display = 'none';
    }
  });



  document.getElementById('showInputCheckbox').addEventListener('change', function() {
    if (this.checked) {
      document.getElementById('inputGroup2').style.display = 'block';
    } else {
      document.getElementById('inputGroup2').style.display = 'none';
    }
  });








// Add event listener to the checkbox
document.getElementById('secondcheck').addEventListener('change', function() {
  var table = document.getElementById('table1');
  if (this.checked) {
      table.style.display = 'table'; 
  } else {
      table.style.display = 'none'; 
  }
});


document.addEventListener('DOMContentLoaded', function() {
  var checkbox = document.getElementById('secondcheck');
  var table = document.getElementById('table1');

  // Hide the table by default
  table.style.display = 'none';


  checkbox.addEventListener('change', function() {
      if (this.checked) {
          table.style.display = 'table';
      } else {
          table.style.display = 'none';
      }
  });
});




















  var rowIndex = 1;

  document.addEventListener("DOMContentLoaded", function () {
      addRow();
  });
  
  function addRow() {
      rowIndex++;
      var table = document.getElementById("costCenterTable");
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
  
      var selectId = "costCenter" + rowIndex;
      var percentageId = "percentage" + rowIndex;
      var amountId = "amount" + rowIndex;
  
      cell1.innerHTML = `<select class="form-control" id="${selectId}">
                                  <option value="قاهرة">قاهرة</option>
                                  <option value="مركز تكلفة الرياض">مركز تكلفة الرياض</option>
                                </select>`;
      cell2.innerHTML = `<input type="number" class="form-control" id="${percentageId}" disabled />`;
      cell3.innerHTML = `<input type="number" class="form-control" id="${amountId}" oninput="calculatePercentage(this)" />`;
      cell4.innerHTML = `<button class="btn btn-danger" onclick="removeRow(this)">X</button>`;
  
      calculateIndividualPercentage(document.getElementById(amountId)); // Calculate individual percentage for the new row
  }
  
  function removeRow(button) {
      var row = button.parentNode.parentNode;
      row.parentNode.removeChild(row);
      calculateTotal();
  }
  
  function calculateTotal() {
      var table = document.getElementById("costCenterTable");
      var rows = table.getElementsByTagName("tr");
      var totalAmount = 0;
  
      for (var i = 0; i < rows.length - 1; i++) {
          var amountInput = rows[i].querySelector("input[id^='amount']");
  
          if (amountInput) {
              totalAmount += parseFloat(amountInput.value) || 0;
          }
      }
  
      var baseAmount = parseFloat(document.getElementById("Amount1").value) || 0;
      var totalPercentage = baseAmount !== 0 ? (totalAmount / baseAmount) * 100 : 0;
  
      document.getElementById("totalAmount").innerText = totalAmount.toFixed(2);
      document.getElementById("totalPercentage").innerText = totalPercentage.toFixed(2);
  }
  
  function calculatePercentage(input) {
      var rowIndex = input.id.replace("amount", "");
      var percentageInput = document.getElementById("percentage" + rowIndex);
  
      var amount = parseFloat(input.value) || 0;
      var baseAmount = parseFloat(document.getElementById("Amount1").value) || 0;
  
      var percentage = baseAmount !== 0 ? (amount / baseAmount) * 100 : 0;
  
      percentageInput.value = percentage.toFixed(2);
  
      calculateTotal();
  }
  
  function calculateIndividualPercentage(input) {
      var rowIndex = input.id.replace("amount", "");
      var percentageInput = document.getElementById("percentage" + rowIndex);
  
      var amount = parseFloat(input.value) || 0;
      var baseAmount = parseFloat(document.getElementById("Amount1").value) || 0;
  
      var percentage = baseAmount !== 0 ? (amount / baseAmount) * 100 : 0;
  
      percentageInput.value = percentage.toFixed(2);
  
      calculateTotal();
  }
  









  document.addEventListener("DOMContentLoaded", function () {
    // Add event listener to taxType select element
    var taxTypeSelect = document.getElementById("taxType");
    taxTypeSelect.addEventListener("change", updateTaxAmount);

    // Add event listener to taxButton for showing/hiding tax input
    var taxButton = document.getElementById("taxButton");
    taxButton.addEventListener("click", toggleTaxInput);
});

function updateTaxAmount() {
    var taxTypeSelect = document.getElementById("taxType");
    var taxAmountInput = document.getElementById("taxAmount");
    var amountInput = document.getElementById("Amount1");

    // Get the selected option value
    var selectedValue = taxTypeSelect.value;

    // Calculate tax amount based on the selected option
    if (selectedValue === "2") {
        // Calculate 14% of Amount1
        var amount1Value = parseFloat(amountInput.value) || 0;
        var taxAmount = (amount1Value * 0.14).toFixed(2);

        // Update taxAmount input and Amount1 input
        taxAmountInput.value = taxAmount;
        amountInput.value = (amount1Value + parseFloat(taxAmount)).toFixed(2);
    } else {
        // If another option is selected, reset taxAmount input
        taxAmountInput.value = "";
    }
}





































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

