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

// add children
// Initialize index for additional rows
let addChildrenInputIndex = 0;
document.getElementById("add-children")?.addEventListener("click", function () {
  addChildrenInputIndex++;

  let fieldGroupWrapper = document.createElement("div");
  fieldGroupWrapper.classList.add("mb-2", "row");

  let nameFieldWrapper = document.createElement("div");
  nameFieldWrapper.classList.add("col-12", "col-md-6");

  let birthDateFieldWrapper = document.createElement("div");
  birthDateFieldWrapper.classList.add("col-12", "col-md-6");

  let nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.classList.add("form-control");
  nameInput.placeholder = "Children Name";
  nameInput.name = `childrenName[${addChildrenInputIndex}]`;

  let birthDateInput = document.createElement("input");
  birthDateInput.type = "date";
  birthDateInput.classList.add("form-control");
  birthDateInput.name = `childrenDob[${addChildrenInputIndex}]`;

  nameFieldWrapper.appendChild(nameInput);
  birthDateFieldWrapper.appendChild(birthDateInput);

  let removeButtonWrapper = document.createElement("div");
  removeButtonWrapper.classList.add("col-12");

  let removeButton = document.createElement("button");
  removeButton.classList.add(
    "remove-btn",
    "btn",
    "btn-sm",
    "btn-danger",
    "ms-auto",
    "d-block",
    "ms-auto",
    "mt-1"
  );
  removeButton.type = "button";
  removeButton.innerHTML = "x"; // Bootstrap Icon for 'x'

  removeButton.addEventListener("click", function () {
    fieldGroupWrapper.remove();
  });

  removeButtonWrapper.appendChild(removeButton);

  fieldGroupWrapper.appendChild(nameFieldWrapper);
  fieldGroupWrapper.appendChild(birthDateFieldWrapper);
  fieldGroupWrapper.appendChild(removeButtonWrapper);

  document.getElementById("childrenInput").appendChild(fieldGroupWrapper);
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
    let sharesNumberCell = document.createElement("td");
    let shareAmountCell = document.createElement("td");
    let actionsCell = document.createElement("td"); // New cell for actions

    // Create input elements for each cell
    let shareNameInput = document.createElement("input");
    let sharesNumberInput = document.createElement("input");
    let shareAmountInput = document.createElement("input");

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
    newRow.appendChild(shareNameCell);
    newRow.appendChild(sharesNumberCell);
    newRow.appendChild(shareAmountCell);
    newRow.appendChild(actionsCell); // Append actions cell

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// dividents end

// client details
// Initialize index for additional rows
let clientDetailsRowIndex = 0;

document.getElementById("add-client-row")?.addEventListener("click", function () {
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
  removeButton.innerHTML = 'remove'; // Bootstrap Icon for 'x'

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

document.getElementById("add-address-row")?.addEventListener("click", function () {
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
  removeButton.innerHTML = 'remove'; // Bootstrap Icon for 'x'

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

document.getElementById("add-contact-row")?.addEventListener("click", function () {
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
  removeButton.innerHTML = 'remove'; // Bootstrap Icon for 'x'

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

document.getElementById("add-dependant-child-row")?.addEventListener("click", function () {
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
  flexContainer.className = "d-flex justify-content-center align-items-center gap-1";
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
  removeButton.innerHTML = 'remove'; // Bootstrap Icon for 'x'

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

document.getElementById("add-property-row")?.addEventListener("click", function () {
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
  let depreciationClaimedCell = createSelectTableCell("depreciationClaimed", ["Yes", "No"]);
  let livedInPropertyCell = createSelectTableCell("livedInProperty", ["Yes", "No"]);

  // Create remove button and its cell
  let removeButtonCell = document.createElement("td");
  let removeButton = document.createElement("button");
  removeButton.className = "remove-btn btn btn-sm btn-danger";
  removeButton.type = "button";
  removeButton.innerHTML = 'remove'; // Bootstrap Icon for 'x'

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

  options.forEach(optionValue => {
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
