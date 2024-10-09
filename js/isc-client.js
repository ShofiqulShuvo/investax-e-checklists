


// for client details start
document.addEventListener("DOMContentLoaded", function () {
  // Get the table body and count how many rows already exist
  const tableBody = document.getElementById("clientDetailsTableBody");
  let clientIndex = tableBody.getElementsByTagName("tr").length; // Dynamically set the index based on existing rows

  // Add event listener to the "Add +" button
  document.getElementById("add-client-row").addEventListener("click", function () {
    // Create a new table row
    const newRow = document.createElement("tr");

    // Add input fields to the new row (using template literals for each column)
    newRow.innerHTML = `
      <td>
        <input type="text" class="form-control" name="title[${clientIndex}]" />
      </td>
      <td>
        <input type="text" class="form-control" name="firstName[${clientIndex}]" />
      </td>
      <td>
        <input type="text" class="form-control" name="surname[${clientIndex}]" />
      </td>
      <td>
        <input type="number" class="form-control" name="age[${clientIndex}]" />
      </td>
      <td>
        <select class="form-control" name="sex[${clientIndex}]">
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
      </td>
      <td>
        <input type="text" class="form-control" name="relationship[${clientIndex}]" />
      </td>
      <td>
        <button
          class="remove-client-row-btn btn btn-sm btn-danger"
          type="button"
        >
          Remove
        </button>
      </td>
    `;

    // Append the new row to the table body
    tableBody.appendChild(newRow);

    // Increment the index for the next row
    clientIndex++;
  });

  // Add event listener for removing rows
  tableBody.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("remove-client-row-btn")) {
      e.target.closest("tr").remove();
    }
  });
});
// for client details end





// for address details
document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("addressDetailsTableBody");
  let addressIndex = tableBody.getElementsByTagName("tr").length; // Get the current number of rows

  // Function to reindex input fields after row removal
  function reindexAddressInputs() {
    const rows = tableBody.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
      const input = rows[i].querySelector('input[name^="address"]');
      input.setAttribute("name", `address[${i}]`);
    }
    addressIndex = rows.length; // Update the addressIndex to match the new number of rows
  }

  // Add new row
  document.getElementById("add-address-row").addEventListener("click", function () {
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
      <td>
        <input type="text" class="form-control" name="address[${addressIndex}]" />
      </td>
      <td>
        <button class="remove-address-row-btn btn btn-sm btn-danger" type="button">Remove</button>
      </td>
    `;

    // Append the new row to the table
    tableBody.appendChild(newRow);

    // Increment the index for the next row
    addressIndex++;
  });

  // Remove row and reindex
  tableBody.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("remove-address-row-btn")) {
      e.target.closest("tr").remove();
      reindexAddressInputs(); // Reindex the inputs after removal
    }
  });
});
// for address details end



// for contact details
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the index for new rows based on existing rows
  let contactIndex = document.querySelectorAll('#contactDetailsTableBody tr').length;

  // Function to reindex the inputs after row addition or removal
  function reindexContacts() {
    const rows = document.querySelectorAll('#contactDetailsTableBody tr');
    rows.forEach((row, index) => {
      const nameInput = row.querySelector('input[name^="name"]');
      const mobileInput = row.querySelector('input[name^="mobile"]');
      const emailInput = row.querySelector('input[name^="email"]');
      
      // Update name attributes to reflect the correct index
      nameInput.name = `name[${index}]`;
      mobileInput.name = `mobile[${index}]`;
      emailInput.name = `email[${index}]`;
    });
    // Update the contactIndex after reindexing
    contactIndex = rows.length;
  }

  // Function to add a new contact row
  function addContactRow() {
    // Create a new row element
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
      <td>
        <input type="text" class="form-control" name="name[${contactIndex}]" />
      </td>
      <td>
        <input type="tel" class="form-control" name="mobile[${contactIndex}]" />
      </td>
      <td>
        <input type="email" class="form-control" name="email[${contactIndex}]" />
      </td>
      <td>
        <button class="remove-contact-row-btn btn btn-sm btn-danger" type="button">Remove</button>
      </td>
    `;

    // Append the new row to the table body
    document.getElementById('contactDetailsTableBody').appendChild(newRow);
    
    // Increment the index for the next row and reindex
    contactIndex++;
    reindexContacts();
  }

  // Function to remove a contact row
  function removeContactRow(event) {
    // Remove the row containing the button that was clicked
    const row = event.target.closest('tr');
    if (row) {
      row.remove();
      reindexContacts(); // Reindex after removal
    }
  }

  // Event listener for adding new contact rows
  document.getElementById('add-contact-row').addEventListener('click', addContactRow);

  // Event delegation to handle row removal
  document.getElementById('contactDetailsTableBody').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-contact-row-btn')) {
      removeContactRow(event);
    }
  });
});
// for contact details end


// for Dependant Child’s Details
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the index for new rows based on existing rows
  let dependantChildIndex = document.querySelectorAll('#dependantChildDetailsTableBody tr').length;

  // Function to reindex the input fields after row addition/removal
  function reindexDependants() {
    const rows = document.querySelectorAll('#dependantChildDetailsTableBody tr');
    rows.forEach((row, index) => {
      const childNameInput = row.querySelector('input[name^="childName"]');
      const ageInput = row.querySelector('input[name^="age"]');
      const sexInput = row.querySelector('input[name^="sex"]');
      const livingAtHomeInput = row.querySelector('input[name^="livingAtHome"]');
      const salaryInput = row.querySelector('input[name^="salary"]');
      const commentsInput = row.querySelector('input[name^="comments"]');
      const livingAtHomeLabel = row.querySelector(`label[for^="livingAtHome"]`);
      
      // Update the name attributes to reflect the new index
      childNameInput.name = `childName[${index}]`;
      ageInput.name = `age[${index}]`;
      sexInput.name = `sex[${index}]`;
      livingAtHomeInput.name = `livingAtHome[${index}]`;
      livingAtHomeInput.id = `livingAtHome[${index}]`;
      livingAtHomeLabel.setAttribute('for', `livingAtHome[${index}]`);
      salaryInput.name = `salary[${index}]`;
      commentsInput.name = `comments[${index}]`;
    });
    // Update the dependantChildIndex
    dependantChildIndex = rows.length;
  }

  // Function to add a new dependant child row
  function addDependantChildRow() {
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
      <td>
        <input type="text" class="form-control" name="childName[${dependantChildIndex}]" />
      </td>
      <td>
        <input type="number" class="form-control" name="age[${dependantChildIndex}]" />
      </td>
      <td>
        <input type="text" class="form-control" name="sex[${dependantChildIndex}]" />
      </td>
      <td>
        <div class="d-flex justify-content-center align-items-center gap-1">
          <input type="checkbox" class="form-check-input" name="livingAtHome[${dependantChildIndex}]" id="livingAtHome[${dependantChildIndex}]" />
          <label for="livingAtHome[${dependantChildIndex}]">Yes</label>
        </div>
      </td>
      <td>
        <input type="number" class="form-control" name="salary[${dependantChildIndex}]" />
      </td>
      <td>
        <input type="text" class="form-control" name="comments[${dependantChildIndex}]" />
      </td>
      <td>
        <button class="remove-dependant-child-row-btn btn btn-sm btn-danger" type="button">Remove</button>
      </td>
    `;

    // Append the new row to the table body
    document.getElementById('dependantChildDetailsTableBody').appendChild(newRow);
    
    // Increment the index for the next row and reindex
    dependantChildIndex++;
    reindexDependants();
  }

  // Function to remove a dependant child row
  function removeDependantChildRow(event) {
    const row = event.target.closest('tr');
    if (row) {
      row.remove();
      reindexDependants(); // Reindex after removal
    }
  }

  // Event listener for adding new dependant child rows
  document.getElementById('add-dependant-child-row').addEventListener('click', addDependantChildRow);

  // Event delegation to handle row removal
  document.getElementById('dependantChildDetailsTableBody').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-dependant-child-row-btn')) {
      removeDependantChildRow(event);
    }
  });
});
// for Dependant Child’s Details end


// show/hide reffered person details input
document.addEventListener("DOMContentLoaded", function () {
  // Get the elements
  const referredRadio = document.getElementById("hear-about-reffered");
  const referredPersonSection = document.getElementById("refered-person-section");
  const hearAboutRadios = document.querySelectorAll("input[name='hear-about']");

  // Event listener for all radio buttons
  hearAboutRadios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (referredRadio.checked) {
        referredPersonSection.classList.remove("d-none");
      } else {
        referredPersonSection.classList.add("d-none");
      }
    });
  });
});
// show/hide reffered person details input end



// for show hide and add remove about employment 
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the index for new rows based on existing rows
  let employmentIndex = document.querySelectorAll('#employment-details tr').length;

  // Show or hide employment details based on employment status
  const employmentDetailsContainer = document.getElementById("employment-details-container");
  const employedYes = document.getElementById("areEmployedYes");
  const employedNo = document.getElementById("areEmployedNo");

  // Function to toggle the employment details section visibility
  function toggleEmploymentDetails() {
      if (employedYes.checked) {
          employmentDetailsContainer.classList.remove("d-none");
      } else {
          employmentDetailsContainer.classList.add("d-none");
      }
  }

  // Add event listeners to the radio buttons
  employedYes.addEventListener("change", toggleEmploymentDetails);
  employedNo.addEventListener("change", toggleEmploymentDetails);

  // Function to add a new employment row
  function addEmploymentRow() {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
          <td>
              <input type="text" class="form-control" name="clientName[${employmentIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="jobDescription[${employmentIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="salary[${employmentIndex}]" placeholder="$000" />
          </td>
          <td>
              <input type="text" class="form-control" name="bonuses[${employmentIndex}]" placeholder="$000" />
          </td>
          <td>
              <input type="text" class="form-control" name="superContributions[${employmentIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="comments[${employmentIndex}]" />
          </td>
          <td>
              <button class="remove-employment-row-btn btn btn-sm btn-danger" type="button">remove</button>
          </td>
      `;
      document.getElementById('employment-details').appendChild(newRow);
      employmentIndex++;
  }

  // Function to remove an employment row
  function removeEmploymentRow(event) {
      const row = event.target.closest('tr');
      if (row) {
          row.remove();
      }
  }

  // Event listener for adding new employment rows
  document.getElementById('add-employment-row').addEventListener('click', addEmploymentRow);

  // Event delegation to handle row removal
  document.getElementById('employment-details').addEventListener('click', function(event) {
      if (event.target.classList.contains('remove-employment-row-btn')) {
          removeEmploymentRow(event);
      }
  });
});
// for show hide and add remove about employment end


// for show hide and add remove about business
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the index for new rows based on existing rows
  let businessIndex = document.querySelectorAll('#about-business tr').length;

  // Reference to the business details container and the radio buttons
  const businessDetailsContainer = document.getElementById("business-details-container");
  const operateBusinessYes = document.getElementById("operateBusinessYes");
  const operateBusinessNo = document.getElementById("operateBusinessNo");

  // Function to toggle the business details section visibility
  function toggleBusinessDetails() {
    if (operateBusinessYes.checked) {
      businessDetailsContainer.classList.remove("d-none");
    } else {
      businessDetailsContainer.classList.add("d-none");
    }
  }

  // Add event listeners to the radio buttons to show/hide business details
  operateBusinessYes.addEventListener("change", toggleBusinessDetails);
  operateBusinessNo.addEventListener("change", toggleBusinessDetails);

  // Function to add a new business row
  function addBusinessRow() {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td><input type="text" class="form-control" name="businessName[${businessIndex}]" /></td>
      <td><input type="text" class="form-control" name="description[${businessIndex}]" /></td>
      <td><input type="text" class="form-control" name="corporateStructure[${businessIndex}]" /></td>
      <td><input type="text" class="form-control" name="ownershipDetails[${businessIndex}]" /></td>
      <td><input type="text" class="form-control" name="turnover[${businessIndex}]" placeholder="$000" /></td>
      <td><input type="text" class="form-control" name="businessAssets[${businessIndex}]" /></td>
      <td><input type="text" class="form-control" name="valueOfBusinessAssets[${businessIndex}]" placeholder="$000" /></td>
      <td><input type="text" class="form-control" name="numOfEmployees[${businessIndex}]" /></td>
      <td><input type="text" class="form-control" name="dateStarted[${businessIndex}]" /></td>
      <td><button class="remove-business-row-btn btn btn-sm btn-danger" type="button">remove</button></td>
    `;
    document.getElementById('about-business').appendChild(newRow);
    businessIndex++;
  }

  // Function to remove a business row
  function removeBusinessRow(event) {
    const row = event.target.closest('tr');
    if (row) {
      row.remove();
    }
  }

  // Event listener for adding new business rows
  document.querySelector('.add-business-row').addEventListener('click', addBusinessRow);

  // Event delegation to handle row removal
  document.getElementById('about-business').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-business-row-btn')) {
      removeBusinessRow(event);
    }
  });
});
// for show hide and add remove about business end



// for show hide and add remove property table 
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the index for new rows based on existing rows
  let propertyIndex = document.querySelectorAll('#property-details tr').length;

  // Function to toggle visibility of the property details container
  function togglePropertyDetails() {
    const propertyDetailsContainer = document.getElementById('property-details-container');
    const havePropertyYes = document.getElementById('havePropertyYes');

    // Show or hide the property details based on the selected radio button
    if (havePropertyYes.checked) {
      propertyDetailsContainer.style.display = 'block';
    } else {
      propertyDetailsContainer.style.display = 'none';
    }
  }

  // Function to add a new property row
  function addPropertyRow() {
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
      <td><input type="text" class="form-control" name="suburb[${propertyIndex}]" /></td>
      <td><input type="text" class="form-control" name="state[${propertyIndex}]" /></td>
      <td>
        <select class="form-select" name="ownershipDetails[${propertyIndex}]">
          <option value="100%-Owned-By-first-Client">100% Owned By first Client</option>
          <option value="100%-Owned-By-Second-Client">100% owned By Second Client</option>
          <option value="50-50-Partnership">50-50 Partnership</option>
          <option value="Partnership-between-Unrelated-Parties">Partnership between Unrelated Parties</option>
        </select>
      </td>
      <td>
        <select class="form-select" name="propertyType[${propertyIndex}]">
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Town-House">Town House</option>
          <option value="Land">Land</option>
          <option value="Commercial-Property">Commercial Property</option>
          <option value="Other">Other</option>
        </select>
      </td>
      <td><input type="text" class="form-control" name="dateOfPurchase[${propertyIndex}]" /></td>
      <td><input type="text" class="form-control" name="purchasePrice[${propertyIndex}]" /></td>
      <td><input type="text" class="form-control" name="currentMarketValue[${propertyIndex}]" /></td>
      <td><input type="text" class="form-control" name="debt[${propertyIndex}]" /></td>
      <td><input type="text" class="form-control" name="lenderName[${propertyIndex}]" /></td>
      <td><input type="text" class="form-control" name="weeklyRentalIncome[${propertyIndex}]" /></td>
      <td>
        <select class="form-select" name="depreciationReportAvailable[${propertyIndex}]">
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </td>
      <td>
        <select class="form-select" name="livedInProperty[${propertyIndex}]">
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </td>
      <td><button class="remove-property-row-btn btn btn-sm btn-danger" type="button">remove</button></td>
    `;

    // Append the new row to the table body
    document.getElementById('property-details').appendChild(newRow);

    // Increment the index for the next row
    propertyIndex++;
  }

  // Function to remove a property row
  function removePropertyRow(event) {
    const row = event.target.closest('tr');
    if (row) {
      row.remove();
    }
  }

  // Event listener for adding new property rows
  document.querySelector('.add-property-row').addEventListener('click', addPropertyRow);

  // Event delegation to handle row removal
  document.getElementById('property-details').addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-property-row-btn')) {
      removePropertyRow(event);
    }
  });

  // Event listeners for show/hide functionality
  document.querySelectorAll('input[name="haveProperty"]').forEach((radio) => {
    radio.addEventListener('change', togglePropertyDetails);
  });
});
// for show hide and add remove property table end



// for show hide and add remove trust property table
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the index for new trust property rows based on existing rows
  let trustPropertyIndex = document.querySelectorAll('#trust-property-details tr').length;

  // Function to add a new trust property row
  function addTrustPropertyRow() {
      // Create a new row element
      const newRow = document.createElement('tr');

      newRow.innerHTML = `
          <td>
              <input type="text" class="form-control" name="nameTheTrust[${trustPropertyIndex}]" />
          </td>
          <td>
              <select class="form-select" name="typeTrust[${trustPropertyIndex}]">
                  <option value="DiscretionaryTrust">Discretionary Trust</option>
                  <option value="UnitTrust">Unit Trust</option>
                  <option value="HybridTrust">Hybrid Trust</option>
                  <option value="SelfManagedSuperfund">Self-Managed Superfund</option>
              </select>
          </td>
          <td>
              <select class="form-select" name="PropertyType[${trustPropertyIndex}]">
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="TownHouse">Town House</option>
                  <option value="Land">Land</option>
                  <option value="CommercialProperty">Commercial Property</option>
                  <option value="Other">Other</option>
              </select>
          </td>
          <td>
              <input type="text" class="form-control" name="state[${trustPropertyIndex}]" />
          </td>
          <td>
              <input type="date" class="form-control" name="dateOfPurchase[${trustPropertyIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="purchasePrice[${trustPropertyIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="currentMarketValue[${trustPropertyIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="debt[${trustPropertyIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="lenderName[${trustPropertyIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="weeklyRentalIncome[${trustPropertyIndex}]" />
          </td>
          <td>
              <select class="form-select" name="depreciationReportAvailable[${trustPropertyIndex}]">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
              </select>
          </td>
          <td>
              <button class="remove-trust-property-row-btn btn btn-sm btn-danger" type="button">remove</button>
          </td>
      `;

      // Append the new row to the table body
      document.getElementById('trust-property-details').appendChild(newRow);

      // Increment the index for the next row
      trustPropertyIndex++;
  }

  // Function to remove a trust property row
  function removeTrustPropertyRow(event) {
      const row = event.target.closest('tr');
      if (row) {
          row.remove();
      }
  }

  // Show/hide the trust property details container based on radio button selection
  function toggleTrustPropertyDetails() {
      const trustContainer = document.getElementById('trust-property-details-container');
      const haveTrustYes = document.getElementById('havePropertyByTrustStructureYes');

      if (haveTrustYes.checked) {
          trustContainer.style.display = 'block'; // Show the trust property details
      } else {
          trustContainer.style.display = 'none'; // Hide the trust property details
      }
  }

  // Event listener for radio buttons to show/hide the trust property details
  const trustRadioButtons = document.querySelectorAll('input[name="havePropertyByTrustStructure"]');
  trustRadioButtons.forEach(radio => {
      radio.addEventListener('change', toggleTrustPropertyDetails);
  });

  // Initial state of the trust property details container
  toggleTrustPropertyDetails();

  // Event listener for adding new trust property rows
  document.querySelector('.add-trust-property-row').addEventListener('click', addTrustPropertyRow);

  // Event delegation to handle row removal
  document.getElementById('trust-property-details').addEventListener('click', function (event) {
      if (event.target.classList.contains('remove-trust-property-row-btn')) {
          removeTrustPropertyRow(event);
      }
  });
});
// for show hide and add remove trust property table end


// for show hide and add remove Shares or Managed Funds 
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the index for new rows based on existing rows
  let sharesFundsIndex = document.querySelectorAll('#shares-funds-details tr').length;

  // Function to add a new shares and funds row
  function addSharesFundsRow() {
      // Create a new row element
      const newRow = document.createElement('tr');

      newRow.innerHTML = `
          <td>
              <input type="text" class="form-control" name="shareName[${sharesFundsIndex}]" />
          </td>
          <td>
              <select class="form-select" name="ownershipDetails[${sharesFundsIndex}]">
                  <option value="100%-Owned-By-first-Client">100% Owned By first Client</option>
                  <option value="100%-owned-By-Second-Client">100% owned By Second Client</option>
                  <option value="50-50-Partnership">50-50 Partnership</option>
                  <option value="Partnership-between-Unrelated-Parties">Partnership between Unrelated Parties</option>
                  <option value="Trust">Trust</option>
                  <option value="Company">Company</option>
              </select>
          </td>
          <td>
              <input type="text" class="form-control" name="dateOfPurchase[${sharesFundsIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="totalValueOfPurchase[${sharesFundsIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="currentMarketValue[${sharesFundsIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="debt[${sharesFundsIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="loanType[${sharesFundsIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="equity[${sharesFundsIndex}]" />
          </td>
          <td>
              <select class="form-select" name="holdingOrSelling[${sharesFundsIndex}]">
                  <option value="Holding">Holding</option>
                  <option value="Selling">Selling</option>
              </select>
          </td>
          <td>
              <button class="remove-shares-funds-row-btn btn btn-sm btn-danger" type="button">remove</button>
          </td>
      `;

      // Append the new row to the table body
      document.getElementById('shares-funds-details').appendChild(newRow);
      
      // Increment the index for the next row
      sharesFundsIndex++;
  }

  // Function to remove a shares and funds row
  function removeSharesFundsRow(event) {
      // Remove the row containing the button that was clicked
      const row = event.target.closest('tr');
      if (row) {
          row.remove();
      }
  }

  // Show/hide the shares and managed funds details container based on radio button selection
  function toggleSharesManagedFundsDetails() {
      const sharesContainer = document.getElementById('shares-managed-funds-details-container');
      const sharesYes = document.getElementById('sharesManagefundYes');

      if (sharesYes.checked) {
          sharesContainer.style.display = 'block'; // Show the details container
      } else {
          sharesContainer.style.display = 'none'; // Hide the details container
      }
  }

  // Event listener for radio buttons to show/hide the shares and managed funds details
  const sharesRadioButtons = document.querySelectorAll('input[name="sharesManagefund"]');
  sharesRadioButtons.forEach(radio => {
      radio.addEventListener('change', toggleSharesManagedFundsDetails);
  });

  // Initial state of the shares and managed funds details container
  toggleSharesManagedFundsDetails();

  // Event listener for adding new shares and funds rows
  document.querySelector('.add-shares-funds-row').addEventListener('click', addSharesFundsRow);

  // Event delegation to handle row removal
  document.getElementById('shares-funds-details').addEventListener('click', function(event) {
      if (event.target.classList.contains('remove-shares-funds-row-btn')) {
          removeSharesFundsRow(event);
      }
  });
});
// for show hide and add remove Shares or Managed Funds end




// for life style assets
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the index for new rows based on existing rows
  let lifestyleAssetIndex = document.querySelectorAll('.life-style-asset-table-body tr').length;

  // Function to add a new lifestyle asset row
  function addLifestyleAssetRow() {
      // Create a new row element
      const newRow = document.createElement('tr');

      newRow.innerHTML = `
          <td>
              <input type="text" class="form-control" name="lifestyleAssetName[${lifestyleAssetIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="lifestyleAssetDescription[${lifestyleAssetIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="lifestyleAssetValue[${lifestyleAssetIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="lifestyleAssetOwner[${lifestyleAssetIndex}]" />
          </td>
      `;

      // Append the new row to the table body
      document.querySelector('.life-style-asset-table-body').appendChild(newRow);
      
      // Increment the index for the next row
      lifestyleAssetIndex++;
  }

  // Event listener for adding new lifestyle asset rows
  document.getElementById('life-style-asset-table-row').addEventListener('click', addLifestyleAssetRow);
});
// for life Style Assets end




// for liabilities 
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the index for new rows based on existing rows
  let liabilitiesIndex = document.querySelectorAll('#liabilities-table tbody tr').length;

  // Function to add a new liabilities row
  function addLiabilitiesRow() {
      // Create a new row element
      const newRow = document.createElement('tr');

      newRow.innerHTML = `
          <td>
              <input type="text" class="form-control" name="liabilityType[${liabilitiesIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="balanceOwing[${liabilitiesIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="lender[${liabilitiesIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="interestRate[${liabilitiesIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="repaymentAmount[${liabilitiesIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="repaymentType[${liabilitiesIndex}]" />
          </td>
          <td>
              <input type="text" class="form-control" name="owner[${liabilitiesIndex}]" />
          </td>
      `;

      // Append the new row to the table body
      document.querySelector('#liabilities-table tbody').appendChild(newRow);
      
      // Increment the index for the next row
      liabilitiesIndex++;
  }

  // Event listener for adding new liabilities rows
  document.getElementById('add-liabilities-row').addEventListener('click', addLiabilitiesRow);
});
// for liabilities end