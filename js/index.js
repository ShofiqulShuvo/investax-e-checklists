// funtion for step
let currentStep = 1;
    const totalSteps = document.querySelectorAll('.step').length;
    const nextBtn = document.getElementById('nextBtn');

    showStep(currentStep);

    function showStep(step) {
        const steps = document.querySelectorAll('.step');

        if(steps.length > 0) {
            
            for (let i = 0; i < steps.length; i++) {
                steps[i].style.display = 'none';
            }
    
            steps[step - 1].style.display = 'block';
    
            if (step === totalSteps) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'block';
            } else {
                nextBtn.style.display = 'block';
                submitBtn.style.display = 'none';
            }
    
            // Disable previous button on the first step
            prevBtn.disabled = step === 1;

        }
    }

    function nextStep() {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    }

    // function for step end



// for otp page
const inputs = document.querySelectorAll(".otp-field > input");
const otpSubmitButton = document.querySelector("#otp-submit");

// Check if inputs and Button elements exist
if (inputs.length > 0 && otpSubmitButton) {
  window.addEventListener("load", () => inputs[0].focus());
  otpSubmitButton.setAttribute("disabled", "disabled");

  inputs[0].addEventListener("paste", function (event) {
    event.preventDefault();

    const pastedValue = (event.clipboardData || window.clipboardData).getData(
      "text"
    );
    const otpLength = inputs.length;

    for (let i = 0; i < otpLength; i++) {
      if (i < pastedValue.length) {
        inputs[i].value = pastedValue[i];
        inputs[i].removeAttribute("disabled");
        inputs[i].focus;
      } else {
        inputs[i].value = ""; // Clear any remaining inputs
        inputs[i].focus;
      }
    }
  });

  inputs.forEach((input, index1) => {
    input.addEventListener("keyup", (e) => {
      const currentInput = input;
      const nextInput = input.nextElementSibling;
      const prevInput = input.previousElementSibling;

      if (currentInput.value.length > 1) {
        currentInput.value = "";
        return;
      }

      if (
        nextInput &&
        nextInput.hasAttribute("disabled") &&
        currentInput.value !== ""
      ) {
        nextInput.removeAttribute("disabled");
        nextInput.focus();
      }

      if (e.key === "Backspace") {
        inputs.forEach((input, index2) => {
          if (index1 <= index2 && prevInput) {
            input.setAttribute("disabled", true);
            input.value = "";
            prevInput.focus();
          }
        });
      }

      otpSubmitButton.classList.remove("active");
      otpSubmitButton.setAttribute("disabled", "disabled");

      const inputsNo = inputs.length;
      if (!inputs[inputsNo - 1].disabled && inputs[inputsNo - 1].value !== "") {
        otpSubmitButton.classList.add("active");
        otpSubmitButton.removeAttribute("disabled");

        return;
      }
    });
  });
} 


// otp page end


// add children name and date of birth start
let addChildrenInputIndex = 0;
document.getElementById('add-children').addEventListener('click', function() {
  let fieldGroupWrapper = document.createElement('div');
  let nameFieldWrapper = document.createElement('div');
  let birthDateFieldWrapper = document.createElement('div');
  let nameInput = document.createElement('input');
  let birthDateInput = document.createElement('input');

  // for creating input name attribute
  addChildrenInputIndex++;

  // adding classname
  fieldGroupWrapper.classList.add('mb-2', 'row');
  nameFieldWrapper.classList.add('col-12', 'col-md-6');
  birthDateFieldWrapper.classList.add('col-12', 'col-md-6');
  nameInput.classList.add('form-control');
  birthDateInput.classList.add('form-control');
  // adding classname end

  // adding type to input and placeholder
  nameInput.type = "text";
  nameInput.placeholder = "Children Name";
  nameInput.name = `childrenName[${addChildrenInputIndex}]`;
  birthDateInput.type = "date";
  birthDateInput.name = `childrenDob[${addChildrenInputIndex}]`;
  // adding type to input and placeholder end

  // appending inputs to wrappers
  nameFieldWrapper.appendChild(nameInput);
  birthDateFieldWrapper.appendChild(birthDateInput);

  // appending wrappers to the field group
  fieldGroupWrapper.appendChild(nameFieldWrapper);
  fieldGroupWrapper.appendChild(birthDateFieldWrapper);

  // appending the field group to the main container
  document.getElementById('childrenInput').appendChild(fieldGroupWrapper);
});
// add children name and date of birth start



// interest receiverd 
// Initialize index for additional rows
let interestReceivedRowIndex = 0;
document.getElementById('add-interest-row').addEventListener('click', function() {
  let tableBody = document.getElementById('interestReceivedTableBody');

  // Increment the row index
  interestReceivedRowIndex++;

  // Create a new row
  let newRow = document.createElement('tr');

  // Define the cells with input elements
  let bankNameCell = document.createElement('td');
  let accountNumberCell = document.createElement('td');
  let totalInterestCell = document.createElement('td');
  let tfnWithholdingCell = document.createElement('td');
  let jointAccountCell = document.createElement('td');

  // Create input elements for each cell
  let bankNameInput = document.createElement('input');
  let accountNumberInput = document.createElement('input');
  let totalInterestInput = document.createElement('input');
  let tfnWithholdingInput = document.createElement('input');
  let jointAccountInput = document.createElement('input');
  let jointAccountLabel = document.createElement('label');

  // Set attributes for each input element
  bankNameInput.type = "text";
  bankNameInput.className = "form-control";
  bankNameInput.name = `bankName[${interestReceivedRowIndex}]`;

  accountNumberInput.type = "text";
  accountNumberInput.className = "form-control";
  accountNumberInput.name = `accountNumber[${interestReceivedRowIndex}]`;

  totalInterestInput.type = "text";
  totalInterestInput.className = "form-control";
  totalInterestInput.name = `totalInterest[${interestReceivedRowIndex}]`;

  tfnWithholdingInput.type = "text";
  tfnWithholdingInput.className = "form-control";
  tfnWithholdingInput.name = `tfnWithholding[${interestReceivedRowIndex}]`;

  jointAccountInput.type = "checkbox";
  jointAccountInput.className = "form-check-input";
  jointAccountInput.name = `jointAccount[${interestReceivedRowIndex}]`;
  jointAccountInput.id = `jointAccount[${interestReceivedRowIndex}]`;

  jointAccountLabel.setAttribute('for', jointAccountInput.id);
  jointAccountLabel.innerText = "Yes"

  // Create a flex container for the checkbox and label
  let flexContainer = document.createElement('div');
  flexContainer.className = "d-flex justify-content-center align-items-center gap-1";
  flexContainer.appendChild(jointAccountInput);
  flexContainer.appendChild(jointAccountLabel);

  // Append inputs to their respective cells
  bankNameCell.appendChild(bankNameInput);
  accountNumberCell.appendChild(accountNumberInput);
  totalInterestCell.appendChild(totalInterestInput);
  tfnWithholdingCell.appendChild(tfnWithholdingInput);
  jointAccountCell.appendChild(flexContainer);

  // Append cells to the new row
  newRow.appendChild(bankNameCell);
  newRow.appendChild(accountNumberCell);
  newRow.appendChild(totalInterestCell);
  newRow.appendChild(tfnWithholdingCell);
  newRow.appendChild(jointAccountCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);
});

// interest receiverd end


// dividents 
// Initialize index for additional rows
let dividendsRowIndex = 0;
document.getElementById('add-dividend-row').addEventListener('click', function() {
  let tableBody = document.getElementById('dividendsTableBody');

  // Increment the row index
  dividendsRowIndex++;

  // Create a new row
  let newRow = document.createElement('tr');

  // Define the cells with input elements
  let shareNameCell = document.createElement('td');
  let sharesNumberCell = document.createElement('td');
  let shareAmountCell = document.createElement('td');

  // Create input elements for each cell
  let shareNameInput = document.createElement('input');
  let sharesNumberInput = document.createElement('input');
  let shareAmountInput = document.createElement('input');

  // Set attributes for each input element
  shareNameInput.type = "text";
  shareNameInput.className = "form-control";
  shareNameInput.name = `sharesName[${dividendsRowIndex}]`;

  sharesNumberInput.type = "text";
  sharesNumberInput.className = "form-control";
  sharesNumberInput.name = `sharesNumber[${dividendsRowIndex}]`;

  shareAmountInput.type = "text";
  shareAmountInput.className = "form-control";
  shareAmountInput.name = `shareAmount[${dividendsRowIndex}]`;

  // Append inputs to their respective cells
  shareNameCell.appendChild(shareNameInput);
  sharesNumberCell.appendChild(sharesNumberInput);
  shareAmountCell.appendChild(shareAmountInput);

  // Append cells to the new row
  newRow.appendChild(shareNameCell);
  newRow.appendChild(sharesNumberCell);
  newRow.appendChild(shareAmountCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);
});

// dividents end