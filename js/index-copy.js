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

// This script listens for changes in the radio buttons asking if the bank account details for the tax refund are the same as last year.
// If "No" is selected, the bank account input fields (Account Name, Bank BSB Number, Bank ACC Number) are shown.
// If "Yes" is selected, the input fields remain hidden.

document.addEventListener("DOMContentLoaded", function () {
  const yesRadio = document.getElementById("bankAccountNotChangeYes");
  const noRadio = document.getElementById("bankAccountNotChangeNo");
  const bankAccountChangeInput = document.getElementById(
    "bankAccountChangeInput"
  );

  // Function to toggle the bank account input fields
  function toggleBankAccountInput() {
    if (noRadio.checked) {
      bankAccountChangeInput.style.display = "block";
    } else {
      bankAccountChangeInput.style.display = "none";
    }
  }

  // Add event listeners to radio buttons
  yesRadio.addEventListener("change", toggleBankAccountInput);
  noRadio.addEventListener("change", toggleBankAccountInput);
});

// This script listens for changes in the radio buttons asking if the user is an employee.
// If "Yes" is selected, the message about PAYG income summaries is shown.
// If "No" is selected, the message about completing the Sole Trader Information Sheet is shown.

document.addEventListener("DOMContentLoaded", function () {
  const yesRadio = document.getElementById("anEmployeeYes");
  const noRadio = document.getElementById("anEmployeeNo");
  const employeeYesMessage = document.getElementById("employe-yes");
  const employeeNoMessage = document.getElementById("employe-no");

  // Function to toggle visibility of the messages
  function toggleEmployeeMessage() {
    if (yesRadio.checked) {
      employeeYesMessage.style.display = "block";
      employeeNoMessage.style.display = "none";
    } else if (noRadio.checked) {
      employeeYesMessage.style.display = "none";
      employeeNoMessage.style.display = "block";
    }
  }

  // Add event listeners to radio buttons
  yesRadio.addEventListener("change", toggleEmployeeMessage);
  noRadio.addEventListener("change", toggleEmployeeMessage);

  // Initial check to set the correct message visibility on page load
  toggleEmployeeMessage();
});

// show hide based on gst yes and no
document
  .querySelectorAll('input[name="soleTraderRegisterForGst"]')
  .forEach(function (radio) {
    radio.addEventListener("change", function () {
      const gstContent = document.getElementById(
        "soleTraderRegisterForGstContent"
      );

      if (this.value === "yes") {
        gstContent.style.display = "block";
      } else if (this.value === "no") {
        gstContent.style.display = "none";
      }
    });
  });

// show hide based on gst
document
  .querySelectorAll('input[name="soleTraderRegisterForGst"]')
  .forEach(function (radio) {
    radio.addEventListener("change", function () {
      const softwareDetailsExcelSummaryContent = document.getElementById(
        "soleTraderRegisterForGstSoftwareDetailsExcelSummaryContent"
      );
      const myOwnNumberContent = document.getElementById(
        "soleTraderRegisterForGstMyOwnNumberContent"
      );

      if (
        this.value === "soleTraderRegisterForGstSoftwareDetailsExcelSummary"
      ) {
        softwareDetailsExcelSummaryContent.style.display = "block";
        myOwnNumberContent.style.display = "none";
      } else if (this.value === "soleTraderRegisterForGstMyOwnNumber") {
        myOwnNumberContent.style.display = "block";
        softwareDetailsExcelSummaryContent.style.display = "none";
      }
    });
  });
// show hide based on gst end

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the index for other income rows
  let otherIncomeIndex = 1;

  // Get the table body element where rows will be added/removed
  const otherIncomeTableBody = document.getElementById("otherIncomeTableBody");

  // Get the button element that adds a new row
  const addOtherIncomeRowButton = document.getElementById(
    "add-other-income-row"
  );

  // Function to add a new row to the table
  function addOtherIncomeRow() {
    // Create a new table row element
    const newRow = document.createElement("tr");

    // Set the inner HTML of the new row with the correct index values for name attributes
    newRow.innerHTML = `
      <td>
        <textarea rows="1" class="form-control mb-0" name="otherIncomeDetails[${otherIncomeIndex}]"></textarea>
      </td>
      <td>
        <input id="otherIncomeAmount" type="number" name="otherIncomeAmount[${otherIncomeIndex}]" class="form-control">
      </td>
      <td>
        <button class="my-auto remove-other-income btn btn-sm btn-danger">remove</button>
      </td>
    `;

    // Append the new row to the table body
    otherIncomeTableBody.appendChild(newRow);

    // Add event listener for the remove button in the new row
    newRow
      .querySelector(".remove-other-income")
      .addEventListener("click", function () {
        removeOtherIncomeRow(newRow);
      });

    // Increment the index for the next row
    otherIncomeIndex++;
  }

  // Function to remove a row from the table
  function removeOtherIncomeRow(row) {
    // Remove the specified row from the table body
    otherIncomeTableBody.removeChild(row);

    // Optionally, you can update the otherIncomeIndex or leave it as is to avoid re-indexing
    // updateRowIndexes();
  }

  // Add event listener to the "Add" button to add a new row when clicked
  addOtherIncomeRowButton.addEventListener("click", addOtherIncomeRow);

  // Initialize event listeners for existing remove buttons
  document.querySelectorAll(".remove-other-income").forEach((button) => {
    button.addEventListener("click", function () {
      removeOtherIncomeRow(button.closest("tr"));
    });
  });
});

// This script listens for changes in the radio buttons asking if the user had an Employee Share/Option Scheme.
// If "Yes" is selected, the fields for employer name, amount, and attachment are shown.
// If "No" is selected, these fields remain hidden.

document.addEventListener("DOMContentLoaded", function () {
  const yesRadio = document.getElementById("employeeShareOptionSchemeYes");
  const noRadio = document.getElementById("employeeShareOptionSchemeNo");
  const detailsSection = document.getElementById(
    "employeeShareOptionSchemeDetails"
  );

  // Function to toggle visibility of the details section
  function toggleDetailsSection() {
    if (yesRadio.checked) {
      detailsSection.style.display = "block";
    } else if (noRadio.checked) {
      detailsSection.style.display = "none";
    }
  }

  // Add event listeners to radio buttons
  yesRadio.addEventListener("change", toggleDetailsSection);
  noRadio.addEventListener("change", toggleDetailsSection);

  // Initial check to set the correct visibility on page load
  toggleDetailsSection();
});

// This script listens for changes in the radio buttons asking if the user received any Other Income.
// If "Yes" is selected, the input fields for other income details are shown.
// If "No" is selected, the input fields remain hidden.

document.addEventListener("DOMContentLoaded", function () {
  const yesRadio = document.getElementById("otherIncomeYes");
  const noRadio = document.getElementById("otherIncomeNo");
  const otherIncomeInputs = document.getElementById("othherIncomeInputs");

  // Function to toggle visibility of the other income inputs section
  function toggleOtherIncomeInputs() {
    if (yesRadio.checked) {
      otherIncomeInputs.style.display = "block";
    } else if (noRadio.checked) {
      otherIncomeInputs.style.display = "none";
    }
  }

  // Add event listeners to radio buttons
  yesRadio.addEventListener("change", toggleOtherIncomeInputs);
  noRadio.addEventListener("change", toggleOtherIncomeInputs);

  // Initial check to set the correct visibility on page load
  toggleOtherIncomeInputs();
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

// This script listens for changes in the radio buttons asking about income from managed funds, trusts, and partnerships
// If "Yes" is selected, the manageTrustFundsDetails section is shown.
// If "No" is selected, the manageTrustFundsDetails section is hidden.

document.addEventListener("DOMContentLoaded", function () {
  // Select radio buttons and the section to show/hide
  const manageTrustFundsYes = document.getElementById("manageTrustFundsYes");
  const manageTrustFundsNo = document.getElementById("manageTrustFundsNo");
  const manageTrustFundsDetails = document.getElementById(
    "manageTrustFundsDetails"
  );

  // Function to toggle visibility of the manageTrustFundsDetails section
  function toggleManageTrustFundsDetails() {
    if (manageTrustFundsYes.checked) {
      manageTrustFundsDetails.style.display = "block";
    } else {
      manageTrustFundsDetails.style.display = "none";
    }
  }

  // Initialize the visibility based on the initial selection
  toggleManageTrustFundsDetails();

  // Add event listeners to radio buttons to handle changes
  manageTrustFundsYes.addEventListener("change", toggleManageTrustFundsDetails);
  manageTrustFundsNo.addEventListener("change", toggleManageTrustFundsDetails);
});

// show and hide capital gain fields
document.addEventListener("DOMContentLoaded", function () {
  // Function to toggle visibility of asset details and file upload
  function toggleAssetDetails() {
    const sellAssetYes = document.getElementById("sellAssetYes");
    const assetDetailsContainer = document.getElementById(
      "assetDetailsContainer"
    );

    if (sellAssetYes.checked) {
      assetDetailsContainer.style.display = "block";
    } else {
      assetDetailsContainer.style.display = "none";
    }
  }

  // Add event listeners to radio buttons
  document
    .getElementById("sellAssetYes")
    .addEventListener("change", toggleAssetDetails);
  document
    .getElementById("sellAssetNo")
    .addEventListener("change", toggleAssetDetails);

  // Initialize the form with the correct visibility state
  toggleAssetDetails();
});
// show and hide capital gain fields end

// This script listens for changes in the radio buttons asking about receiving foreign income
// If "Yes" is selected, the foreignIncomeDetailsContainer section is shown.
// If "No" is selected, the foreignIncomeDetailsContainer section is hidden.

document.addEventListener("DOMContentLoaded", function () {
  // Select radio buttons and the section to show/hide
  const foreignIncomeYes = document.getElementById("foreignIncomeYes");
  const foreignIncomeNo = document.getElementById("foreignIncomeNo");
  const foreignIncomeDetailsContainer = document.getElementById(
    "foreignIncomeDetailsContainer"
  );

  // Function to toggle visibility of the foreignIncomeDetailsContainer section
  function toggleForeignIncomeDetails() {
    if (foreignIncomeYes.checked) {
      foreignIncomeDetailsContainer.style.display = "block";
    } else {
      foreignIncomeDetailsContainer.style.display = "none";
    }
  }

  // Initialize the visibility based on the initial selection
  toggleForeignIncomeDetails();

  // Add event listeners to radio buttons to handle changes
  foreignIncomeYes.addEventListener("change", toggleForeignIncomeDetails);
  foreignIncomeNo.addEventListener("change", toggleForeignIncomeDetails);
});

// This script manages the visibility of the assetsOver50000Details section
// If "Yes" is selected, the section is shown.
// If "No" is selected, the section is hidden.

document.addEventListener("DOMContentLoaded", function () {
  // Select radio buttons and the section to show/hide
  const assetsOver50000Yes = document.getElementById("assetsOver50000Yes");
  const assetsOver50000No = document.getElementById("assetsOver50000No");
  const assetsOver50000Details = document.querySelector(
    ".assetsOver50000Details"
  );

  // Function to toggle visibility of the assetsOver50000Details section
  function toggleAssetsOver50000Details() {
    if (assetsOver50000Yes.checked) {
      assetsOver50000Details.style.display = "block";
    } else {
      assetsOver50000Details.style.display = "none";
    }
  }

  // Initialize the visibility based on the initial selection
  toggleAssetsOver50000Details();

  // Add event listeners to radio buttons to handle changes
  assetsOver50000Yes.addEventListener("change", toggleAssetsOver50000Details);
  assetsOver50000No.addEventListener("change", toggleAssetsOver50000Details);
});

// show and hide EMPLOYEE SHARE/OPTION SCHEME fields end
// document.addEventListener("DOMContentLoaded", function() {
//   // Function to toggle the display of the file input
//   function toggleBonusSharesDocuments() {
//     const bonusSharesOptionsYes = document.getElementById("bonusSharesOptionsYes");
//     const bonusSharesDocuments = document.getElementById("bonusSharesDocuments");

//     if (bonusSharesOptionsYes.checked) {
//       bonusSharesDocuments.style.display = "block";
//     } else {
//       bonusSharesDocuments.style.display = "none";
//     }
//   }

//   // Add event listeners to radio buttons
//   document.getElementById("bonusSharesOptionsYes").addEventListener("change", toggleBonusSharesDocuments);
//   document.getElementById("bonusSharesOptionsNo").addEventListener("change", toggleBonusSharesDocuments);

//   // Initialize the form with the correct visibility state
//   toggleBonusSharesDocuments();
// });

// show and hide EMPLOYEE SHARE/OPTION SCHEME fields end

// show and hide WORK UNIFORM fields
document.addEventListener("DOMContentLoaded", function () {
  // Function to toggle uniform details based on selection
  function toggleUniformDetails() {
    const workUniformYes = document.getElementById("workUniformYes");
    const uniformDetails = document.getElementById("uniformDetails");

    // Show or hide uniform details based on "Yes" selection
    if (workUniformYes.checked) {
      uniformDetails.classList.remove("d-none");
    } else {
      uniformDetails.classList.add("d-none");
    }
  }

  // Add event listeners to work uniform radio buttons
  document
    .getElementById("workUniformYes")
    .addEventListener("change", toggleUniformDetails);
  document
    .getElementById("workUniformNo")
    .addEventListener("change", toggleUniformDetails);

  // Initialize the form with the correct visibility state
  toggleUniformDetails();
});

// show and hide WORK UNIFORM fields end

// add remove multiple work uniform
let uniformExpensesRowIndex = 0;

document
  .getElementById("add-uniform-expense-row")
  .addEventListener("click", function () {
    let tableBody = document.getElementById("uniformTableBody");
    uniformExpensesRowIndex++;

    let newRow = document.createElement("tr");

    let detailsCell = document.createElement("td");
    let amountCell = document.createElement("td");
    let fileCell = document.createElement("td");
    let actionsCell = document.createElement("td");

    let detailsTextarea = document.createElement("textarea");
    let amountInput = document.createElement("input");
    let fileInput = document.createElement("input");

    detailsTextarea.rows = 1;
    detailsTextarea.className = "form-control mb-0";
    detailsTextarea.name = `uniformDetails[${uniformExpensesRowIndex}]`;

    amountInput.type = "number";
    amountInput.className = "form-control";
    amountInput.name = `workUniformAmount[${uniformExpensesRowIndex}]`;

    fileInput.type = "file";
    fileInput.className = "form-control";
    fileInput.name = `workUniformAttachFile[${uniformExpensesRowIndex}]`;

    detailsCell.appendChild(detailsTextarea);
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

    newRow.appendChild(detailsCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(fileCell);
    newRow.appendChild(actionsCell);

    tableBody.appendChild(newRow);
  });

// add remove multiple work uniform end

// show and hide internet fields
// document.addEventListener("DOMContentLoaded", function() {
//   const internetUseYes = document.getElementById("internetUseYes");
//   const internetUseNo = document.getElementById("internetUseNo");
//   const internetFields = document.getElementById("internetFields");

//   function toggleInternetFields() {
//     if (internetUseYes.checked) {
//       internetFields.style.display = "block";
//     } else {
//       internetFields.style.display = "none";
//     }
//   }

//   // Event listeners for radio buttons
//   internetUseYes.addEventListener("change", toggleInternetFields);
//   internetUseNo.addEventListener("change", toggleInternetFields);

//   // Initial check
//   toggleInternetFields();
// });

// show and hide internet fields end

// show and hide HOME OFFICE
document.addEventListener("DOMContentLoaded", function () {
  const homeOfficeExpensesYes = document.getElementById(
    "homeOfficeExpensesYes"
  );
  const homeOfficeExpensesNo = document.getElementById("homeOfficeExpensesNo");
  const homeOfficeOptions = document.getElementById("homeOfficeOptions");
  const fixedRateMethod = document.getElementById("fixedRateMethod");
  const actualCostMethod = document.getElementById("actualCostMethod");
  const fixedRateFields = document.getElementById("fixedRateFields");
  const actualCostFields = document.getElementById("actualCostFields");

  homeOfficeExpensesYes.addEventListener("change", function () {
    if (this.checked) {
      homeOfficeOptions.style.display = "block";
      const homeOfficeGuideModal = new bootstrap.Modal(
        document.getElementById("homeOfficeGuideModal")
      );
      homeOfficeGuideModal.show();
    }
  });

  homeOfficeExpensesNo.addEventListener("change", function () {
    if (this.checked) {
      homeOfficeOptions.style.display = "none";
      fixedRateFields.style.display = "none";
      actualCostFields.style.display = "none";
    }
  });

  fixedRateMethod.addEventListener("change", function () {
    if (this.checked) {
      fixedRateFields.style.display = "block";
      actualCostFields.style.display = "none";
    }
  });

  actualCostMethod.addEventListener("change", function () {
    if (this.checked) {
      fixedRateFields.style.display = "none";
      actualCostFields.style.display = "block";
      const actualCostModal = new bootstrap.Modal(
        document.getElementById("actualCostModal")
      );
      actualCostModal.show();
    }
  });

  function toggleFields(checkboxId, fieldsId) {
    const checkbox = document.getElementById(checkboxId);
    const fields = document.getElementById(fieldsId);

    checkbox.addEventListener("change", function () {
      if (this.checked) {
        fields.style.display = "block";
      } else {
        fields.style.display = "none";
      }
    });
  }

  document
    .getElementById("actualCostMethod")
    .addEventListener("change", function () {
      document.getElementById("actualCostFields").style.display = this.checked
        ? "block"
        : "none";
    });

  const checkboxes = document.querySelectorAll(
    "#actualCostFields .form-check-input"
  );
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const relatedFields =
        this.closest(".form-check").querySelector(".fields");
      relatedFields.style.display = this.checked ? "block" : "none";
    });
  });

  toggleFields("officeTableCheckbox", "officeTableFields");
  toggleFields("officeChairCheckbox", "officeChairFields");
  toggleFields("officeBookshelfCheckbox", "officeBookshelfFields");
  toggleFields("computerLaptopCheckbox", "computerLaptopFields");
  toggleFields("otherCheckbox", "otherFields");

  toggleFields("officeTableActualCheckbox", "officeTableActualFields");
  // Repeat for other checkboxes in the actual cost method
});

// This script listens for changes in the radio buttons asking about bank interest
// If "Yes" is selected, the interestReceivedDetails section is shown.
// If "No" is selected, the interestReceivedDetails section is hidden.

document.addEventListener("DOMContentLoaded", function () {
  // Select radio buttons and the section to show/hide
  const interestYes = document.getElementById("interestThisFinancialYearYes");
  const interestNo = document.getElementById("interestThisFinancialYearNo");
  const interestDetails = document.getElementById("interestReceivedDetails");

  // Function to toggle visibility of the interestReceivedDetails section
  function toggleInterestDetails() {
    if (interestYes.checked) {
      interestDetails.style.display = "block";
    } else {
      interestDetails.style.display = "none";
    }
  }

  // Initialize the visibility based on the initial selection
  toggleInterestDetails();

  // Add event listeners to radio buttons to handle changes
  interestYes.addEventListener("change", toggleInterestDetails);
  interestNo.addEventListener("change", toggleInterestDetails);
});

// This script manages the visibility of the interestRecievedOwnFigures section
// based on user selection for providing interest income details.

document.addEventListener("DOMContentLoaded", function () {
  // Select radio buttons and the section to show/hide
  const useATOPreFillReportForInterest = document.getElementById(
    "useATOPreFillReportForInterest"
  );
  const useMyOwnFiguresForInterest = document.getElementById(
    "useMyOwnFiguresForInterest"
  );
  const interestRecievedOwnFigures = document.getElementById(
    "interestRecievedOwnFigures"
  );

  // Function to toggle visibility of the interestRecievedOwnFigures section
  function toggleInterestRecievedOwnFigures() {
    if (useMyOwnFiguresForInterest.checked) {
      interestRecievedOwnFigures.style.display = "block";
    } else {
      interestRecievedOwnFigures.style.display = "none";
    }
  }

  // Initialize the visibility based on the initial selection
  toggleInterestRecievedOwnFigures();

  // Add event listeners to radio buttons to handle changes
  useATOPreFillReportForInterest.addEventListener(
    "change",
    toggleInterestRecievedOwnFigures
  );
  useMyOwnFiguresForInterest.addEventListener(
    "change",
    toggleInterestRecievedOwnFigures
  );
});

// interest receiverd
// Initialize index for additional rows
let interestReceivedRowIndex = 1; // Start index at 1 since there's already one row

document
  .getElementById("add-interest-row")
  .addEventListener("click", function () {
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
    let attachmentCell = document.createElement("td");
    let actionsCell = document.createElement("td"); // Cell for actions

    // Create input elements for each cell
    let bankNameInput = document.createElement("input");
    let accountNumberInput = document.createElement("input");
    let totalInterestInput = document.createElement("input");
    let tfnWithholdingInput = document.createElement("input");
    let jointAccountInput = document.createElement("input");
    let jointAccountLabel = document.createElement("label");
    let attachmentInput = document.createElement("input");

    // Set attributes for each input element
    bankNameInput.type = "text";
    bankNameInput.className = "form-control";
    bankNameInput.name = `interestReceivedBankName[${interestReceivedRowIndex}]`;

    accountNumberInput.type = "text";
    accountNumberInput.className = "form-control";
    accountNumberInput.name = `interestReceivedAccountNumber[${interestReceivedRowIndex}]`;

    totalInterestInput.type = "text";
    totalInterestInput.className = "form-control";
    totalInterestInput.name = `interestReceivedTotalInterest[${interestReceivedRowIndex}]`;

    tfnWithholdingInput.type = "text";
    tfnWithholdingInput.className = "form-control";
    tfnWithholdingInput.name = `interestReceivedTfnWithholding[${interestReceivedRowIndex}]`;

    jointAccountInput.type = "checkbox";
    jointAccountInput.className = "form-check-input";
    jointAccountInput.name = `interestReceivedJointAccount[${interestReceivedRowIndex}]`;
    jointAccountInput.id = `interestReceivedJointAccount[${interestReceivedRowIndex}]`;

    jointAccountLabel.setAttribute("for", jointAccountInput.id);
    jointAccountLabel.innerText = "Yes";

    attachmentInput.type = "file";
    attachmentInput.className = "form-control";
    attachmentInput.name = `interestReceivedAttachment[${interestReceivedRowIndex}]`;
    attachmentInput.id = `interestReceivedAttachment[${interestReceivedRowIndex}]`;

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
    attachmentCell.appendChild(attachmentInput);

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
    newRow.appendChild(attachmentCell);
    newRow.appendChild(actionsCell); // Append actions cell

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// interest receiverd end

// dividents

// This script listens for changes in the radio buttons asking about earning dividends
// If "Yes" is selected, the dividendEarnFinancialDetails section is shown.
// If "No" is selected, the dividendEarnFinancialDetails section is hidden.

document.addEventListener("DOMContentLoaded", function () {
  // Select radio buttons and the section to show/hide
  const dividendYes = document.getElementById("dividendEarnFinancialYearYes");
  const dividendNo = document.getElementById("dividendEarnFinancialYearNo");
  const dividendDetails = document.getElementById(
    "dividendEarnFinancialDetails"
  );

  // Function to toggle visibility of the dividendEarnFinancialDetails section
  function toggleDividendDetails() {
    if (dividendYes.checked) {
      dividendDetails.style.display = "block";
    } else {
      dividendDetails.style.display = "none";
    }
  }

  // Initialize the visibility based on the initial selection
  toggleDividendDetails();

  // Add event listeners to radio buttons to handle changes
  dividendYes.addEventListener("change", toggleDividendDetails);
  dividendNo.addEventListener("change", toggleDividendDetails);
});

// This script manages the visibility of the dividendRecievedOwnFigures section
// based on user selection for providing dividend income details.

document.addEventListener("DOMContentLoaded", function () {
  // Select radio buttons and the section to show/hide
  const useATOPreFillReportForDividend = document.getElementById(
    "useATOPreFillReportForDividend"
  );
  const useMyOwnFiguresForDividend = document.getElementById(
    "useMyOwnFiguresForDividend"
  );
  const dividendRecievedOwnFigures = document.getElementById(
    "dividendRecievedOwnFigures"
  );

  // Function to toggle visibility of the dividendRecievedOwnFigures section
  function toggleDividendRecievedOwnFigures() {
    if (useMyOwnFiguresForDividend.checked) {
      dividendRecievedOwnFigures.style.display = "block";
    } else {
      dividendRecievedOwnFigures.style.display = "none";
    }
  }

  // Initialize the visibility based on the initial selection
  toggleDividendRecievedOwnFigures();

  // Add event listeners to radio buttons to handle changes
  useATOPreFillReportForDividend.addEventListener(
    "change",
    toggleDividendRecievedOwnFigures
  );
  useMyOwnFiguresForDividend.addEventListener(
    "change",
    toggleDividendRecievedOwnFigures
  );
});

// Initialize index for additional rows
let dividendsRowIndex = 0;

document
  .getElementById("add-dividend-row")
  .addEventListener("click", function () {
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
    let attachmentCell = document.createElement("td");
    let actionsCell = document.createElement("td");

    // Create input elements for each cell
    let shareNameInput = document.createElement("input");
    let frankedDividendsInput = document.createElement("input");
    let unfrankedDividendsInput = document.createElement("input");
    let frankingCreditsInput = document.createElement("input");
    let attachmentInput = document.createElement("input");

    // Set attributes for each input element
    shareNameInput.type = "text";
    shareNameInput.className = "form-control";
    shareNameInput.name = `dividendsSharesName[${dividendsRowIndex}]`;

    frankedDividendsInput.type = "text";
    frankedDividendsInput.className = "form-control";
    frankedDividendsInput.name = `frankedDividends[${dividendsRowIndex}]`;

    unfrankedDividendsInput.type = "text";
    unfrankedDividendsInput.className = "form-control";
    unfrankedDividendsInput.name = `unfrankedDividends[${dividendsRowIndex}]`;

    frankingCreditsInput.type = "text";
    frankingCreditsInput.className = "form-control";
    frankingCreditsInput.name = `frankingCredits[${dividendsRowIndex}]`;

    attachmentInput.type = "file";
    attachmentInput.className = "form-control";
    attachmentInput.name = `dividendsAttachment[${dividendsRowIndex}]`;
    attachmentInput.id = `dividendsAttachment[${dividendsRowIndex}]`;

    // Append inputs to their respective cells
    shareNameCell.appendChild(shareNameInput);
    frankedDividendsCell.appendChild(frankedDividendsInput);
    unfrankedDividendsCell.appendChild(unfrankedDividendsInput);
    frankingCreditsCell.appendChild(frankingCreditsInput);
    attachmentCell.appendChild(attachmentInput);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className = "remove-btn btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "Remove";

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
    newRow.appendChild(attachmentCell);
    newRow.appendChild(actionsCell);

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// dividents end

// add remove other work relation expenses
document.addEventListener("DOMContentLoaded", function () {
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
      let detailsCell = document.createElement("td");
      let amountCell = document.createElement("td");
      let attachmentCell = document.createElement("td");
      let actionsCell = document.createElement("td");

      // Create input elements for each cell
      let detailsInput = document.createElement("textarea");
      let amountInput = document.createElement("input");
      let attachmentInput = document.createElement("input");

      // Set attributes for each input element
      detailsInput.rows = 1;
      detailsInput.className = "form-control mb-0";
      detailsInput.name = `expenseDetails[${otherWorkRelationExpenseRowIndex}]`;

      amountInput.type = "text";
      amountInput.className = "form-control";
      amountInput.name = `expenseAmount[${otherWorkRelationExpenseRowIndex}]`;

      attachmentInput.type = "file";
      attachmentInput.className = "form-control";
      attachmentInput.name = `expenseAttachment[${otherWorkRelationExpenseRowIndex}]`;

      // Append inputs to their respective cells
      detailsCell.appendChild(detailsInput);
      amountCell.appendChild(amountInput);
      attachmentCell.appendChild(attachmentInput);

      // Create remove button
      let removeButton = document.createElement("button");
      removeButton.className =
        "remove-otherWorkRelationexpense btn btn-danger btn-sm";
      removeButton.type = "button";
      removeButton.innerHTML = "Remove";

      // Add event listener to remove the row
      removeButton.addEventListener("click", function () {
        newRow.remove();
      });

      // Append remove button to actions cell
      actionsCell.appendChild(removeButton);

      // Append cells to the new row
      newRow.appendChild(detailsCell);
      newRow.appendChild(amountCell);
      newRow.appendChild(attachmentCell);
      newRow.appendChild(actionsCell);

      // Append the new row to the table body
      tableBody.appendChild(newRow);
    });

  // Function to handle the removal of an expense row
  document
    .getElementById("otherWorkRelationExpensesTableBody")
    ?.addEventListener("click", function (event) {
      if (
        event.target &&
        event.target.classList.contains("remove-otherWorkRelationexpense")
      ) {
        event.target.closest("tr").remove();
      }
    });
});
// add remove other work relation expenses end

// show hide gift and donations
document.addEventListener("DOMContentLoaded", function () {
  const giftsDonationsYes = document.getElementById("giftsDonationsYes");
  const giftsDonationsNo = document.getElementById("giftsDonationsNo");
  const giftsDonationsExpensesSection = document.getElementById(
    "giftsDonationsExpensesSection"
  );

  giftsDonationsYes.addEventListener("change", function () {
    if (this.checked) {
      giftsDonationsExpensesSection.style.display = "block";
    }
  });

  giftsDonationsNo.addEventListener("change", function () {
    if (this.checked) {
      giftsDonationsExpensesSection.style.display = "none";
    }
  });
});

// Function to add a new expense row for OTHER expenses
// Initialize index for additional rows
let otherExpenseRowIndex = 0;

// Function to add a new expense row
document
  .getElementById("addOtherExpenseButton")
  ?.addEventListener("click", function () {
    let tableBody = document.getElementById("otherExpensesTableBody");

    // Increment the row index
    otherExpenseRowIndex++;

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input elements
    let detailsCell = document.createElement("td");
    let amountCell = document.createElement("td");
    let attachmentCell = document.createElement("td");
    let actionsCell = document.createElement("td");

    // Create input elements for each cell
    let detailsInput = document.createElement("textarea");
    let amountInput = document.createElement("input");
    let attachmentInput = document.createElement("input");

    // Set attributes for each input element
    detailsInput.rows = "1";
    detailsInput.className = "form-control mb-0";
    detailsInput.name = `otherExpenseDetails[${otherExpenseRowIndex}]`;

    amountInput.type = "text";
    amountInput.className = "form-control";
    amountInput.name = `otherExpenseAmount[${otherExpenseRowIndex}]`;

    attachmentInput.type = "file";
    attachmentInput.className = "form-control";
    attachmentInput.name = `otherExpenseAttachment[${otherExpenseRowIndex}]`;

    // Append inputs to their respective cells
    detailsCell.appendChild(detailsInput);
    amountCell.appendChild(amountInput);
    attachmentCell.appendChild(attachmentInput);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className = "remove-other-expense btn btn-danger btn-sm";
    removeButton.type = "button";
    removeButton.innerHTML = "Remove";

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(detailsCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(attachmentCell);
    newRow.appendChild(actionsCell);

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// Function to handle the removal of an expense row
document
  .getElementById("otherExpensesTableBody")
  ?.addEventListener("click", function (event) {
    if (
      event.target &&
      event.target.classList.contains("remove-other-expense")
    ) {
      event.target.closest("tr").remove();
    }
  });
// Function to add a new expense row for OTHER expenses end

// Function to add a new expense row for GIFTS OR DONATIONS
// Initialize index for additional rows
let giftsDonationsExpenseRowIndex = 0;

// Function to add a new expense row
document
  .getElementById("addGiftsDonationsExpenseButton")
  ?.addEventListener("click", function () {
    let tableBody = document.getElementById("giftsDonationsExpensesTableBody");

    // Increment the row index
    giftsDonationsExpenseRowIndex++;

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input elements
    let detailsCell = document.createElement("td");
    let amountCell = document.createElement("td");
    let attachmentCell = document.createElement("td");
    let actionsCell = document.createElement("td");

    // Create input elements for each cell
    let detailsInput = document.createElement("textarea");
    let amountInput = document.createElement("input");
    let attachmentInput = document.createElement("input");

    // Set attributes for each input element
    detailsInput.rows = "1";
    detailsInput.className = "form-control mb-0";
    detailsInput.name = `giftsDonationsExpenseDetails[${giftsDonationsExpenseRowIndex}]`;

    amountInput.type = "text";
    amountInput.className = "form-control";
    amountInput.name = `giftsDonationsExpenseAmount[${giftsDonationsExpenseRowIndex}]`;

    attachmentInput.type = "file";
    attachmentInput.className = "form-control";
    attachmentInput.name = `giftsDonationsExpenseAttachment[${giftsDonationsExpenseRowIndex}]`;

    // Append inputs to their respective cells
    detailsCell.appendChild(detailsInput);
    amountCell.appendChild(amountInput);
    attachmentCell.appendChild(attachmentInput);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className =
      "remove-gifts-donations-expense btn btn-danger btn-sm";
    removeButton.type = "button";
    removeButton.innerHTML = "Remove";

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(detailsCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(attachmentCell);
    newRow.appendChild(actionsCell);

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// Function to handle the removal of an expense row
document
  .getElementById("giftsDonationsExpensesTableBody")
  ?.addEventListener("click", function (event) {
    if (
      event.target &&
      event.target.classList.contains("remove-gifts-donations-expense")
    ) {
      event.target.closest("tr").remove();
    }
  });

// Function to add a new expense row for GIFTS OR DONATIONS end

// show hide any other expenses
document
  .querySelectorAll('input[name="anyOtherExpensesRadio"]')
  .forEach((elem) => {
    elem.addEventListener("change", function (event) {
      const anyOtherExpensesFields = document.getElementById(
        "anyOtherExpensesFields"
      );
      if (event.target.value === "yes") {
        anyOtherExpensesFields.style.display = "block";
      } else {
        anyOtherExpensesFields.style.display = "none";
      }
    });
  });

// add delete row for any other expenses
let anyOtherExpenseRowIndex = 0;

document
  .getElementById("addAnyOtherExpenseButton")
  ?.addEventListener("click", function () {
    const tableBody = document.getElementById("anyOtherExpensesTableBody");

    // Increment the row index
    anyOtherExpenseRowIndex++;

    // Create a new row
    const newRow = document.createElement("tr");

    // Create the "Details" textarea
    const detailsCell = document.createElement("td");
    const detailsInput = document.createElement("textarea");
    detailsInput.rows = 1;
    detailsInput.className = "form-control mb-0";
    detailsInput.name = `anyOtherExpenseDetails[${anyOtherExpenseRowIndex}]`;
    detailsCell.appendChild(detailsInput);

    // Create the "Amount" input field
    const amountCell = document.createElement("td");
    const amountInput = document.createElement("input");
    amountInput.type = "text";
    amountInput.className = "form-control";
    amountInput.name = `anyOtherExpenseAmount[${anyOtherExpenseRowIndex}]`;
    amountCell.appendChild(amountInput);

    // Create the "Attachment" input field
    const attachmentCell = document.createElement("td");
    const attachmentInput = document.createElement("input");
    attachmentInput.type = "file";
    attachmentInput.className = "form-control";
    attachmentInput.name = `anyOtherExpenseAttachment[${anyOtherExpenseRowIndex}]`;
    attachmentCell.appendChild(attachmentInput);

    // Create the "Remove" button
    const actionCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-any-other-expense btn btn-danger btn-sm";
    removeButton.textContent = "Remove";
    actionCell.appendChild(removeButton);

    // Append all cells to the new row
    newRow.appendChild(detailsCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(attachmentCell);
    newRow.appendChild(actionCell);

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

// Use event delegation to handle the "Remove" button click
document
  .getElementById("anyOtherExpensesTableBody")
  ?.addEventListener("click", function (event) {
    if (
      event.target &&
      event.target.classList.contains("remove-any-other-expense")
    ) {
      event.target.closest("tr").remove();
    }
  });
// add delete row for any other expenses end

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

//  private health Insurance radio toggle notes
document.addEventListener("DOMContentLoaded", function () {
  // Select radio buttons and the paragraphs to show/hide
  const privateHealthInsuranceYes = document.getElementById(
    "privateHealthInsuranceYes"
  );
  const privateHealthInsuranceNo = document.getElementById(
    "privateHealthInsuranceNo"
  );
  const privateHealthInsuranceYesNote = document.getElementById(
    "privateHealthInsuranceYesNote"
  );
  const privateHealthInsuranceNoNote = document.getElementById(
    "privateHealthInsuranceNoNote"
  );

  // Function to toggle visibility of the notes based on selection
  function togglePrivateHealthInsuranceNote() {
    if (privateHealthInsuranceYes.checked) {
      privateHealthInsuranceYesNote.style.display = "block";
      privateHealthInsuranceNoNote.style.display = "none";
    } else if (privateHealthInsuranceNo.checked) {
      privateHealthInsuranceYesNote.style.display = "none";
      privateHealthInsuranceNoNote.style.display = "block";
    } else {
      privateHealthInsuranceYesNote.style.display = "none";
      privateHealthInsuranceNoNote.style.display = "none";
    }
  }

  // Initialize the visibility based on the initial selection
  togglePrivateHealthInsuranceNote();

  // Add event listeners to radio buttons to handle changes
  privateHealthInsuranceYes.addEventListener(
    "change",
    togglePrivateHealthInsuranceNote
  );
  privateHealthInsuranceNo.addEventListener(
    "change",
    togglePrivateHealthInsuranceNote
  );
});

//  private health Insurance radio toggle notes
document.addEventListener("DOMContentLoaded", function () {
  // Select the radio buttons and the note paragraph
  const allPrivateHealthInsuranceYes = document.getElementById(
    "allPrivateHealthInsuranceYes"
  );
  const allPrivateHealthInsuranceNo = document.getElementById(
    "allPrivateHealthInsuranceNo"
  );
  const allPrivateHealthInsuranceNoNote = document.getElementById(
    "allPrivateHealthInsuranceNoNote"
  );

  // Function to toggle visibility of the note based on selection
  function togglePrivateHealthInsuranceFamilyNote() {
    if (allPrivateHealthInsuranceNo.checked) {
      allPrivateHealthInsuranceNoNote.style.display = "block";
    } else {
      allPrivateHealthInsuranceNoNote.style.display = "none";
    }
  }

  // Initialize the visibility based on the initial selection
  togglePrivateHealthInsuranceFamilyNote();

  // Add event listeners to radio buttons to handle changes
  allPrivateHealthInsuranceYes.addEventListener(
    "change",
    togglePrivateHealthInsuranceFamilyNote
  );
  allPrivateHealthInsuranceNo.addEventListener(
    "change",
    togglePrivateHealthInsuranceFamilyNote
  );
});

// tax offset for spouse
document.addEventListener("DOMContentLoaded", function () {
  // Elements for spouse for the full year
  const spouseForYearYes = document.getElementById("spousePartnerForYearYes");
  const spouseForYearNo = document.getElementById("spousePartnerForYearNo");
  const spouseInputsYes = document.getElementById("spousePartnerInputsYes");
  const spouseInputsNo = document.getElementById("spousePartnerInputsNo");

  // Elements for spouse for part of the year
  const spouseForPartYearYes = document.getElementById(
    "spousePartnerForPartYearYes"
  );
  const spouseForPartYearNo = document.getElementById(
    "spousePartnerForPartYearNo"
  );
  const spousePartYearInputsYes = document.getElementById(
    "spousePartnerForPartYearInputsYes"
  );

  // Elements for Centrelink benefit details
  const centrelinkBenefitYes = document.getElementById(
    "spousePartnerCentrelinkBenefitYes"
  );
  const centrelinkBenefitNo = document.getElementById(
    "spousePartnerCentrelinkBenefitNo"
  );
  const centrelinkBenefitNA = document.getElementById(
    "spousePartnerCentrelinkBenefitNotApplicable"
  );
  const centrelinkBenefitDetails = document.getElementById(
    "spousePartnerCentrelinkBenefitDetails"
  );
  const centrelinkBenefitDetailsInputsYes = document.getElementById(
    "spousePartnerCentrelinkBenefitDetailsInputsYes"
  );

  // Show or hide spouse inputs based on full year selection
  function handleSpouseForYear() {
    if (spouseForYearYes.checked) {
      spouseInputsYes.style.display = "block";
      spouseInputsNo.style.display = "none";
      centrelinkBenefitDetails.style.display = "block";
    } else if (spouseForYearNo.checked) {
      spouseInputsYes.style.display = "none";
      spouseInputsNo.style.display = "block";
      handleSpouseForPartYear(); // Check the state of spouse for part year
    } else {
      spouseInputsYes.style.display = "none";
      spouseInputsNo.style.display = "none";
      centrelinkBenefitDetails.style.display = "none";
    }
  }

  // Show or hide part-year inputs based on part-year selection
  function handleSpouseForPartYear() {
    if (spouseForPartYearYes && spouseForPartYearYes.checked) {
      spousePartYearInputsYes.style.display = "block";
      centrelinkBenefitDetails.style.display = "block";
    } else {
      spousePartYearInputsYes.style.display = "none";
      centrelinkBenefitDetails.style.display = "none";
    }
  }

  // Show or hide Centrelink benefit details
  function handleCentrelinkBenefit() {
    if (centrelinkBenefitYes && centrelinkBenefitYes.checked) {
      centrelinkBenefitDetailsInputsYes.style.display = "block";
    } else {
      centrelinkBenefitDetailsInputsYes.style.display = "none";
    }
  }

  // Add event listeners
  if (spouseForYearYes)
    spouseForYearYes.addEventListener("change", handleSpouseForYear);
  if (spouseForYearNo)
    spouseForYearNo.addEventListener("change", handleSpouseForYear);
  if (spouseForPartYearYes)
    spouseForPartYearYes.addEventListener("change", handleSpouseForPartYear);
  if (spouseForPartYearNo)
    spouseForPartYearNo.addEventListener("change", handleSpouseForPartYear);
  if (centrelinkBenefitYes)
    centrelinkBenefitYes.addEventListener("change", handleCentrelinkBenefit);
  if (centrelinkBenefitNo)
    centrelinkBenefitNo.addEventListener("change", handleCentrelinkBenefit);
  if (centrelinkBenefitNA)
    centrelinkBenefitNA.addEventListener("change", handleCentrelinkBenefit);

  // Initialize form state based on current selections
  handleSpouseForYear();
  handleSpouseForPartYear();
  handleCentrelinkBenefit();
});

// for spouse partner
// document.addEventListener("DOMContentLoaded", function () {
//   const spousePartnerForYearYes = document.getElementById(
//     "spousePartnerForYearYes"
//   );
//   const spousePartnerForYearNo = document.getElementById(
//     "spousePartnerForYearNo"
//   );
//   const spousePartnerDetails = document.getElementById("spousePartnerDetails");
//   const separateInput = document.getElementById("separateInput");

//   // Initial check to set the display state
//   if (spousePartnerForYearYes.checked) {
//     spousePartnerDetails.style.display = "block";
//     separateInput.style.display = "none";
//   } else if (spousePartnerForYearNo.checked) {
//     spousePartnerDetails.style.display = "none";
//     separateInput.style.display = "block";
//   }

//   // Event listeners to update the display when a radio button is selected
//   spousePartnerForYearYes.addEventListener("change", function () {
//     spousePartnerDetails.style.display = "block";
//     separateInput.style.display = "none";
//   });

//   spousePartnerForYearNo.addEventListener("change", function () {
//     spousePartnerDetails.style.display = "none";
//     separateInput.style.display = "block";
//   });
// });

// Show/Hide Superannuation section based on user input
document
  .querySelectorAll('input[name="superannuationContributions"]')
  .forEach((elem) => {
    elem.addEventListener("change", function (event) {
      const superannuationSection = document.getElementById(
        "superannuationSection"
      );
      if (event.target.value === "yes") {
        superannuationSection.style.display = "block";
      } else {
        superannuationSection.style.display = "none";
      }
    });
  });

// Show/Hide Superannuation Spouse section based on user input
document
  .querySelectorAll('input[name="superannuationSpouseContributions"]')
  .forEach((elem) => {
    elem.addEventListener("change", function (event) {
      const superannuationSpouseSection = document.getElementById(
        "superannuationSpouseSection"
      );
      if (event.target.value === "yes") {
        superannuationSpouseSection.style.display = "block";
      } else {
        superannuationSpouseSection.style.display = "none";
      }
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

// This script listens for the "change" event on the "Urgent" radio button.
// If the "Urgent" option is selected, it triggers the Bootstrap modal to display.
document
  .getElementById("carForWorkYes")
  .addEventListener("change", function () {
    var urgentModal = new bootstrap.Modal(
      document.getElementById("motorVehicleModal")
    );
    if (this.checked) {
      urgentModal.show();
    } else {
      urgentModal.hide();
    }
  });

// add or show vehicle details
// Show/Hide fields based on selected method
document.addEventListener("DOMContentLoaded", function () {
  // Function to toggle method fields based on motor vehicle usage
  function toggleMethodFields() {
    const carForWorkYes = document.getElementById("carForWorkYes");
    const methodSelection = document.getElementById("methodSelection");
    const logBookFields = document.getElementById("logBookFields");
    const kilometresFields = document.getElementById("kilometresFields");

    // Show or hide method selection based on "Yes" selection
    if (carForWorkYes.checked) {
      methodSelection.classList.remove("d-none");
    } else {
      methodSelection.classList.add("d-none");
      logBookFields.classList.add("d-none");
      kilometresFields.classList.add("d-none");
    }
  }

  // Function to toggle fields based on calculation method selection
  function toggleCalculationFields() {
    const logBookMethod = document.getElementById("logBookMethod");
    const kilometresMethod = document.getElementById("kilometresMethod");
    const logBookFields = document.getElementById("logBookFields");
    const kilometresFields = document.getElementById("kilometresFields");

    // Show or hide fields based on selected method
    if (logBookMethod.checked) {
      logBookFields.classList.remove("d-none");
      kilometresFields.classList.add("d-none");
    } else if (kilometresMethod.checked) {
      logBookFields.classList.add("d-none");
      kilometresFields.classList.remove("d-none");
    } else {
      logBookFields.classList.add("d-none");
      kilometresFields.classList.add("d-none");
    }
  }

  // Add event listeners to motor vehicle usage radio buttons
  document
    .getElementById("carForWorkYes")
    .addEventListener("change", toggleMethodFields);
  document
    .getElementById("carForWorkNo")
    .addEventListener("change", toggleMethodFields);

  // Add event listeners to calculation method radio buttons
  document
    .getElementById("logBookMethod")
    .addEventListener("change", toggleCalculationFields);
  document
    .getElementById("kilometresMethod")
    .addEventListener("change", toggleCalculationFields);

  // Initialize the form with the correct visibility state
  toggleMethodFields();
  toggleCalculationFields();
});

// Add additional expenses rows for Log Book Method
let logbookExpensesRowIndex = 0;

document
  .getElementById("add-logBook-expense-row")
  .addEventListener("click", function () {
    let tableBody = document.getElementById("logBookTableBody");

    // Increment the row index
    logbookExpensesRowIndex++;

    // Create a new row
    let newRow = document.createElement("tr");

    // Define the cells with input elements
    let detailsCell = document.createElement("td");
    let amountCell = document.createElement("td");
    let fileCell = document.createElement("td");
    let actionsCell = document.createElement("td");

    // Create input elements for each cell
    let detailsInput = document.createElement("input");
    let amountInput = document.createElement("input");
    let fileInput = document.createElement("input");

    // Set attributes for each input element
    detailsInput.type = "text";
    detailsInput.className = "form-control";
    detailsInput.name = `logBookDetails[${logbookExpensesRowIndex}]`;

    amountInput.type = "text";
    amountInput.className = "form-control";
    amountInput.name = `logBookAmount[${logbookExpensesRowIndex}]`;

    fileInput.type = "file";
    fileInput.className = "form-control";
    fileInput.name = `logBookFile[${logbookExpensesRowIndex}]`;

    // Append inputs to their respective cells
    detailsCell.appendChild(detailsInput);
    amountCell.appendChild(amountInput);
    fileCell.appendChild(fileInput);

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.className = "remove-logBook-btn btn btn-sm btn-danger";
    removeButton.type = "button";
    removeButton.innerHTML = "Remove";

    // Add event listener to remove the row
    removeButton.addEventListener("click", function () {
      newRow.remove();
    });

    // Append remove button to actions cell
    actionsCell.appendChild(removeButton);

    // Append cells to the new row
    newRow.appendChild(detailsCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(fileCell);
    newRow.appendChild(actionsCell);

    // Append the new row to the table body
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

document.addEventListener("DOMContentLoaded", function () {
  // Elements for dependent children
  const dependentChildrenYes = document.getElementById("dependentChildrenYes");
  const dependentChildrenNo = document.getElementById("dependentChildrenNo");
  const dependentChildrenDetails = document.getElementById(
    "dependentChildrenDetails"
  );

  // Show or hide dependent children details
  function handleDependentChildren() {
    if (dependentChildrenYes && dependentChildrenYes.checked) {
      dependentChildrenDetails.style.display = "block";
    } else {
      dependentChildrenDetails.style.display = "none";
    }
  }

  // Add event listeners
  if (dependentChildrenYes)
    dependentChildrenYes.addEventListener("change", handleDependentChildren);
  if (dependentChildrenNo)
    dependentChildrenNo.addEventListener("change", handleDependentChildren);

  // Initialize form state based on current selections
  handleDependentChildren();
});

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

// self education start

// show hide self education
document.addEventListener("DOMContentLoaded", function () {
  const selfEducationYes = document.getElementById("selfEducationYes");
  const selfEducationNo = document.getElementById("selfEducationNo");
  const selfEducationFields = document.getElementById("selfEducationFields");

  selfEducationYes.addEventListener("change", function () {
    if (selfEducationYes.checked) {
      selfEducationFields.style.display = "block";
    }
  });

  selfEducationNo.addEventListener("change", function () {
    if (selfEducationNo.checked) {
      selfEducationFields.style.display = "none";
    }
  });
});
// show hide self education end

// add remove selfeducation row
document.addEventListener("DOMContentLoaded", function () {
  let selfEducationRowIndex = 0;

  document
    .getElementById("add-selfeducation-row")
    .addEventListener("click", function () {
      let tableBody = document.getElementById("selfEducationCoursesTableBody");

      // Increment the row index for each new entry
      selfEducationRowIndex++;

      // Create a new row
      let newRow = document.createElement("tr");

      // Create cells for each input field
      let courseNameCell = document.createElement("td");
      let institutionCell = document.createElement("td");
      let feesCell = document.createElement("td");
      let fileCell = document.createElement("td");
      let actionsCell = document.createElement("td");

      // Create input elements for each cell
      let courseNameInput = document.createElement("input");
      let institutionInput = document.createElement("input");
      let feesInput = document.createElement("input");
      let fileInput = document.createElement("input");

      // Set attributes for the course name input
      courseNameInput.type = "text";
      courseNameInput.className = "form-control";
      courseNameInput.name = `selfEducationCourseName[${selfEducationRowIndex}]`;

      // Set attributes for the institution input
      institutionInput.type = "text";
      institutionInput.className = "form-control";
      institutionInput.name = `selfEducationCourseInstitution[${selfEducationRowIndex}]`;

      // Set attributes for the fees input
      feesInput.type = "number";
      feesInput.className = "form-control";
      feesInput.name = `selfEducationCourseFees[${selfEducationRowIndex}]`;

      // Set attributes for the file input
      fileInput.type = "file";
      fileInput.className = "form-control";
      fileInput.name = `selfEducationCourseAttachment[${selfEducationRowIndex}]`;

      // Append input elements to their respective cells
      courseNameCell.appendChild(courseNameInput);
      institutionCell.appendChild(institutionInput);
      feesCell.appendChild(feesInput);
      fileCell.appendChild(fileInput);

      // Create the remove button
      let removeButton = document.createElement("button");
      removeButton.className =
        "btn btn-danger btn-sm removeSelfEducationCourse";
      removeButton.type = "button";
      removeButton.innerHTML = "Remove";

      // Add an event listener to the remove button
      removeButton.addEventListener("click", function () {
        newRow.remove();
      });

      // Append the remove button to the actions cell
      actionsCell.appendChild(removeButton);

      // Append all cells to the new row
      newRow.appendChild(courseNameCell);
      newRow.appendChild(institutionCell);
      newRow.appendChild(feesCell);
      newRow.appendChild(fileCell);
      newRow.appendChild(actionsCell);

      // Append the new row to the table body
      tableBody.appendChild(newRow);
    });

  // Initial setup for remove buttons on existing rows if any
  document.querySelectorAll(".removeSelfEducationCourse").forEach((button) => {
    button.addEventListener("click", function () {
      this.closest("tr").remove();
    });
  });
});

// add remove selfeducation row end

// show hide  hecs/help debt filed
document.addEventListener("DOMContentLoaded", function () {
  // Function to handle the toggle of the debt amount field
  function toggleDebtAmount() {
    const debtYes = document.getElementById("haveHecsDebtYes");
    const debtNo = document.getElementById("haveHecsDebtNo");
    const debtAmountField = document.querySelector(".hecs-debt-amount");

    // Show or hide the debt amount field based on selected radio button
    if (debtYes.checked) {
      debtAmountField.style.display = "block";
    } else {
      debtAmountField.style.display = "none";
    }
  }

  // Attach event listeners to radio buttons
  document.querySelectorAll(".hecs-debt-radio").forEach((radio) => {
    radio.addEventListener("change", toggleDebtAmount);
  });
});
// show hide  hecs/help debt filed end

// add remove self education expenses
document.addEventListener("DOMContentLoaded", function () {
  let selfEducationExpenseIndex = 0;

  // Function to add a new expense row
  document
    .querySelector(".addSelfEducationExpense")
    .addEventListener("click", function () {
      let tableBody = document.querySelector(
        ".selfeducation-expenses-table-body"
      );

      // Increment the row index
      selfEducationExpenseIndex++;

      // Create a new row
      let newRow = document.createElement("tr");

      // Define the cells with input elements
      let detailsCell = document.createElement("td");
      let amountCell = document.createElement("td");
      let attachmentCell = document.createElement("td");
      let actionsCell = document.createElement("td");

      // Create input elements for each cell
      let detailsInput = document.createElement("textarea");
      detailsInput.rows = 1;
      detailsInput.className = "form-control mb-0";
      detailsInput.name = `selfeducationExpenseDetails[${selfEducationExpenseIndex}]`;

      let amountInput = document.createElement("input");
      amountInput.type = "text";
      amountInput.className = "form-control";
      amountInput.name = `selfeducationExpenseAmount[${selfEducationExpenseIndex}]`;

      let attachmentInput = document.createElement("input");
      attachmentInput.type = "file";
      attachmentInput.className = "form-control";
      attachmentInput.name = `selfeducationExpenseFile[${selfEducationExpenseIndex}]`;

      // Append inputs to their respective cells
      detailsCell.appendChild(detailsInput);
      amountCell.appendChild(amountInput);
      attachmentCell.appendChild(attachmentInput);

      // Create remove button
      let removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className =
        "btn btn-danger btn-sm removeSelfEducationExpense";
      removeButton.textContent = "Remove";

      // Add event listener to remove the row
      removeButton.addEventListener("click", function () {
        newRow.remove();
      });

      // Append remove button to actions cell
      actionsCell.appendChild(removeButton);

      // Append cells to the new row
      newRow.appendChild(detailsCell);
      newRow.appendChild(amountCell);
      newRow.appendChild(attachmentCell);
      newRow.appendChild(actionsCell);

      // Append the new row to the table body
      tableBody.appendChild(newRow);
    });

  // Handle the removal of initial rows
  document.querySelectorAll(".removeSelfEducationExpense").forEach((button) => {
    button.addEventListener("click", function () {
      this.closest("tr").remove();
    });
  });
});
// add remove self education expenses end

//  home office expenses for self education show hide
document.addEventListener("DOMContentLoaded", function () {
  const homeOfficeYes = document.getElementById(
    "homeOfficeExpensesSelfEducationYes"
  );
  const homeOfficeNo = document.getElementById(
    "homeOfficeExpensesSelfEducationNo"
  );
  const homeOfficeOptions = document.getElementById(
    "selfEducationHomeOfficeOptions"
  );

  homeOfficeYes.addEventListener("change", function () {
    if (homeOfficeYes.checked) {
      homeOfficeOptions.style.display = "block";
    }
  });

  homeOfficeNo.addEventListener("change", function () {
    if (homeOfficeNo.checked) {
      homeOfficeOptions.style.display = "none";
    }
  });
});
//  home office expenses for self education show hide end

// show hide actual cost or fixedrate method for self education
document.addEventListener("DOMContentLoaded", function () {
  const fixedRateMethod = document.getElementById(
    "selfEducationFixedRateMethod"
  );
  const actualCostMethod = document.getElementById(
    "selfEducationActualCostMethod"
  );
  const fixedRateFields = document.getElementById(
    "selfEducationFixedRateFields"
  );
  const actualCostFields = document.getElementById(
    "selfEducationActualCostFields"
  );

  fixedRateMethod.addEventListener("change", function () {
    if (fixedRateMethod.checked) {
      fixedRateFields.style.display = "block";
      actualCostFields.style.display = "none";
    }
  });

  actualCostMethod.addEventListener("change", function () {
    if (actualCostMethod.checked) {
      fixedRateFields.style.display = "none";
      actualCostFields.style.display = "block";
    }
  });
});
// show hide actual cost or fixedrate method for self education end

// show hide actual cost fields based on checkboxes self education
document.addEventListener("DOMContentLoaded", function () {
  // Function to handle checkbox change events
  function handleCheckboxChange(event) {
    const checkboxId = event.target.id;
    const fieldsId = checkboxId.replace("Checkbox", "Fields");
    const fieldsContainer = document.getElementById(fieldsId);

    if (event.target.checked) {
      fieldsContainer.style.display = "block";
    } else {
      fieldsContainer.style.display = "none";
    }
  }

  // Get all checkboxes in the Actual Cost Method section
  const actualCostCheckboxes = document.querySelectorAll(
    "#selfEducationActualCostFields .form-check-input"
  );

  // Add event listeners to all checkboxes
  actualCostCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange);
  });
});
// show hide actual cost fields based on checkboxes self education end

// show hide fixed rate cost fields based on checkboxes self education
document.addEventListener("DOMContentLoaded", function () {
  // Function to handle checkbox change events
  function handleFixedRateCheckboxChange(event) {
    const checkboxId = event.target.id;
    const fieldsId = checkboxId.replace("Checkbox", "Fields");
    const fieldsContainer = document.getElementById(fieldsId);

    if (event.target.checked) {
      fieldsContainer.style.display = "block";
    } else {
      fieldsContainer.style.display = "none";
    }
  }

  // Get all checkboxes in the Fixed Rate Method section
  const fixedRateCheckboxes = document.querySelectorAll(
    "#selfEducationFixedRateAdditionalDeduction .form-check-input"
  );

  // Add event listeners to all checkboxes
  fixedRateCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleFixedRateCheckboxChange);
  });
});

// show hide fixed rate cost fields based on checkboxes self education end

// self education start end

// investment property start
document.addEventListener("DOMContentLoaded", function () {
  let propertyIndex = 0;
  const repairsMaintenanceCounter = {};
  const sundryRentalExpensesCounter = {};
  const jointlyOwnedCounter = {};
  const loanCounter = {};

  function addInvestmentProperty() {
    const template = document.getElementById("investmentPropertyTemplate").innerHTML;
    const sectionHTML = template.replace(/__INV_PROPERTY_INDEX__/g, propertyIndex);

    const newSection = document.createElement("div");
    newSection.className = "investment-property";
    newSection.innerHTML = sectionHTML;
    document.getElementById("investmentPropertiesContainer").appendChild(newSection);

    repairsMaintenanceCounter[propertyIndex] = 0;
    sundryRentalExpensesCounter[propertyIndex] = 0;
    jointlyOwnedCounter[propertyIndex] = 0;
    loanCounter[propertyIndex] = 0;

    setupSectionEventListeners(newSection);

    propertyIndex++;
  }

  function addRepairsMaintenanceExpense(section) {
    const tableBody = section.querySelector(".repairsMaintenanceTableBody");
    if (tableBody) {
      const indexMatch = section.querySelector(".toggle-fields").id.match(/\d+/);
      const propertyIndex = indexMatch ? parseInt(indexMatch[0], 10) : 0;

      const rowTemplate = document.getElementById("repairsMaintenanceRowTemplate").innerHTML;
      const rowIndex = repairsMaintenanceCounter[propertyIndex]++;
      const newRowHTML = rowTemplate
        .replace(/__INV_PROPERTY_INDEX__/g, propertyIndex)
        .replace(/__REPAIRS_MAINTENANCE_INDEX__/g, rowIndex);

      tableBody.insertAdjacentHTML("beforeend", newRowHTML);
    }
  }

  function removeRepairsMaintenanceExpense(button) {
    const row = button.closest("tr");
    if (row) {
      row.remove();
    }
  }

  function addSundryRentalExpenseRow(section) {
    const tableBody = section.querySelector(".sundryRentalExpensesTableBody");
    if (tableBody) {
      const indexMatch = section.querySelector(".toggle-fields").id.match(/\d+/);
      const propertyIndex = indexMatch ? parseInt(indexMatch[0], 10) : 0;

      const rowTemplate = document.getElementById("sundryRentalExpensesRowTemplate").innerHTML;
      const rowIndex = sundryRentalExpensesCounter[propertyIndex]++;
      const newRowHTML = rowTemplate
        .replace(/__INV_PROPERTY_INDEX__/g, propertyIndex)
        .replace(/__SUNDRY_RENTAL_INDEX__/g, rowIndex);

      tableBody.insertAdjacentHTML("beforeend", newRowHTML);
    }
  }

  function removeSundryRentalExpenseRow(button) {
    const row = button.closest("tr");
    if (row) {
      row.remove();
    }
  }

  function addLoanRow(section) {
    const tableBody = section.querySelector("#interestOnLoansTableBody");
    if (tableBody) {
      const indexMatch = section.querySelector('[id^="addInvestmentPropertyLoanButton"]').id.match(/\d+/);
      const propertyIndex = indexMatch ? parseInt(indexMatch[0], 10) : 0;
  
      // Get the current loan index for this property
      const rowIndex = loanCounter[propertyIndex] || 0;
      loanCounter[propertyIndex] = rowIndex + 1; // Increment the counter
  
      // Get the template and replace placeholders with actual values
      const rowTemplate = document.getElementById("interestOnLoansTableRowTemplate").innerHTML;
      const newRowHTML = rowTemplate
        .replace(/__INV_PROPERTY_INDEX__/g, propertyIndex)
        .replace(/__INTERESY_ON_LOAN_INDEX__/g, rowIndex); // Correct placeholder
  
      // Insert the new row into the table
      tableBody.insertAdjacentHTML("beforeend", newRowHTML);
    }
  }
  

  function removeLoanRow(button) {
    const row = button.closest("tr");
    if (row) {
      row.remove();
    }
  }

  function removeInvestmentProperty(section) {
    section.remove();

    handleInvestmentPropertyVisibility();

    if (document.querySelectorAll(".investment-property").length === 0) {
      document.getElementById("investmentPropertyNo").checked = true;
      handleRadioChanges({
        target: document.getElementById("investmentPropertyNo"),
      });
    }
  }

  function handleInvestmentPropertyVisibility() {
    const addMorePropertiesButton = document.getElementById("addMoreProperties");
    const investmentPropertiesContainer = document.getElementById("investmentPropertiesContainer");

    addMorePropertiesButton.style.display =
      investmentPropertiesContainer.children.length > 0 ? "block" : "none";
  }

  function handleRadioChanges(event) {
    if (event.target.name === "investmentProperty") {
      const investmentPropertiesContainer = document.getElementById("investmentPropertiesContainer");
      const addMorePropertiesButton = document.getElementById("addMoreProperties");

      if (event.target.value === "yes") {
        investmentPropertiesContainer.style.display = "block";
        addMorePropertiesButton.style.display = "block";
      } else if (event.target.value === "no") {
        investmentPropertiesContainer.innerHTML = ""; // Clear all investment properties
        investmentPropertiesContainer.style.display = "none";
        addMorePropertiesButton.style.display = "none";
      }
    }
  }

  function handleJointlyOwnedFields(section, selectedValue) {
    const jointlyOwnedFields = section.querySelector('[id^="jointlyOwnInvestmentPropertyFields"]');
    if (jointlyOwnedFields) {
      jointlyOwnedFields.style.display = selectedValue === "yes" ? "block" : "none";
    }
  }

  function handleAnnualStatementFields(section, selectedValue) {
    const annualStatementFields = section.querySelector(`#propertyAgentsAnnualStatementFields`);
    const annualIncomeFields = section.querySelector(`#annualIncomeFields`);

    if (annualStatementFields && annualIncomeFields) {
      if (selectedValue === "yes") {
        annualStatementFields.style.display = "block";
        annualIncomeFields.style.display = "none";
      } else if (selectedValue === "no") {
        annualStatementFields.style.display = "none";
        annualIncomeFields.style.display = "block";
      } else {
        annualStatementFields.style.display = "none";
        annualIncomeFields.style.display = "none";
      }
    }
  }

  function setupSectionEventListeners(section) {
    const removeButton = section.querySelector(".remove-investment-property");
    if (removeButton) {
      removeButton.addEventListener("click", function () {
        removeInvestmentProperty(section);
      });
    }

    const addOwnerButton = section.querySelector('[id^="addOwnerButton"]');
    if (addOwnerButton) {
      addOwnerButton.addEventListener("click", function () {
        addJointlyOwner(section);
      });
    }

    const repairsMaintenanceCheck = section.querySelector(".toggle-fields");
    if (repairsMaintenanceCheck) {
      repairsMaintenanceCheck.addEventListener("change", function (event) {
        const expenseFields = section.querySelector(".expense-fields");
        expenseFields.style.display = event.target.checked ? "block" : "none";
      });
    }

    const addRepairsMaintenanceButton = section.querySelector(".add-repairs-maintenance-expenses");
    if (addRepairsMaintenanceButton) {
      addRepairsMaintenanceButton.addEventListener("click", function () {
        addRepairsMaintenanceExpense(section);
      });
    }

    const addSundryExpenseButton = section.querySelector(".add-sundry-rental-expenses");
    if (addSundryExpenseButton) {
      addSundryExpenseButton.addEventListener("click", function () {
        addSundryRentalExpenseRow(section);
      });
    }

    const addLoanButton = section.querySelector('[id^="addInvestmentPropertyLoanButton"]');
    if (addLoanButton) {
      addLoanButton.addEventListener("click", function () {
        addLoanRow(section);
      });
    }

    section.addEventListener("click", function (event) {
      if (event.target.classList.contains("remove-sundry-rental-expenses")) {
        removeSundryRentalExpenseRow(event.target);
      } else if (event.target.classList.contains("remove-repairs-maintenance-expenses")) {
        removeRepairsMaintenanceExpense(event.target);
      } else if (event.target.classList.contains("removeJointlyOwner")) {
        removeJointlyOwner(event.target);
      } else if (event.target.classList.contains("remove-loan")) {
        removeLoanRow(event.target);
      }
    });

    section.addEventListener("change", function (event) {
      if (event.target.name.startsWith("jointlyOwnInvestmentProperty")) {
        handleJointlyOwnedFields(section, event.target.value);
      } else if (event.target.name.startsWith("propertyAgentsAnnualStatement")) {
        handleAnnualStatementFields(section, event.target.value);
      }
    });
  }

  function addJointlyOwner(section) {
    const tableBody = section.querySelector('[id^="jointlyOwnInvestmentPropertyTableBody"]');
    if (tableBody) {
      const indexMatch = section.querySelector('[id^="jointlyOwnInvestmentPropertyFields"]').id.match(/\d+/);
      const propertyIndex = indexMatch ? parseInt(indexMatch[0], 10) : 0;

      const rowIndex = jointlyOwnedCounter[propertyIndex]++;
      const rowTemplate = document.getElementById("jointlyOwnInvestmentPropertyRowTemplate").innerHTML;
      const newRowHTML = rowTemplate
        .replace(/__INV_PROPERTY_INDEX__/g, propertyIndex)
        .replace(/__JOINTLY_OWN_PROPERTY_INDEX__/g, rowIndex);

      tableBody.insertAdjacentHTML("beforeend", newRowHTML);
    }
  }

  function removeJointlyOwner(button) {
    const row = button.closest("tr");
    if (row) {
      row.remove();
    }
  }

  document.querySelectorAll(".investment-property").forEach((section) => {
    const yesRadio = section.querySelector('input[value="yes"]');
    const noRadio = section.querySelector('input[value="no"]');

    if (yesRadio && yesRadio.checked) {
      handleAnnualStatementFields(section, "yes");
    } else if (noRadio && noRadio.checked) {
      handleAnnualStatementFields(section, "no");
    }

    setupSectionEventListeners(section);
  });

  handleInvestmentPropertyVisibility();

  document.addEventListener("change", function (event) {
    if (event.target.name === "investmentProperty") {
      handleRadioChanges(event);
    }
  });

  document.getElementById("addMoreProperties").addEventListener("click", addInvestmentProperty);
});


document.addEventListener("change", function () {
  // Function to handle the toggle of expense fields based on the checkbox state
  function handleCheckboxToggle(event) {
    const checkbox = event.target;
    const expenseFields = checkbox
      .closest(".form-check")
      .querySelector(".expense-fields");

    if (expenseFields) {
      expenseFields.style.display = checkbox.checked ? "block" : "none";
    }
  }

  // Attach the event listener to all checkboxes with the class 'toggle-fields'
  document
    .querySelectorAll(".investment-property-expenses .toggle-fields")
    .forEach((checkbox) => {
      checkbox.removeEventListener("change", handleCheckboxToggle);
      checkbox.addEventListener("change", handleCheckboxToggle);
      // Initialize the display state based on the checkbox's initial state
      handleCheckboxToggle({ target: checkbox });
    });
});

// investment property end

// sole trader
// Function to show/hide Sole Trader section based on radio button selection
function toggleSoleTraderSection() {
  const yesOption = document.getElementById("soleTraderYes");
  const noOption = document.getElementById("soleTraderNo");
  const soleTraderSection = document.getElementById("soleTraderSection");

  if (yesOption.checked) {
    soleTraderSection.style.display = "block";
  } else {
    soleTraderSection.style.display = "none";
  }
}

// Add event listeners to radio buttons
document
  .getElementById("soleTraderYes")
  .addEventListener("change", toggleSoleTraderSection);
document
  .getElementById("soleTraderNo")
  .addEventListener("change", toggleSoleTraderSection);

// JavaScript to toggle the display of expense fields
document.querySelectorAll(".form-check-input.toggle-fields").forEach((el) => {
  el.addEventListener("change", function () {
    const expenseFields =
      this.closest(".form-check").querySelector(".expense-fields");
    expenseFields.style.display = this.checked ? "block" : "none";
  });
});

// JavaScript for "Add More" buttons functionality
document.querySelectorAll(".add-more").forEach((button) => {
  button.addEventListener("click", function () {
    const container = this.closest(".expense-fields").querySelector(".row.g-3");
    const newRow = container.firstElementChild.cloneNode(true);
    container.appendChild(newRow);
  });
});

// Function to handle adding rows in the Sole Trader Income table
function addSoleTraderIncomeRow() {
  const tableBody = document.getElementById("soleTraderIncomeTableBody");
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const incomeTypeCell = document.createElement("td");
  const incomeTypeInput = document.createElement("input");
  incomeTypeInput.type = "text";
  incomeTypeInput.className = "form-control";
  incomeTypeInput.name = `soleTraderIncomeType[${rowCount}]`;
  incomeTypeCell.appendChild(incomeTypeInput);

  const incomeAmountCell = document.createElement("td");
  const incomeAmountInput = document.createElement("input");
  incomeAmountInput.type = "number";
  incomeAmountInput.className = "form-control";
  incomeAmountInput.name = `soleTraderIncomeAmount[${rowCount}]`;
  incomeAmountInput.placeholder = "Enter amount";
  incomeAmountCell.appendChild(incomeAmountInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `soleTraderIncomeAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-soleTraderIncome btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(incomeTypeCell);
  newRow.appendChild(incomeAmountCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of "Add Income" button
document
  .getElementById("addSoleTraderIncome")
  .addEventListener("click", addSoleTraderIncomeRow);

// Add event listeners for existing remove buttons on page load
document.querySelectorAll(".remove-soleTraderIncome").forEach((button) => {
  button.addEventListener("click", function () {
    const row = this.closest("tr");
    row.parentNode.removeChild(row);
  });
});

// Function to handle adding rows in the Accounting Fee table
function addAccountingFeeRow() {
  const tableBody = document.getElementById("accountingFeeTableBody");
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const detailsCell = document.createElement("td");
  const detailsInput = document.createElement("input");
  detailsInput.type = "text";
  detailsInput.className = "form-control";
  detailsInput.name = `accountingFeeDetails[${rowCount}]`;
  detailsCell.appendChild(detailsInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `accountingFeeAmount[${rowCount}]`;
  amountInput.placeholder = "Enter amount";
  amountCell.appendChild(amountInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `accountingFeeAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-accountingFee btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(detailsCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of "Add More" button
document
  .getElementById("addAccountingFee")
  .addEventListener("click", addAccountingFeeRow);

// Add event listeners for existing remove buttons on page load
document.querySelectorAll(".remove-accountingFee").forEach((button) => {
  button.addEventListener("click", function () {
    const row = this.closest("tr");
    row.parentNode.removeChild(row);
  });
});

// Function to handle adding rows in the Bookkeeping Fee table
function addBookkeepingFeeRow() {
  const tableBody = document.getElementById("bookkeepingFeeTableBody");
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const detailsCell = document.createElement("td");
  const detailsInput = document.createElement("input");
  detailsInput.type = "text";
  detailsInput.className = "form-control";
  detailsInput.name = `bookkeepingFeeDetails[${rowCount}]`;
  detailsCell.appendChild(detailsInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `bookkeepingFeeAmount[${rowCount}]`;
  amountInput.placeholder = "Enter amount";
  amountCell.appendChild(amountInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `bookkeepingFeeAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-bookkeepingFee btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(detailsCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of "Add More" button
document
  .getElementById("addBookkeepingFee")
  .addEventListener("click", addBookkeepingFeeRow);

// Add event listeners for existing remove buttons on page load
document.querySelectorAll(".remove-bookkeepingFee").forEach((button) => {
  button.addEventListener("click", function () {
    const row = this.closest("tr");
    row.parentNode.removeChild(row);
  });
});

// Function to handle adding rows in the Plant and Equipment table
function addPlantEquipmentRow() {
  const tableBody = document.getElementById("plantEquipmentTableBody");
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const detailsCell = document.createElement("td");
  const detailsInput = document.createElement("input");
  detailsInput.type = "text";
  detailsInput.className = "form-control";
  detailsInput.name = `plantEquipmentDetails[${rowCount}]`;
  detailsCell.appendChild(detailsInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `plantEquipmentAmount[${rowCount}]`;
  amountInput.placeholder = "Enter amount";
  amountCell.appendChild(amountInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `plantEquipmentAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-plantEquipment btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(detailsCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of "Add More" button
document
  .getElementById("addPlantEquipment")
  .addEventListener("click", addPlantEquipmentRow);

// Add event listeners for existing remove buttons on page load
document.querySelectorAll(".remove-plantEquipment").forEach((button) => {
  button.addEventListener("click", function () {
    const row = this.closest("tr");
    row.parentNode.removeChild(row);
  });
});

// Function to handle adding rows in the Equipment Lease table
function addEquipmentLeaseRow() {
  const tableBody = document.getElementById("equipmentLeaseTableBody");
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const detailsCell = document.createElement("td");
  const detailsInput = document.createElement("input");
  detailsInput.type = "text";
  detailsInput.className = "form-control";
  detailsInput.name = `equipmentLeaseDetails[${rowCount}]`;
  detailsCell.appendChild(detailsInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `equipmentLeaseAmount[${rowCount}]`;
  amountInput.placeholder = "Enter amount";
  amountCell.appendChild(amountInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `equipmentLeaseAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-equipmentLease btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(detailsCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of "Add More" button
document
  .getElementById("addequipmentLease")
  .addEventListener("click", addEquipmentLeaseRow);

// Add event listeners for existing remove buttons on page load
document.querySelectorAll(".remove-equipmentLease").forEach((button) => {
  button.addEventListener("click", function () {
    const row = this.closest("tr");
    row.parentNode.removeChild(row);
  });
});

// Function to handle adding rows in the Professional Membership Fee table
function addProfessionalMembershipFeeRow() {
  const tableBody = document.getElementById(
    "professionalMembershipFeeTableBody"
  );
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const detailsCell = document.createElement("td");
  const detailsInput = document.createElement("input");
  detailsInput.type = "text";
  detailsInput.className = "form-control";
  detailsInput.name = `professionalMembershipFeeDetails[${rowCount}]`;
  detailsCell.appendChild(detailsInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `professionalMembershipFeeAmount[${rowCount}]`;
  amountInput.placeholder = "Enter amount";
  amountCell.appendChild(amountInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `professionalMembershipFeeAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className =
    "remove-professionalMembershipFee btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(detailsCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of "Add More" button
document
  .getElementById("addProfessionalMembershipFee")
  .addEventListener("click", addProfessionalMembershipFeeRow);

// Add event listeners for existing remove buttons on page load
document
  .querySelectorAll(".remove-professionalMembershipFee")
  .forEach((button) => {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      row.parentNode.removeChild(row);
    });
  });

// Function to handle adding rows in the Public Liability Insurance table
function addPublicLiabilityInsuranceRow() {
  const tableBody = document.getElementById(
    "publicLiabilityInsuranceTableBody"
  );
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const detailsCell = document.createElement("td");
  const detailsInput = document.createElement("input");
  detailsInput.type = "text";
  detailsInput.className = "form-control";
  detailsInput.name = `publicLiabilityInsuranceDetails[${rowCount}]`;
  detailsCell.appendChild(detailsInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `publicLiabilityInsuranceAmount[${rowCount}]`;
  amountInput.placeholder = "Enter amount";
  amountCell.appendChild(amountInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `publicLiabilityInsuranceAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className =
    "remove-publicLiabilityInsurance btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(detailsCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of "Add More" button
document
  .getElementById("addPublicLiabilityInsurance")
  .addEventListener("click", addPublicLiabilityInsuranceRow);

// Add event listeners for existing remove buttons on page load
document
  .querySelectorAll(".remove-publicLiabilityInsurance")
  .forEach((button) => {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      row.parentNode.removeChild(row);
    });
  });

// Function to handle adding rows in the Professional Indemnity Insurance table
function addProfessionalIndemnityInsuranceRow() {
  const tableBody = document.getElementById(
    "professionalIndemnityInsuranceTableBody"
  );
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const detailsCell = document.createElement("td");
  const detailsInput = document.createElement("input");
  detailsInput.type = "text";
  detailsInput.className = "form-control";
  detailsInput.name = `professionalIndemnityInsuranceDetails[${rowCount}]`;
  detailsCell.appendChild(detailsInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `professionalIndemnityInsuranceAmount[${rowCount}]`;
  amountInput.placeholder = "Enter amount";
  amountCell.appendChild(amountInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `professionalIndemnityInsuranceAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className =
    "remove-professionalIndemnityInsurance btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(detailsCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of "Add More" button
document
  .getElementById("addProfessionalIndemnityInsurance")
  .addEventListener("click", addProfessionalIndemnityInsuranceRow);

// Add event listeners for existing remove buttons on page load
document
  .querySelectorAll(".remove-professionalIndemnityInsurance")
  .forEach((button) => {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      row.parentNode.removeChild(row);
    });
  });

// Function to handle adding rows in the Income Protection Insurance table
function addIncomeProtectionInsuranceRow() {
  const tableBody = document.getElementById(
    "incomeProtectionInsuranceTableBody"
  );
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const detailsCell = document.createElement("td");
  const detailsInput = document.createElement("input");
  detailsInput.type = "text";
  detailsInput.className = "form-control";
  detailsInput.name = `incomeProtectionInsuranceDetails[${rowCount}]`;
  detailsCell.appendChild(detailsInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `incomeProtectionInsuranceAmount[${rowCount}]`;
  amountInput.placeholder = "Enter amount";
  amountCell.appendChild(amountInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `incomeProtectionInsuranceAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className =
    "remove-incomeProtectionInsurance btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(detailsCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of "Add More" button
document
  .getElementById("addIncomeProtectionInsurance")
  .addEventListener("click", addIncomeProtectionInsuranceRow);

// Add event listeners for existing remove buttons on page load
document
  .querySelectorAll(".remove-incomeProtectionInsurance")
  .forEach((button) => {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      row.parentNode.removeChild(row);
    });
  });

// Function to handle adding rows in the Protective Items table
function addProtectiveItemsRow() {
  const tableBody = document.getElementById("protectiveItemsTableBody");
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const detailsCell = document.createElement("td");
  const detailsInput = document.createElement("input");
  detailsInput.type = "text";
  detailsInput.className = "form-control";
  detailsInput.name = `protectiveItemsDetails[${rowCount}]`;
  detailsCell.appendChild(detailsInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `protectiveItemsAmount[${rowCount}]`;
  amountInput.placeholder = "Enter amount";
  amountCell.appendChild(amountInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `protectiveItemsAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-protectiveItems btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(detailsCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of "Add More" button
document
  .getElementById("addProtectiveItems")
  .addEventListener("click", addProtectiveItemsRow);

// Add event listeners for existing remove buttons on page load
document.querySelectorAll(".remove-protectiveItems").forEach((button) => {
  button.addEventListener("click", function () {
    const row = this.closest("tr");
    row.parentNode.removeChild(row);
  });
});

// Function to handle adding rows in the National Travel Expenses table
function addNationalTravelExpensesRow() {
  const tableBody = document.getElementById("nationalTravelExpensesTableBody");
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const detailCell = document.createElement("td");
  const detailInput = document.createElement("input");
  detailInput.type = "text";
  detailInput.className = "form-control";
  detailInput.name = `nationalTravelExpenseDetail[${rowCount}]`;
  detailCell.appendChild(detailInput);

  const reasonCell = document.createElement("td");
  const reasonInput = document.createElement("input");
  reasonInput.type = "text";
  reasonInput.className = "form-control";
  reasonInput.name = `nationalTravelExpenseReason[${rowCount}]`;
  reasonCell.appendChild(reasonInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `nationalTravelExpenseAmount[${rowCount}]`;
  amountInput.placeholder = "Enter amount";
  amountCell.appendChild(amountInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `nationalTravelExpenseAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className =
    "remove-nationalTravelExpenses btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(detailCell);
  newRow.appendChild(reasonCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of "Add More" button
document
  .getElementById("addNationalTravelExpenses")
  .addEventListener("click", addNationalTravelExpensesRow);

// Add event listeners for existing remove buttons on page load
document
  .querySelectorAll(".remove-nationalTravelExpenses")
  .forEach((button) => {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      row.parentNode.removeChild(row);
    });
  });

// Function to handle adding rows in the International Travel table
function addInternationalTravelRow() {
  const tableBody = document.getElementById("internationalTravelTableBody");
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const detailCell = document.createElement("td");
  const detailInput = document.createElement("input");
  detailInput.type = "text";
  detailInput.className = "form-control";
  detailInput.name = `internationalTravelDetail[${rowCount}]`;
  detailCell.appendChild(detailInput);

  const reasonCell = document.createElement("td");
  const reasonInput = document.createElement("input");
  reasonInput.type = "text";
  reasonInput.className = "form-control";
  reasonInput.name = `internationalTravelReason[${rowCount}]`;
  reasonCell.appendChild(reasonInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `internationalTravelAmount[${rowCount}]`;
  amountInput.placeholder = "Enter amount";
  amountCell.appendChild(amountInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `internationalTravelAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-internationalTravel btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(detailCell);
  newRow.appendChild(reasonCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of "Add More" button
document
  .getElementById("addInternationalTravel")
  .addEventListener("click", addInternationalTravelRow);

// Add event listeners for existing remove buttons on page load
document.querySelectorAll(".remove-internationalTravel").forEach((button) => {
  button.addEventListener("click", function () {
    const row = this.closest("tr");
    row.parentNode.removeChild(row);
  });
});

// Function to handle adding rows in the Training, Self-Education and Travel table
function addTrainingSelfEducationTravelRow() {
  const tableBody = document.getElementById(
    "trainingSelfEducationTravelTableBody"
  );
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const nameCell = document.createElement("td");
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.className = "form-control";
  nameInput.name = `trainingSelfEducationTravelName[${rowCount}]`;
  nameCell.appendChild(nameInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `trainingSelfEducationTravelAmount[${rowCount}]`;
  amountCell.appendChild(amountInput);

  const dateCell = document.createElement("td");
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.className = "form-control";
  dateInput.name = `trainingSelfEducationTravelDate[${rowCount}]`;
  dateCell.appendChild(dateInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `trainingSelfEducationTravelAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className =
    "remove-trainingSelfEducationTravel btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(nameCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(dateCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of "Add More" button
document
  .getElementById("addtrainingSelfEducationTravel")
  .addEventListener("click", addTrainingSelfEducationTravelRow);

// Add event listeners for existing remove buttons on page load
document
  .querySelectorAll(".remove-trainingSelfEducationTravel")
  .forEach((button) => {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      row.parentNode.removeChild(row);
    });
  });

// Function to handle adding rows in the Contractor Fees table
function addContractorFeesRow() {
  const tableBody = document.getElementById("contractorFeesTableBody");
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const nameCell = document.createElement("td");
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.className = "form-control";
  nameInput.name = `contractorName[${rowCount}]`;
  nameCell.appendChild(nameInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `contractorAmount[${rowCount}]`;
  amountInput.placeholder = "Enter amount";
  amountCell.appendChild(amountInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-contractorFees btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(nameCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of "Add More" button
document
  .getElementById("addContractorFees")
  .addEventListener("click", addContractorFeesRow);

// Add event listeners for existing remove buttons on page load
document.querySelectorAll(".remove-contractorFees").forEach((button) => {
  button.addEventListener("click", function () {
    const row = this.closest("tr");
    row.parentNode.removeChild(row);
  });
});

// Function to handle adding rows in the Material Expenses table
function addMaterialExpensesRow() {
  const tableBody = document.getElementById("materialExpensesTableBody");
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const detailsCell = document.createElement("td");
  const detailsInput = document.createElement("input");
  detailsInput.type = "text";
  detailsInput.className = "form-control";
  detailsInput.name = `materialExpenseDetails[${rowCount}]`;
  detailsCell.appendChild(detailsInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `materialExpenseAmount[${rowCount}]`;
  amountInput.placeholder = "Enter amount";
  amountCell.appendChild(amountInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `materialExpenseAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-materialExpenses btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(detailsCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of "Add More" button
document
  .getElementById("addMaterialExpenses")
  .addEventListener("click", addMaterialExpensesRow);

// Add event listeners for existing remove buttons on page load
document.querySelectorAll(".remove-materialExpenses").forEach((button) => {
  button.addEventListener("click", function () {
    const row = this.closest("tr");
    row.parentNode.removeChild(row);
  });
});

// Function to handle adding rows in the Loan Interest table
function addLoanInterestRow() {
  const tableBody = document.getElementById("loanInterestTableBody");
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const detailsCell = document.createElement("td");
  const detailsInput = document.createElement("input");
  detailsInput.type = "text";
  detailsInput.className = "form-control";
  detailsInput.name = `loanInterestDetails[${rowCount}]`;
  detailsCell.appendChild(detailsInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `loanInterestAmount[${rowCount}]`;
  amountInput.placeholder = "Enter amount";
  amountCell.appendChild(amountInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `loanInterestAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-loanInterest btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(detailsCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of "Add More" button
document
  .getElementById("addLoanInterest")
  .addEventListener("click", addLoanInterestRow);

// Add event listeners for existing remove buttons on page load
document.querySelectorAll(".remove-loanInterest").forEach((button) => {
  button.addEventListener("click", function () {
    const row = this.closest("tr");
    row.parentNode.removeChild(row);
  });
});

// Function to handle adding rows in the Property Expenses table
function addPropertyExpensesRow() {
  const tableBody = document.getElementById("propertyExpensesTableBody");
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const detailsCell = document.createElement("td");
  const detailsInput = document.createElement("input");
  detailsInput.type = "text";
  detailsInput.className = "form-control";
  detailsInput.name = `propertyExpenseDetails[${rowCount}]`;
  detailsCell.appendChild(detailsInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `propertyExpenseAmount[${rowCount}]`;
  amountInput.placeholder = "Enter amount";
  amountCell.appendChild(amountInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `propertyExpenseAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-propertyExpenses btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(detailsCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of "Add More" button
document
  .getElementById("addPropertyExpenses")
  .addEventListener("click", addPropertyExpensesRow);

// Add event listeners for existing remove buttons on page load
document.querySelectorAll(".remove-propertyExpenses").forEach((button) => {
  button.addEventListener("click", function () {
    const row = this.closest("tr");
    row.parentNode.removeChild(row);
  });
});

// Function to handle adding rows in the Income from Other Sources table
function addIncomeOtherSourcesRow() {
  const tableBody = document.getElementById("incomeOtherSourcesTableBody");
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const sourceCell = document.createElement("td");
  const sourceInput = document.createElement("input");
  sourceInput.type = "text";
  sourceInput.className = "form-control";
  sourceInput.name = `incomeOtherSources[${rowCount}]`;
  sourceCell.appendChild(sourceInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `incomeOtherSourcesAmount[${rowCount}]`;
  amountInput.placeholder = "Enter amount";
  amountCell.appendChild(amountInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `incomeOtherSourcesAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-incomeOtherSources btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(sourceCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of the "Add More" button
document
  .getElementById("addIncomeOtherSources")
  .addEventListener("click", addIncomeOtherSourcesRow);

// Add event listeners for existing remove buttons on page load
document.querySelectorAll(".remove-incomeOtherSources").forEach((button) => {
  button.addEventListener("click", function () {
    const row = this.closest("tr");
    row.parentNode.removeChild(row);
  });
});

// Function to handle adding rows in the Investment Expenses table
function addInvestmentExpensesRow() {
  const tableBody = document.getElementById("investmentExpensesTableBody");
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const detailsCell = document.createElement("td");
  const detailsInput = document.createElement("input");
  detailsInput.type = "text";
  detailsInput.className = "form-control";
  detailsInput.name = `investmentExpenseDetails[${rowCount}]`;
  detailsCell.appendChild(detailsInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `investmentExpenseAmount[${rowCount}]`;
  amountInput.placeholder = "Enter amount";
  amountCell.appendChild(amountInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `investmentExpenseAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-investmentExpenses btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(detailsCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of the "Add More" button
document
  .getElementById("addInvestmentExpenses")
  .addEventListener("click", addInvestmentExpensesRow);

// Add event listeners for existing remove buttons on page load
document.querySelectorAll(".remove-investmentExpenses").forEach((button) => {
  button.addEventListener("click", function () {
    const row = this.closest("tr");
    row.parentNode.removeChild(row);
  });
});

// Function to handle adding rows in the Donations table
function addDonationsRow() {
  const tableBody = document.getElementById("donationsTableBody");
  const rowCount = tableBody.children.length;

  // Create a new row
  const newRow = document.createElement("tr");

  // Create and append each cell
  const detailsCell = document.createElement("td");
  const detailsInput = document.createElement("input");
  detailsInput.type = "text";
  detailsInput.className = "form-control";
  detailsInput.name = `donationDetails[${rowCount}]`;
  detailsCell.appendChild(detailsInput);

  const amountCell = document.createElement("td");
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.className = "form-control";
  amountInput.name = `donationAmount[${rowCount}]`;
  amountInput.placeholder = "Enter amount";
  amountCell.appendChild(amountInput);

  const attachmentCell = document.createElement("td");
  const attachmentInput = document.createElement("input");
  attachmentInput.type = "file";
  attachmentInput.className = "form-control";
  attachmentInput.name = `donationAttachment[${rowCount}]`;
  attachmentCell.appendChild(attachmentInput);

  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-donations btn btn-sm btn-danger";
  removeButton.textContent = "Remove";
  actionsCell.appendChild(removeButton);

  // Append cells to the new row
  newRow.appendChild(detailsCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(attachmentCell);
  newRow.appendChild(actionsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  removeButton.addEventListener("click", function () {
    tableBody.removeChild(newRow);
  });
}

// Function to handle the click event of the "Add More" button
document
  .getElementById("addDonations")
  .addEventListener("click", addDonationsRow);

// Add event listeners for existing remove buttons on page load
document.querySelectorAll(".remove-donations").forEach((button) => {
  button.addEventListener("click", function () {
    const row = this.closest("tr");
    row.parentNode.removeChild(row);
  });
});

// sole trader end
