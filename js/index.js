document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 1;
  const totalSteps = document.querySelectorAll(".step").length;
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const submitBtn = document.getElementById("submitBtn");

  function showStep(step) {
    const steps = document.querySelectorAll(".step");
    if (steps.length > 0 && step >= 1 && step <= steps.length) {
      steps.forEach((stepElement, index) => {
        stepElement.classList.toggle("active", index === step - 1);
      });

      if (step === totalSteps) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "block";
      } else {
        nextBtn.style.display = "block";
        submitBtn.style.display = "none";
      }

      prevBtn.disabled = step === 1;
    }
  }

  function nextStep() {
    if (validateStep(currentStep)) {
      currentStep++;
      showStep(currentStep);
    }
  }

  function validateStep(step) {
    const currentStepFields = document.querySelectorAll(
      `.step:nth-child(${step}) input[required]`
    );
    let isValid = true;
    currentStepFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        const errorMessage = document.createElement("div");
        errorMessage.className = "text-danger";
        errorMessage.textContent = "Please fill out this field.";
        const existingErrorMessage =
          field.parentElement.querySelector(".text-danger");
        if (!existingErrorMessage) {
          field.parentElement.appendChild(errorMessage);
        }
      } else {
        const existingErrorMessage =
          field.parentElement.querySelector(".text-danger");
        if (existingErrorMessage) {
          existingErrorMessage.remove();
        }
      }
    });
    return isValid;
  }

  function prevStep() {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
  }

  nextBtn.addEventListener("click", nextStep);
  prevBtn.addEventListener("click", prevStep);

  showStep(currentStep);
});

// for otp modal
document?.addEventListener("DOMContentLoaded", (event) => {
  const inputs = document.querySelectorAll(".otp-input");
  const submitBtn = document.getElementById("submitBtn");

  function checkInputs() {
    let allFilled = true;
    inputs.forEach((input) => {
      if (input.value.length === 0) {
        allFilled = false;
      }
    });
    submitBtn.disabled = !allFilled;
  }

  inputs.forEach((input, index) => {
    input.addEventListener("input", (event) => {
      if (event.inputType === "insertText" && input.value.length === 1) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      }
      checkInputs();
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && input.value.length === 0) {
        if (index > 0) {
          inputs[index - 1].focus();
          inputs[index - 1].value = ""; // Clear the previous input field
        }
      }
    });
  });

  document.getElementById("resendOtpBtn")?.addEventListener("click", () => {
    inputs.forEach((input) => {
      input.value = "";
    });
    inputs[0].focus();
    checkInputs();
  });
});
// otp modal end

// This script listens for the "change" event on the "Urgent" radio button.
// If the "Urgent" option is selected, it triggers the Bootstrap modal to display.
document.getElementById("urgent").addEventListener("change", function () {
  var urgentModal = new bootstrap.Modal(document.getElementById("urgentModal"));
  if (this.checked) {
    urgentModal.show();
  } else {
    urgentModal.hide();
  }
});

// This script listens for changes in the address change radio buttons.
// If "Yes" is selected, the address input field is shown. If "No" is selected, it is hidden.
document.getElementById("addressYes").addEventListener("change", function () {
  if (this.checked) {
    document.getElementById("addressInput").style.display = "block";
  }
});

document.getElementById("addressNo").addEventListener("change", function () {
  if (this.checked) {
    document.getElementById("addressInput").style.display = "none";
  }
});

// This script listens for changes in the radio buttons asking about having a spouse for the full year.
// If "No" is selected, the fields for the name of the spouse or partner and the date of separation are shown.
// If "Yes" is selected, the fields remain hidden.
document.getElementById("spouseNo").addEventListener("change", function () {
  if (this.checked) {
    document.getElementById("spouseDetails").style.display = "block";
  }
});

document.getElementById("spouseYes").addEventListener("change", function () {
  if (this.checked) {
    document.getElementById("spouseDetails").style.display = "none";
  }
});

// for add multiple children
let addChildrenInputIndex = 0; // Initialize index for additional rows

document.getElementById("add-children").addEventListener("click", function () {
  addChildrenInputIndex++;

  let childrenTableBody = document.getElementById("childrenTableBody");

  let row = document.createElement("tr");

  // Name input
  let nameCell = document.createElement("td");
  let nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.classList.add("form-control");
  nameInput.placeholder = "Children Name";
  nameInput.name = `childrenName[${addChildrenInputIndex}]`;
  nameCell.appendChild(nameInput);

  // DOB input
  let dobCell = document.createElement("td");
  let dobInput = document.createElement("input");
  dobInput.type = "date";
  dobInput.classList.add("form-control");
  dobInput.name = `childrenDob[${addChildrenInputIndex}]`;
  dobCell.appendChild(dobInput);

  // Remove button
  let actionCell = document.createElement("td");
  actionCell.classList.add("text-center");
  let removeButton = document.createElement("button");
  removeButton.classList.add("remove-btn", "btn", "btn-sm", "btn-danger");
  removeButton.type = "button";
  removeButton.innerHTML = "remove"; // Bootstrap Icon for 'x'

  removeButton.addEventListener("click", function () {
    row.remove();
  });

  actionCell.appendChild(removeButton);

  // Append cells to the row
  row.appendChild(nameCell);
  row.appendChild(dobCell);
  row.appendChild(actionCell);

  // Append row to the table body
  childrenTableBody.appendChild(row);
});

// add children end

// interest receiverd
// Initialize index for additional rows
let interestReceivedRowIndex = 0;

document
  .getElementById("add-interest-row")
  ?.addEventListener("click", function () {
    let tableBody = document.getElementById("interestReceivedTableBody");

    // Increment the row index
    interestReceivedRowIndex++;

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input elements
    let bankNameCell = document.createElement("td");
    let accountNumberCell = document.createElement("td");
    let totalInterestCell = document.createElement("td");
    let tfnWithholdingCell = document.createElement("td");
    let jointAccountCell = document.createElement("td");
    let actionsCell = document.createElement("td"); // New cell for actions

    // Create input elements for each cell
    let bankNameInput = document.createElement("input");
    let accountNumberInput = document.createElement("input");
    let totalInterestInput = document.createElement("input");
    let tfnWithholdingInput = document.createElement("input");
    let jointAccountInput = document.createElement("input");
    let jointAccountLabel = document.createElement("label");

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

    jointAccountLabel.setAttribute("for", jointAccountInput.id);
    jointAccountLabel.innerText = "Yes";

    // Create a flex container for the checkbox and label
    let flexContainer = document.createElement("div");
    flexContainer.className =
      "d-flex justify-content-center align-items-center gap-1";
    flexContainer.appendChild(jointAccountInput);
    flexContainer.appendChild(jointAccountLabel);

    // Append inputs to their respective cells
    bankNameCell.appendChild(bankNameInput);
    accountNumberCell.appendChild(accountNumberInput);
    totalInterestCell.appendChild(totalInterestInput);
    tfnWithholdingCell.appendChild(tfnWithholdingInput);
    jointAccountCell.appendChild(flexContainer);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className = "remove-btn btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "remove";

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(bankNameCell);
    newRow.appendChild(accountNumberCell);
    newRow.appendChild(totalInterestCell);
    newRow.appendChild(tfnWithholdingCell);
    newRow.appendChild(jointAccountCell);
    newRow.appendChild(actionsCell); // Append actions cell

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// interest receiverd end

// dividents
// Initialize index for additional rows
let dividendsRowIndex = 0;

document
  .getElementById("add-dividend-row")
  ?.addEventListener("click", function () {
    let tableBody = document.getElementById("dividendsTableBody");

    // Increment the row index
    dividendsRowIndex++;

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input elements
    let shareNameCell = document.createElement("td");
    let frankedDividendsCell = document.createElement("td");
    let unfrankedDividendsCell = document.createElement("td");
    let frankingCreditsCell = document.createElement("td");
    let actionsCell = document.createElement("td"); // New cell for actions

    // Create input elements for each cell
    let shareNameInput = document.createElement("input");
    let frankedDividendsInput = document.createElement("input");
    let unfrankedDividendsInput = document.createElement("input");
    let frankingCreditsInput = document.createElement("input");

    // Set attributes for each input element
    shareNameInput.type = "text";
    shareNameInput.className = "form-control";
    shareNameInput.name = `sharesName[${dividendsRowIndex}]`;

    frankedDividendsInput.type = "text";
    frankedDividendsInput.className = "form-control";
    frankedDividendsInput.name = `frankedDividends[${dividendsRowIndex}]`;

    unfrankedDividendsInput.type = "text";
    unfrankedDividendsInput.className = "form-control";
    unfrankedDividendsInput.name = `unfrankedDividends[${dividendsRowIndex}]`;

    frankingCreditsInput.type = "text";
    frankingCreditsInput.className = "form-control";
    frankingCreditsInput.name = `frankingCredits[${dividendsRowIndex}]`;

    // Append inputs to their respective cells
    shareNameCell.appendChild(shareNameInput);
    frankedDividendsCell.appendChild(frankedDividendsInput);
    unfrankedDividendsCell.appendChild(unfrankedDividendsInput);
    frankingCreditsCell.appendChild(frankingCreditsInput);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className = "remove-btn btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "Remove"; // Bootstrap Icon for 'x'

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(shareNameCell);
    newRow.appendChild(frankedDividendsCell);
    newRow.appendChild(unfrankedDividendsCell);
    newRow.appendChild(frankingCreditsCell);
    newRow.appendChild(actionsCell); // Append actions cell

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// dividents end

// add remove other work relation expenses
// Initialize index for additional rows
let otherWorkRelationExpenseRowIndex = 0;

// Function to add a new expense row
document
  .getElementById("addOtherWorkRelationExpenseButton")
  ?.addEventListener("click", function () {
    let tableBody = document.getElementById(
      "otherWorkRelationExpensesTableBody"
    );

    // Increment the row index
    otherWorkRelationExpenseRowIndex++;

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input elements
    let expenseCell = document.createElement("td");
    let amountCell = document.createElement("td");
    let attachmentCell = document.createElement("td");
    let actionsCell = document.createElement("td"); // New cell for actions

    // Create input elements for each cell
    let expenseInput = document.createElement("input");
    let amountInput = document.createElement("input");
    let attachmentInput = document.createElement("input");

    // Set attributes for each input element
    expenseInput.type = "text";
    expenseInput.className = "form-control";
    expenseInput.name = `expenseName[${otherWorkRelationExpenseRowIndex}]`;

    amountInput.type = "text";
    amountInput.className = "form-control";
    amountInput.name = `expenseAmount[${otherWorkRelationExpenseRowIndex}]`;

    attachmentInput.type = "file";
    attachmentInput.className = "form-control";
    attachmentInput.name = `expenseAttachment[${otherWorkRelationExpenseRowIndex}]`;

    // Append inputs to their respective cells
    expenseCell.appendChild(expenseInput);
    amountCell.appendChild(amountInput);
    attachmentCell.appendChild(attachmentInput);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className = "remove-expense btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "Remove";

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(expenseCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(attachmentCell);
    newRow.appendChild(actionsCell); // Append actions cell

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// Initialize indices for additional rows
let otherExpenseRowIndex = 0;
let giftsDonationsExpenseRowIndex = 0;

// Function to add a new expense row for OTHER
document
  .getElementById("addOtherExpenseButton")
  ?.addEventListener("click", function () {
    let tableBody = document.getElementById("otherExpensesTableBody");

    // Increment the row index
    otherExpenseRowIndex++;

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input elements
    let expenseCell = document.createElement("td");
    let amountCell = document.createElement("td");
    let attachmentCell = document.createElement("td");
    let actionsCell = document.createElement("td"); // New cell for actions

    // Create input elements for each cell
    let expenseInput = document.createElement("input");
    let amountInput = document.createElement("input");
    let attachmentInput = document.createElement("input");

    // Set attributes for each input element
    expenseInput.type = "text";
    expenseInput.className = "form-control";
    expenseInput.name = `otherExpenseName[${otherExpenseRowIndex}]`;

    amountInput.type = "text";
    amountInput.className = "form-control";
    amountInput.name = `otherExpenseAmount[${otherExpenseRowIndex}]`;

    attachmentInput.type = "file";
    attachmentInput.className = "form-control";
    attachmentInput.name = `otherExpenseAttachment[${otherExpenseRowIndex}]`;

    // Append inputs to their respective cells
    expenseCell.appendChild(expenseInput);
    amountCell.appendChild(amountInput);
    attachmentCell.appendChild(attachmentInput);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className = "remove-other-expense btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "Remove";

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(expenseCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(attachmentCell);
    newRow.appendChild(actionsCell); // Append actions cell

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// Function to add a new expense row for GIFTS OR DONATIONS
document
  .getElementById("addGiftsDonationsExpenseButton")
  ?.addEventListener("click", function () {
    let tableBody = document.getElementById("giftsDonationsExpensesTableBody");

    // Increment the row index
    giftsDonationsExpenseRowIndex++;

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input elements
    let expenseCell = document.createElement("td");
    let amountCell = document.createElement("td");
    let attachmentCell = document.createElement("td");
    let actionsCell = document.createElement("td"); // New cell for actions

    // Create input elements for each cell
    let expenseInput = document.createElement("input");
    let amountInput = document.createElement("input");
    let attachmentInput = document.createElement("input");

    // Set attributes for each input element
    expenseInput.type = "text";
    expenseInput.className = "form-control";
    expenseInput.name = `giftsDonationsExpenseName[${giftsDonationsExpenseRowIndex}]`;

    amountInput.type = "text";
    amountInput.className = "form-control";
    amountInput.name = `giftsDonationsExpenseAmount[${giftsDonationsExpenseRowIndex}]`;

    attachmentInput.type = "file";
    attachmentInput.className = "form-control";
    attachmentInput.name = `giftsDonationsExpenseAttachment[${giftsDonationsExpenseRowIndex}]`;

    // Append inputs to their respective cells
    expenseCell.appendChild(expenseInput);
    amountCell.appendChild(amountInput);
    attachmentCell.appendChild(attachmentInput);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className =
      "remove-gifts-donations-expense btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "Remove";

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(expenseCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(attachmentCell);
    newRow.appendChild(actionsCell); // Append actions cell

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// Function to toggle the display of the attachment field based on radio button selection
document.addEventListener("DOMContentLoaded", function () {
  const attachmentField = document.getElementById("attachmentField");
  const incomeProtectionInsuranceYes = document.getElementById(
    "incomeProtectionInsuranceYes"
  );
  const incomeProtectionInsuranceNo = document.getElementById(
    "incomeProtectionInsuranceNo"
  );

  // Initial check to set the display state
  if (incomeProtectionInsuranceYes.checked) {
    attachmentField.style.display = "block";
  } else {
    attachmentField.style.display = "none";
  }

  // Event listeners to update the display when a radio button is selected
  incomeProtectionInsuranceYes.addEventListener("change", function () {
    attachmentField.style.display = "block";
  });

  incomeProtectionInsuranceNo.addEventListener("change", function () {
    attachmentField.style.display = "none";
  });
});

// for spouse partner
document.addEventListener("DOMContentLoaded", function () {
  const spousePartnerForYearYes = document.getElementById(
    "spousePartnerForYearYes"
  );
  const spousePartnerForYearNo = document.getElementById(
    "spousePartnerForYearNo"
  );
  const spousePartnerDetails = document.getElementById("spousePartnerDetails");
  const separateInput = document.getElementById("separateInput");

  // Initial check to set the display state
  if (spousePartnerForYearYes.checked) {
    spousePartnerDetails.style.display = "block";
    separateInput.style.display = "none";
  } else if (spousePartnerForYearNo.checked) {
    spousePartnerDetails.style.display = "none";
    separateInput.style.display = "block";
  }

  // Event listeners to update the display when a radio button is selected
  spousePartnerForYearYes.addEventListener("change", function () {
    spousePartnerDetails.style.display = "block";
    separateInput.style.display = "none";
  });

  spousePartnerForYearNo.addEventListener("change", function () {
    spousePartnerDetails.style.display = "none";
    separateInput.style.display = "block";
  });
});

// add remove superannuation
// Initialize indices for additional rows
let superannuationRowIndex = 0;
let superannuationSpouseRowIndex = 0;

// Function to add a new superannuation row for section a
document
  .getElementById("addSuperannuationButton")
  ?.addEventListener("click", function () {
    let tableBody = document.getElementById("superannuationTableBody");

    // Increment the row index
    superannuationRowIndex++;

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input elements
    let fundNameCell = document.createElement("td");
    let dateOfPaymentCell = document.createElement("td");
    let contributionAmountCell = document.createElement("td");
    let attachmentCell = document.createElement("td");
    let actionsCell = document.createElement("td");

    // Create input elements for each cell
    let fundNameInput = document.createElement("input");
    let dateOfPaymentInput = document.createElement("input");
    let contributionAmountInput = document.createElement("input");
    let attachmentInput = document.createElement("input");

    // Set attributes for each input element
    fundNameInput.type = "text";
    fundNameInput.className = "form-control";
    fundNameInput.name = `superannuationFundName[${superannuationRowIndex}]`;

    dateOfPaymentInput.type = "date";
    dateOfPaymentInput.className = "form-control";
    dateOfPaymentInput.name = `superannuationDateOfPayment[${superannuationRowIndex}]`;

    contributionAmountInput.type = "text";
    contributionAmountInput.className = "form-control";
    contributionAmountInput.name = `superannuationContributionAmount[${superannuationRowIndex}]`;

    attachmentInput.type = "file";
    attachmentInput.className = "form-control";
    attachmentInput.name = `superannuationAttachment[${superannuationRowIndex}]`;

    // Append inputs to their respective cells
    fundNameCell.appendChild(fundNameInput);
    dateOfPaymentCell.appendChild(dateOfPaymentInput);
    contributionAmountCell.appendChild(contributionAmountInput);
    attachmentCell.appendChild(attachmentInput);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className = "remove-superannuation btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "Remove";

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(fundNameCell);
    newRow.appendChild(dateOfPaymentCell);
    newRow.appendChild(contributionAmountCell);
    newRow.appendChild(attachmentCell);
    newRow.appendChild(actionsCell);

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// Function to add a new superannuation row for section b (spouse contributions)
document
  .getElementById("addSuperannuationSpouseButton")
  ?.addEventListener("click", function () {
    let tableBody = document.getElementById("superannuationSpouseTableBody");

    // Increment the row index
    superannuationSpouseRowIndex++;

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input elements
    let fundNameCell = document.createElement("td");
    let dateOfPaymentCell = document.createElement("td");
    let contributionAmountCell = document.createElement("td");
    let attachmentCell = document.createElement("td");
    let actionsCell = document.createElement("td");

    // Create input elements for each cell
    let fundNameInput = document.createElement("input");
    let dateOfPaymentInput = document.createElement("input");
    let contributionAmountInput = document.createElement("input");
    let attachmentInput = document.createElement("input");

    // Set attributes for each input element
    fundNameInput.type = "text";
    fundNameInput.className = "form-control";
    fundNameInput.name = `superannuationSpouseFundName[${superannuationSpouseRowIndex}]`;

    dateOfPaymentInput.type = "date";
    dateOfPaymentInput.className = "form-control";
    dateOfPaymentInput.name = `superannuationSpouseDateOfPayment[${superannuationSpouseRowIndex}]`;

    contributionAmountInput.type = "text";
    contributionAmountInput.className = "form-control";
    contributionAmountInput.name = `superannuationSpouseContributionAmount[${superannuationSpouseRowIndex}]`;

    attachmentInput.type = "file";
    attachmentInput.className = "form-control";
    attachmentInput.name = `superannuationSpouseAttachment[${superannuationSpouseRowIndex}]`;

    // Append inputs to their respective cells
    fundNameCell.appendChild(fundNameInput);
    dateOfPaymentCell.appendChild(dateOfPaymentInput);
    contributionAmountCell.appendChild(contributionAmountInput);
    attachmentCell.appendChild(attachmentInput);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className =
      "remove-superannuation-spouse btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "Remove";

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(fundNameCell);
    newRow.appendChild(dateOfPaymentCell);
    newRow.appendChild(contributionAmountCell);
    newRow.appendChild(attachmentCell);
    newRow.appendChild(actionsCell);

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// add or show vehicle details
// Show/Hide fields based on selected method
document
  .querySelectorAll('input[name="calculationMethod"]')
  .forEach((input) => {
    input.addEventListener("change", function () {
      const logBookFields = document.getElementById("logBookFields");
      const kilometresFields = document.getElementById("kilometresFields");

      if (this.id === "logBookMethod") {
        logBookFields.classList.remove("d-none");
        kilometresFields.classList.add("d-none");
      } else if (this.id === "kilometresMethod") {
        logBookFields.classList.add("d-none");
        kilometresFields.classList.remove("d-none");
      }
    });
  });

// Add additional expenses rows for Log Book Method
let expensesRowIndex = 0;

document
  .getElementById("add-expense-row")
  .addEventListener("click", function () {
    let tableBody = document.getElementById("expensesTableBody");
    expensesRowIndex++;

    let newRow = document.createElement("tr");

    let expenseCell = document.createElement("td");
    let amountCell = document.createElement("td");
    let fileCell = document.createElement("td");
    let actionsCell = document.createElement("td");

    let expenseInput = document.createElement("input");
    let amountInput = document.createElement("input");
    let fileInput = document.createElement("input");

    expenseInput.type = "text";
    expenseInput.className = "form-control";
    expenseInput.name = `expense[${expensesRowIndex}]`;

    amountInput.type = "text";
    amountInput.className = "form-control";
    amountInput.name = `amount[${expensesRowIndex}]`;

    fileInput.type = "file";
    fileInput.className = "form-control";
    fileInput.name = `file[${expensesRowIndex}]`;

    expenseCell.appendChild(expenseInput);
    amountCell.appendChild(amountInput);
    fileCell.appendChild(fileInput);

    let removeButton = document.createElement("button");
    removeButton.className = "remove-btn btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "Remove";

    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    actionsCell.appendChild(removeButton);

    newRow.appendChild(expenseCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(fileCell);
    newRow.appendChild(actionsCell);

    tableBody.appendChild(newRow);
  });

// client details
// Initialize index for additional rows
let clientDetailsRowIndex = 0;

document
  .getElementById("add-client-row")
  ?.addEventListener("click", function () {
    let tableBody = document.getElementById("clientDetailsTableBody");

    // Increment the row index
    clientDetailsRowIndex++;

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input elements
    let titleCell = document.createElement("td");
    let firstNameCell = document.createElement("td");
    let surnameCell = document.createElement("td");
    let dobCell = document.createElement("td");
    let ageCell = document.createElement("td");
    let sexCell = document.createElement("td");
    let relationshipCell = document.createElement("td");
    let actionsCell = document.createElement("td"); // New cell for actions

    // Create input elements for each cell
    let titleInput = document.createElement("input");
    let firstNameInput = document.createElement("input");
    let surnameInput = document.createElement("input");
    let dobInput = document.createElement("input");
    let ageInput = document.createElement("input");
    let sexInput = document.createElement("input");
    let relationshipInput = document.createElement("input");

    // Set attributes for each input element
    titleInput.type = "text";
    titleInput.className = "form-control";
    titleInput.name = `title[${clientDetailsRowIndex}]`;

    firstNameInput.type = "text";
    firstNameInput.className = "form-control";
    firstNameInput.name = `firstName[${clientDetailsRowIndex}]`;

    surnameInput.type = "text";
    surnameInput.className = "form-control";
    surnameInput.name = `surname[${clientDetailsRowIndex}]`;

    dobInput.type = "text";
    dobInput.className = "form-control";
    dobInput.name = `dob[${clientDetailsRowIndex}]`;

    ageInput.type = "text";
    ageInput.className = "form-control";
    ageInput.name = `age[${clientDetailsRowIndex}]`;

    sexInput.type = "text";
    sexInput.className = "form-control";
    sexInput.name = `sex[${clientDetailsRowIndex}]`;

    relationshipInput.type = "text";
    relationshipInput.className = "form-control";
    relationshipInput.name = `relationship[${clientDetailsRowIndex}]`;

    // Append inputs to their respective cells
    titleCell.appendChild(titleInput);
    firstNameCell.appendChild(firstNameInput);
    surnameCell.appendChild(surnameInput);
    dobCell.appendChild(dobInput);
    ageCell.appendChild(ageInput);
    sexCell.appendChild(sexInput);
    relationshipCell.appendChild(relationshipInput);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className = "remove-btn btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "remove"; // Bootstrap Icon for 'x'

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(titleCell);
    newRow.appendChild(firstNameCell);
    newRow.appendChild(surnameCell);
    newRow.appendChild(dobCell);
    newRow.appendChild(ageCell);
    newRow.appendChild(sexCell);
    newRow.appendChild(relationshipCell);
    newRow.appendChild(actionsCell); // Append actions cell

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// client details end

// address details
// Initialize index for additional rows
let addressDetailsRowIndex = 0;

document
  .getElementById("add-address-row")
  ?.addEventListener("click", function () {
    let tableBody = document.getElementById("addressDetailsTableBody");

    // Increment the row index
    addressDetailsRowIndex++;

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input elements
    let addressCell = document.createElement("td");
    let actionsCell = document.createElement("td"); // New cell for actions

    // Create input elements for each cell
    let addressInput = document.createElement("input");

    // Set attributes for each input element
    addressInput.type = "text";
    addressInput.className = "form-control";
    addressInput.name = `address[${addressDetailsRowIndex}]`;

    // Append inputs to their respective cells
    addressCell.appendChild(addressInput);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className = "remove-btn btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "remove"; // Bootstrap Icon for 'x'

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(addressCell);
    newRow.appendChild(actionsCell); // Append actions cell

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// address details end

// contact details
// Initialize index for additional rows
let contactDetailsRowIndex = 0;

document
  .getElementById("add-contact-row")
  ?.addEventListener("click", function () {
    let tableBody = document.getElementById("contactDetailsTableBody");

    // Increment the row index
    contactDetailsRowIndex++;

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input elements
    let phoneCell = document.createElement("td");
    let workCell = document.createElement("td");
    let mobileCell = document.createElement("td");
    let emailCell = document.createElement("td");
    let actionsCell = document.createElement("td"); // New cell for actions

    // Create input elements for each cell
    let phoneInput = document.createElement("input");
    let workInput = document.createElement("input");
    let mobileInput = document.createElement("input");
    let emailInput = document.createElement("input");

    // Set attributes for each input element
    phoneInput.type = "text";
    phoneInput.className = "form-control";
    phoneInput.name = `phone[${contactDetailsRowIndex}]`;

    workInput.type = "text";
    workInput.className = "form-control";
    workInput.name = `work[${contactDetailsRowIndex}]`;

    mobileInput.type = "text";
    mobileInput.className = "form-control";
    mobileInput.name = `mobile[${contactDetailsRowIndex}]`;

    emailInput.type = "text";
    emailInput.className = "form-control";
    emailInput.name = `email[${contactDetailsRowIndex}]`;

    // Append inputs to their respective cells
    phoneCell.appendChild(phoneInput);
    workCell.appendChild(workInput);
    mobileCell.appendChild(mobileInput);
    emailCell.appendChild(emailInput);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className = "remove-btn btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "remove"; // Bootstrap Icon for 'x'

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(phoneCell);
    newRow.appendChild(workCell);
    newRow.appendChild(mobileCell);
    newRow.appendChild(emailCell);
    newRow.appendChild(actionsCell); // Append actions cell

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// contact details end

// dependant child's details
// Initialize index for additional rows
let dependantChildDetailsRowIndex = 0;

document
  .getElementById("add-dependant-child-row")
  ?.addEventListener("click", function () {
    let tableBody = document.getElementById("dependantChildDetailsTableBody");

    // Increment the row index
    dependantChildDetailsRowIndex++;

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input elements
    let childNameCell = document.createElement("td");
    let ageCell = document.createElement("td");
    let sexCell = document.createElement("td");
    let livingAtHomeCell = document.createElement("td");
    let salaryCell = document.createElement("td");
    let commentsCell = document.createElement("td");
    let actionsCell = document.createElement("td"); // New cell for actions

    // Create input elements for each cell
    let childNameInput = document.createElement("input");
    let ageInput = document.createElement("input");
    let sexInput = document.createElement("input");
    let livingAtHomeInput = document.createElement("input");
    let livingAtHomeLabel = document.createElement("label");
    let salaryInput = document.createElement("input");
    let commentsInput = document.createElement("input");

    // Set attributes for each input element
    childNameInput.type = "text";
    childNameInput.className = "form-control";
    childNameInput.name = `childName[${dependantChildDetailsRowIndex}]`;

    ageInput.type = "text";
    ageInput.className = "form-control";
    ageInput.name = `age[${dependantChildDetailsRowIndex}]`;

    sexInput.type = "text";
    sexInput.className = "form-control";
    sexInput.name = `sex[${dependantChildDetailsRowIndex}]`;

    livingAtHomeInput.type = "checkbox";
    livingAtHomeInput.className = "form-check-input";
    livingAtHomeInput.name = `livingAtHome[${dependantChildDetailsRowIndex}]`;
    livingAtHomeInput.id = `livingAtHome[${dependantChildDetailsRowIndex}]`;

    livingAtHomeLabel.setAttribute("for", livingAtHomeInput.id);
    livingAtHomeLabel.innerText = "Yes";

    salaryInput.type = "text";
    salaryInput.className = "form-control";
    salaryInput.name = `salary[${dependantChildDetailsRowIndex}]`;

    commentsInput.type = "text";
    commentsInput.className = "form-control";
    commentsInput.name = `comments[${dependantChildDetailsRowIndex}]`;

    // Create a flex container for the checkbox and label
    let flexContainer = document.createElement("div");
    flexContainer.className =
      "d-flex justify-content-center align-items-center gap-1";
    flexContainer.appendChild(livingAtHomeInput);
    flexContainer.appendChild(livingAtHomeLabel);

    // Append inputs to their respective cells
    childNameCell.appendChild(childNameInput);
    ageCell.appendChild(ageInput);
    sexCell.appendChild(sexInput);
    livingAtHomeCell.appendChild(flexContainer);
    salaryCell.appendChild(salaryInput);
    commentsCell.appendChild(commentsInput);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className = "remove-btn btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "remove"; // Bootstrap Icon for 'x'

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(childNameCell);
    newRow.appendChild(ageCell);
    newRow.appendChild(sexCell);
    newRow.appendChild(livingAtHomeCell);
    newRow.appendChild(salaryCell);
    newRow.appendChild(commentsCell);
    newRow.appendChild(actionsCell); // Append actions cell

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// dependant child's details end

// about business
// Initialize index for additional rows
let businessDetailsRowIndex = 0;
document
  .getElementById("add-business-row")
  ?.addEventListener("click", function () {
    let tableBody = document.getElementById("about-business");

    // Increment the row index
    businessDetailsRowIndex++;

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input elements
    let businessNameCell = document.createElement("td");
    let descriptionCell = document.createElement("td");
    let corporateStructureCell = document.createElement("td");
    let ownershipDetailsCell = document.createElement("td");
    let turnoverCell = document.createElement("td");
    let businessAssetsCell = document.createElement("td");
    let valueOfBusinessAssetsCell = document.createElement("td");
    let numOfEmployeesCell = document.createElement("td");
    let dateStartedCell = document.createElement("td");
    let actionsCell = document.createElement("td"); // New cell for actions

    // Create input elements for each cell
    let businessNameInput = document.createElement("input");
    let descriptionInput = document.createElement("input");
    let corporateStructureInput = document.createElement("input");
    let ownershipDetailsInput = document.createElement("input");
    let turnoverInput = document.createElement("input");
    let businessAssetsInput = document.createElement("input");
    let valueOfBusinessAssetsInput = document.createElement("input");
    let numOfEmployeesInput = document.createElement("input");
    let dateStartedInput = document.createElement("input");

    // Set attributes for each input element
    businessNameInput.type = "text";
    businessNameInput.className = "form-control";
    businessNameInput.name = `businessName[${businessDetailsRowIndex}]`;

    descriptionInput.type = "text";
    descriptionInput.className = "form-control";
    descriptionInput.name = `description[${businessDetailsRowIndex}]`;

    corporateStructureInput.type = "text";
    corporateStructureInput.className = "form-control";
    corporateStructureInput.name = `corporateStructure[${businessDetailsRowIndex}]`;

    ownershipDetailsInput.type = "text";
    ownershipDetailsInput.className = "form-control";
    ownershipDetailsInput.name = `ownershipDetails[${businessDetailsRowIndex}]`;

    turnoverInput.type = "text";
    turnoverInput.className = "form-control";
    turnoverInput.name = `turnover[${businessDetailsRowIndex}]`;

    businessAssetsInput.type = "text";
    businessAssetsInput.className = "form-control";
    businessAssetsInput.name = `businessAssets[${businessDetailsRowIndex}]`;

    valueOfBusinessAssetsInput.type = "text";
    valueOfBusinessAssetsInput.className = "form-control";
    valueOfBusinessAssetsInput.name = `valueOfBusinessAssets[${businessDetailsRowIndex}]`;

    numOfEmployeesInput.type = "text";
    numOfEmployeesInput.className = "form-control";
    numOfEmployeesInput.name = `numOfEmployees[${businessDetailsRowIndex}]`;

    dateStartedInput.type = "text";
    dateStartedInput.className = "form-control";
    dateStartedInput.name = `dateStarted[${businessDetailsRowIndex}]`;

    // Append inputs to their respective cells
    businessNameCell.appendChild(businessNameInput);
    descriptionCell.appendChild(descriptionInput);
    corporateStructureCell.appendChild(corporateStructureInput);
    ownershipDetailsCell.appendChild(ownershipDetailsInput);
    turnoverCell.appendChild(turnoverInput);
    businessAssetsCell.appendChild(businessAssetsInput);
    valueOfBusinessAssetsCell.appendChild(valueOfBusinessAssetsInput);
    numOfEmployeesCell.appendChild(numOfEmployeesInput);
    dateStartedCell.appendChild(dateStartedInput);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className = "remove-btn btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "remove"; // Bootstrap Icon for 'x'

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(businessNameCell);
    newRow.appendChild(descriptionCell);
    newRow.appendChild(corporateStructureCell);
    newRow.appendChild(ownershipDetailsCell);
    newRow.appendChild(turnoverCell);
    newRow.appendChild(businessAssetsCell);
    newRow.appendChild(valueOfBusinessAssetsCell);
    newRow.appendChild(numOfEmployeesCell);
    newRow.appendChild(dateStartedCell);
    newRow.appendChild(actionsCell); // Append actions cell

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });
// about business end

// about employment
// Initialize index for additional rows
let employmentRowIndex = 0;

document
  .getElementById("add-employment-row")
  ?.addEventListener("click", function () {
    let tableBody = document.getElementById("employment-details");

    // Increment the row index
    employmentRowIndex++;

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input elements
    let clientNameCell = document.createElement("td");
    let jobDescriptionCell = document.createElement("td");
    let dateStartedCell = document.createElement("td");
    let salaryCell = document.createElement("td");
    let bonusesCell = document.createElement("td");
    let qualificationsCell = document.createElement("td");
    let superContributionsCell = document.createElement("td");
    let commentsCell = document.createElement("td");
    let actionsCell = document.createElement("td"); // New cell for actions

    // Create input elements for each cell
    let clientNameInput = document.createElement("input");
    let jobDescriptionInput = document.createElement("input");
    let dateStartedInput = document.createElement("input");
    let salaryInput = document.createElement("input");
    let bonusesInput = document.createElement("input");
    let qualificationsInput = document.createElement("input");
    let superContributionsInput = document.createElement("input");
    let commentsInput = document.createElement("input");

    // Set attributes for each input element
    clientNameInput.type = "text";
    clientNameInput.className = "form-control";
    clientNameInput.name = `clientName[${employmentRowIndex}]`;

    jobDescriptionInput.type = "text";
    jobDescriptionInput.className = "form-control";
    jobDescriptionInput.name = `jobDescription[${employmentRowIndex}]`;

    dateStartedInput.type = "text";
    dateStartedInput.className = "form-control";
    dateStartedInput.name = `dateStarted[${employmentRowIndex}]`;

    salaryInput.type = "text";
    salaryInput.className = "form-control";
    salaryInput.name = `salary[${employmentRowIndex}]`;

    bonusesInput.type = "text";
    bonusesInput.className = "form-control";
    bonusesInput.name = `bonuses[${employmentRowIndex}]`;

    qualificationsInput.type = "text";
    qualificationsInput.className = "form-control";
    qualificationsInput.name = `qualifications[${employmentRowIndex}]`;

    superContributionsInput.type = "text";
    superContributionsInput.className = "form-control";
    superContributionsInput.name = `superContributions[${employmentRowIndex}]`;

    commentsInput.type = "text";
    commentsInput.className = "form-control";
    commentsInput.name = `comments[${employmentRowIndex}]`;

    // Append inputs to their respective cells
    clientNameCell.appendChild(clientNameInput);
    jobDescriptionCell.appendChild(jobDescriptionInput);
    dateStartedCell.appendChild(dateStartedInput);
    salaryCell.appendChild(salaryInput);
    bonusesCell.appendChild(bonusesInput);
    qualificationsCell.appendChild(qualificationsInput);
    superContributionsCell.appendChild(superContributionsInput);
    commentsCell.appendChild(commentsInput);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className = "remove-btn btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "remove"; // Bootstrap Icon for 'x'

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(clientNameCell);
    newRow.appendChild(jobDescriptionCell);
    newRow.appendChild(dateStartedCell);
    newRow.appendChild(salaryCell);
    newRow.appendChild(bonusesCell);
    newRow.appendChild(qualificationsCell);
    newRow.appendChild(superContributionsCell);
    newRow.appendChild(commentsCell);
    newRow.appendChild(actionsCell); // Append actions cell

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

//  about employment end

// about property
// Initialize index for additional rows
let propertyRowIndex = 0;

document
  .getElementById("add-property-row")
  ?.addEventListener("click", function () {
    let tableBody = document.getElementById("property-details");

    // Increment the row index
    propertyRowIndex++;

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input/select elements
    let suburbCell = createTableCell("suburb");
    let stateCell = createTableCell("state");
    let ownershipDetailsCell = createTableCell("ownershipDetails");
    let propertyTypeCell = createTableCell("propertyType");
    let dateOfPurchaseCell = createTableCell("dateOfPurchase");
    let purchasePriceCell = createTableCell("purchasePrice");
    let currentMarketValueCell = createTableCell("currentMarketValue");
    let debtCell = createTableCell("debt");
    let loanTypeLenderCell = createTableCell("loanTypeLender");
    let equityCell = createTableCell("equity");
    let weeklyRentalIncomeCell = createTableCell("weeklyRentalIncome");
    let depreciationClaimedCell = createSelectTableCell("depreciationClaimed", [
      "Yes",
      "No",
    ]);
    let livedInPropertyCell = createSelectTableCell("livedInProperty", [
      "Yes",
      "No",
    ]);

    // Create remove button and its cell
    let removeButtonCell = document.createElement("td");
    let removeButton = document.createElement("button");
    removeButton.className = "remove-btn btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "remove"; // Bootstrap Icon for 'x'

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to cell
    removeButtonCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(suburbCell);
    newRow.appendChild(stateCell);
    newRow.appendChild(ownershipDetailsCell);
    newRow.appendChild(propertyTypeCell);
    newRow.appendChild(dateOfPurchaseCell);
    newRow.appendChild(purchasePriceCell);
    newRow.appendChild(currentMarketValueCell);
    newRow.appendChild(debtCell);
    newRow.appendChild(loanTypeLenderCell);
    newRow.appendChild(equityCell);
    newRow.appendChild(weeklyRentalIncomeCell);
    newRow.appendChild(depreciationClaimedCell);
    newRow.appendChild(livedInPropertyCell);
    newRow.appendChild(removeButtonCell); // Append remove button cell

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// Function to create text input cell
function createTableCell(name) {
  let cell = document.createElement("td");
  let input = document.createElement("input");
  input.type = "text";
  input.className = "form-control";
  input.name = `${name}[${propertyRowIndex}]`;
  cell.appendChild(input);
  return cell;
}

// Function to create select input cell
function createSelectTableCell(name, options) {
  let cell = document.createElement("td");
  let select = document.createElement("select");
  select.className = "form-select";
  select.name = `${name}[${propertyRowIndex}]`;

  options.forEach((optionValue) => {
    let option = document.createElement("option");
    option.value = optionValue;
    option.textContent = optionValue;
    select.appendChild(option);
  });

  cell.appendChild(select);
  return cell;
}

// about property End

// share and managed funds
// Initialize index for additional rows
let sharesFundsRowIndex = 0;

document
  .getElementById("add-shares-funds-row")
  ?.addEventListener("click", function () {
    let tableBody = document.getElementById("shares-funds-details");

    // Increment the row index
    sharesFundsRowIndex++;

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input/select elements
    let nameCell = document.createElement("td");
    let ownershipDetailsCell = document.createElement("td");
    let dateOfPurchaseCell = document.createElement("td");
    let totalValueOfPurchaseCell = document.createElement("td");
    let currentMarketValueCell = document.createElement("td");
    let debtCell = document.createElement("td");
    let loanTypeCell = document.createElement("td");
    let equityCell = document.createElement("td");
    let dividendCell = document.createElement("td");
    let holdingOrSellingCell = document.createElement("td");
    let actionsCell = document.createElement("td"); // New cell for actions

    // Create input/select elements for each cell
    let nameInput = document.createElement("input");
    let ownershipDetailsInput = document.createElement("input");
    let dateOfPurchaseInput = document.createElement("input");
    let totalValueOfPurchaseInput = document.createElement("input");
    let currentMarketValueInput = document.createElement("input");
    let debtInput = document.createElement("input");
    let loanTypeInput = document.createElement("input");
    let equityInput = document.createElement("input");
    let dividendInput = document.createElement("input");
    let holdingOrSellingSelect = document.createElement("select");

    // Set attributes and options for input/select elements
    nameInput.type = "text";
    nameInput.className = "form-control";
    nameInput.name = `shareName[${sharesFundsRowIndex}]`;

    ownershipDetailsInput.type = "text";
    ownershipDetailsInput.className = "form-control";
    ownershipDetailsInput.name = `ownershipDetails[${sharesFundsRowIndex}]`;

    dateOfPurchaseInput.type = "text";
    dateOfPurchaseInput.className = "form-control";
    dateOfPurchaseInput.name = `dateOfPurchase[${sharesFundsRowIndex}]`;

    totalValueOfPurchaseInput.type = "text";
    totalValueOfPurchaseInput.className = "form-control";
    totalValueOfPurchaseInput.name = `totalValueOfPurchase[${sharesFundsRowIndex}]`;

    currentMarketValueInput.type = "text";
    currentMarketValueInput.className = "form-control";
    currentMarketValueInput.name = `currentMarketValue[${sharesFundsRowIndex}]`;

    debtInput.type = "text";
    debtInput.className = "form-control";
    debtInput.name = `debt[${sharesFundsRowIndex}]`;

    loanTypeInput.type = "text";
    loanTypeInput.className = "form-control";
    loanTypeInput.name = `loanType[${sharesFundsRowIndex}]`;

    equityInput.type = "text";
    equityInput.className = "form-control";
    equityInput.name = `equity[${sharesFundsRowIndex}]`;

    dividendInput.type = "text";
    dividendInput.className = "form-control";
    dividendInput.name = `dividend[${sharesFundsRowIndex}]`;

    let holdingOrSellingOption1 = document.createElement("option");
    holdingOrSellingOption1.value = "Holding";
    holdingOrSellingOption1.textContent = "Holding";

    let holdingOrSellingOption2 = document.createElement("option");
    holdingOrSellingOption2.value = "Selling";
    holdingOrSellingOption2.textContent = "Selling";

    holdingOrSellingSelect.className = "form-select";
    holdingOrSellingSelect.name = `holdingOrSelling[${sharesFundsRowIndex}]`;
    holdingOrSellingSelect.appendChild(holdingOrSellingOption1);
    holdingOrSellingSelect.appendChild(holdingOrSellingOption2);

    // Append input/select elements to their respective cells
    nameCell.appendChild(nameInput);
    ownershipDetailsCell.appendChild(ownershipDetailsInput);
    dateOfPurchaseCell.appendChild(dateOfPurchaseInput);
    totalValueOfPurchaseCell.appendChild(totalValueOfPurchaseInput);
    currentMarketValueCell.appendChild(currentMarketValueInput);
    debtCell.appendChild(debtInput);
    loanTypeCell.appendChild(loanTypeInput);
    equityCell.appendChild(equityInput);
    dividendCell.appendChild(dividendInput);
    holdingOrSellingCell.appendChild(holdingOrSellingSelect);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className = "remove-btn btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "remove"; // Bootstrap Icon for 'x'

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(nameCell);
    newRow.appendChild(ownershipDetailsCell);
    newRow.appendChild(dateOfPurchaseCell);
    newRow.appendChild(totalValueOfPurchaseCell);
    newRow.appendChild(currentMarketValueCell);
    newRow.appendChild(debtCell);
    newRow.appendChild(loanTypeCell);
    newRow.appendChild(equityCell);
    newRow.appendChild(dividendCell);
    newRow.appendChild(holdingOrSellingCell);
    newRow.appendChild(actionsCell); // Append actions cell

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// share and managed funds end

// if investment property is yes then show form
document.addEventListener("DOMContentLoaded", function () {
  const investmentPropertyYes = document.getElementById(
    "investmentPropertyYes"
  );
  const investmentPropertyNo = document.getElementById("investmentPropertyNo");
  const investmentPropertyFields = document.getElementById(
    "investmentPropertyFields"
  );

  // Function to toggle visibility of the investment property fields
  function toggleInvestmentPropertyFields() {
    if (investmentPropertyYes.checked) {
      investmentPropertyFields.classList.remove("d-none");
    } else {
      investmentPropertyFields.classList.add("d-none");
    }
  }

  // Add event listeners to radio buttons
  investmentPropertyYes.addEventListener(
    "change",
    toggleInvestmentPropertyFields
  );
  investmentPropertyNo.addEventListener(
    "change",
    toggleInvestmentPropertyFields
  );
});

// add remove extra option for interest on loan
document.addEventListener("DOMContentLoaded", function () {
  let loanRowIndex = 1; // Start index at 1, since the first row is already present

  // Function to add a new loan row
  function addLoanRow() {
    let tableBody = document.getElementById("interestOnLoansTableBody");

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input elements
    let propertyIdCell = document.createElement("td");
    let bankNameCell = document.createElement("td");
    let loanAmountCell = document.createElement("td");
    let attachmentCell = document.createElement("td");
    let actionsCell = document.createElement("td");

    // Create input elements for each cell
    let propertyIdInput = document.createElement("input");
    let bankNameInput = document.createElement("input");
    let loanAmountInput = document.createElement("input");
    let attachmentInput = document.createElement("input");

    // Set attributes for each input element
    propertyIdInput.type = "text";
    propertyIdInput.className = "form-control";
    propertyIdInput.name = `loanPropertyId[${loanRowIndex}]`;

    bankNameInput.type = "text";
    bankNameInput.className = "form-control";
    bankNameInput.name = `loanBankName[${loanRowIndex}]`;

    loanAmountInput.type = "text";
    loanAmountInput.className = "form-control";
    loanAmountInput.name = `loanAmount[${loanRowIndex}]`;

    attachmentInput.type = "file";
    attachmentInput.className = "form-control";
    attachmentInput.name = `loanFile[${loanRowIndex}]`;

    // Append inputs to their respective cells
    propertyIdCell.appendChild(propertyIdInput);
    bankNameCell.appendChild(bankNameInput);
    loanAmountCell.appendChild(loanAmountInput);
    attachmentCell.appendChild(attachmentInput);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className = "remove-loan btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "Remove";

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(propertyIdCell);
    newRow.appendChild(bankNameCell);
    newRow.appendChild(loanAmountCell);
    newRow.appendChild(attachmentCell);
    newRow.appendChild(actionsCell);

    // Append the new row to the table body
    tableBody.appendChild(newRow);

    // Increment the row index
    loanRowIndex++;
  }

  // Add more rows dynamically when the button is clicked
  document
    .getElementById("addInvestmentPropertyLoanButton")
    .addEventListener("click", addLoanRow);

  // Add remove functionality to the initial row
  document.querySelectorAll(".remove-loan").forEach((button) => {
    button.addEventListener("click", function () {
      button.closest("tr").remove();
    });
  });
});

// add remove extra option for interest on loan end

// add remove aditional expenses forinvetsment property
document.addEventListener("DOMContentLoaded", function () {
  let expenseRowIndex = 1; // Start index at 1, since the first row is already present

  // Function to add a new expense row
  function addExpenseRow() {
    let tableBody = document.getElementById(
      "investmentPropertyExpenseTableBody"
    );

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input elements
    let propertyIdCell = document.createElement("td");
    let descriptionCell = document.createElement("td");
    let amountCell = document.createElement("td");
    let attachmentCell = document.createElement("td");
    let actionsCell = document.createElement("td");

    // Create input elements for each cell
    let propertyIdInput = document.createElement("input");
    let descriptionInput = document.createElement("input");
    let amountInput = document.createElement("input");
    let attachmentInput = document.createElement("input");

    // Set attributes for each input element
    propertyIdInput.type = "text";
    propertyIdInput.className = "form-control";
    propertyIdInput.name = `expensePropertyId[${expenseRowIndex}]`;

    descriptionInput.type = "text";
    descriptionInput.className = "form-control";
    descriptionInput.name = `expenseDescription[${expenseRowIndex}]`;

    amountInput.type = "text";
    amountInput.className = "form-control";
    amountInput.name = `expenseAmount[${expenseRowIndex}]`;

    attachmentInput.type = "file";
    attachmentInput.className = "form-control";
    attachmentInput.name = `expenseFile[${expenseRowIndex}]`;

    // Append inputs to their respective cells
    propertyIdCell.appendChild(propertyIdInput);
    descriptionCell.appendChild(descriptionInput);
    amountCell.appendChild(amountInput);
    attachmentCell.appendChild(attachmentInput);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className =
      "removeInvestmentPropertyExpense btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "Remove";

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(propertyIdCell);
    newRow.appendChild(descriptionCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(attachmentCell);
    newRow.appendChild(actionsCell);

    // Append the new row to the table body
    tableBody.appendChild(newRow);

    // Increment the row index
    expenseRowIndex++;
  }

  // Add more rows dynamically when the button is clicked
  document
    .getElementById("addInvestmentPropertyExpenseButton")
    .addEventListener("click", addExpenseRow);

  // Add remove functionality to the initial row
  document
    .querySelectorAll(".removeInvestmentPropertyExpense")
    .forEach((button) => {
      button.addEventListener("click", function () {
        button.closest("tr").remove();
      });
    });
});

// add remove aditional expenses forinvetsment property end

// for add remove show  self education
document.addEventListener("DOMContentLoaded", function () {
  let educationIndex = 0;

  // Function to toggle the display of self-education fields
  function toggleSelfEducationFields() {
    const selfEducationYes = document.getElementById("selfEducationYes");
    const addEducationContainer = document.getElementById(
      "addEducationContainer"
    );
    const selfEducationFields = document.getElementById("selfEducationFields");

    if (selfEducationYes.checked) {
      selfEducationFields.style.display = "block";
      addEducationContainer.style.display = "block";
    } else {
      selfEducationFields.style.display = "none";
      addEducationContainer.style.display = "none";
      selfEducationFields.innerHTML = ""; // Clear all self-education entries
    }
  }

  // Function to add a new self-education entry
  function addSelfEducationEntry() {
    const selfEducationFields = document.getElementById("selfEducationFields");
    const template = document.getElementById("selfEducationTemplate").innerHTML;

    // Replace placeholders in the template with the current index
    const entryHtml = template.replace(/__EDU_INDEX__/g, educationIndex);
    const newEntry = document.createElement("div");
    newEntry.innerHTML = entryHtml;

    selfEducationFields.appendChild(newEntry);
    educationIndex++;

    // Add event listener for HECS/HELP debt radio buttons
    newEntry.querySelectorAll(".hecs-debt-radio").forEach((radio) => {
      radio.addEventListener("change", function () {
        toggleHeCSHelpDebtAmount(newEntry);
      });
    });
  }

  // Function to remove a self-education entry
  function removeSelfEducationEntry(event) {
    const selfEducationFields = document.getElementById("selfEducationFields");

    if (
      selfEducationFields.querySelectorAll(".self-education-entry").length > 1
    ) {
      event.target.closest(".self-education-entry").remove();
    } else {
      event.target.closest(".self-education-entry").remove();
      document.getElementById("selfEducationNo").checked = true;
      toggleSelfEducationFields();
    }
  }

  // Function to add a new expense row
  function addSelfEducationExpenseRow(event) {
    const selfEducationEntry = event.target.closest(".self-education-entry");
    const expenseTableBody = selfEducationEntry.querySelector(
      ".expenses-table-body"
    );
    const expenseRowTemplate =
      document.getElementById("expenseRowTemplate").innerHTML;
    const expenseIndex = expenseTableBody.children.length;

    // Replace placeholders in the template with the current indexes
    const rowHtml = expenseRowTemplate
      .replace(
        /__EDU_INDEX__/g,
        selfEducationEntry
          .querySelector("input[name^='courseName']")
          .name.match(/\[(\d+)\]/)[1]
      )
      .replace(/__EXP_INDEX__/g, expenseIndex);
    const newRow = document.createElement("tr");
    newRow.innerHTML = rowHtml;

    expenseTableBody.appendChild(newRow);
  }

  // Function to remove a expense row
  function removeSelfEducationExpenseRow(event) {
    const row = event.target.closest("tr");
    if (row.closest("tbody").children.length > 1) {
      row.remove();
    }
  }

  // Function to toggle HECS/HELP Debt Amount visibility
  function toggleHeCSHelpDebtAmount(entry) {
    const hecsDebtYes = entry.querySelector(
      "input[name^='hecsDebt'][value='yes']"
    );
    const hecsDebtAmount = entry.querySelector(".hecs-debt-amount");

    if (hecsDebtYes.checked) {
      hecsDebtAmount.style.display = "block";
    } else {
      hecsDebtAmount.style.display = "none";
    }
  }

  document.querySelectorAll("input[name='selfEducation']").forEach((radio) => {
    radio.addEventListener("change", toggleSelfEducationFields);
  });

  document
    .getElementById("addSelfEducation")
    .addEventListener("click", addSelfEducationEntry);

  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("removeSelfEducation")) {
      removeSelfEducationEntry(event);
    } else if (event.target.classList.contains("removeSelfEducationExpense")) {
      removeSelfEducationExpenseRow(event);
    }
  });

  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("addSelfEducationExpense")) {
      addSelfEducationExpenseRow(event);
    }
  });

  toggleSelfEducationFields();
});
