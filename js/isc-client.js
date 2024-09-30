


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
          <input type="text" class="form-control" name="dob[${clientIndex}]" />
        </td>
        <td>
          <input type="text" class="form-control" name="age[${clientIndex}]" />
        </td>
        <td>
          <input type="text" class="form-control" name="sex[${clientIndex}]" />
        </td>
        <td>
          <input type="text" class="form-control" name="relationship[${clientIndex}]" />
        </td>
        <td>
          <button
            class="remove-client-row-btn btn btn-sm btn-danger"
            type="button"
          >
            remove
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
    // Get the table body and count how many rows already exist
    const tableBody = document.getElementById("addressDetailsTableBody");
    let addressIndex = tableBody.getElementsByTagName("tr").length; // Get initial count of rows
  
    // Add event listener to the "Add +" button
    document.getElementById("add-address-row").addEventListener("click", function () {
      // Create a new table row
      const newRow = document.createElement("tr");
  
      // Add input fields to the new row with dynamic index for the name attribute
      newRow.innerHTML = `
        <td>
          <input type="text" class="form-control" name="address[${addressIndex}]" />
        </td>
        <td>
          <button class="remove-address-row-btn btn btn-sm btn-danger" type="button">remove</button>
        </td>
      `;
  
      // Append the new row to the table body
      tableBody.appendChild(newRow);
  
      // Increment the index for the next row
      addressIndex++;
    });
  
    // Add event listener for removing rows
    tableBody.addEventListener("click", function (e) {
      if (e.target && e.target.classList.contains("remove-address-row-btn")) {
        e.target.closest("tr").remove();
  
        // You can optionally update the addressIndex if you need to reset the row count after removal.
      }
    });
});  
// for address details end



// for contact details
document.addEventListener("DOMContentLoaded", function () {
    // Initialize the index for new rows based on existing rows
    let contactIndex = document.querySelectorAll('#contactDetailsTableBody tr').length;

    // Function to add a new contact row
    function addContactRow() {
    // Create a new row element
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>
        <input type="text" class="form-control" name="phone[${contactIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="work[${contactIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="mobile[${contactIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="email[${contactIndex}]" />
        </td>
        <td>
        <button class="remove-contact-row-btn btn btn-sm btn-danger" type="button">
            remove
        </button>
        </td>
    `;

    // Append the new row to the table body
    document.getElementById('contactDetailsTableBody').appendChild(newRow);
    
    // Increment the index for the next row
    contactIndex++;
    }

    // Function to remove a contact row
    function removeContactRow(event) {
    // Remove the row containing the button that was clicked
    const row = event.target.closest('tr');
    if (row) {
        row.remove();
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

    // Function to add a new dependant child row
    function addDependantChildRow() {
    // Create a new row element
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>
        <input type="text" class="form-control" name="childName[${dependantChildIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="age[${dependantChildIndex}]" />
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
        <input type="text" class="form-control" name="salary[${dependantChildIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="comments[${dependantChildIndex}]" />
        </td>
        <td>
        <button class="remove-dependant-child-row-btn btn btn-sm btn-danger" type="button">
            remove
        </button>
        </td>
    `;

    // Append the new row to the table body
    document.getElementById('dependantChildDetailsTableBody').appendChild(newRow);
    
    // Increment the index for the next row
    dependantChildIndex++;
    }

    // Function to remove a dependant child row
    function removeDependantChildRow(event) {
    // Remove the row containing the button that was clicked
    const row = event.target.closest('tr');
    if (row) {
        row.remove();
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




// for about business
document.addEventListener("DOMContentLoaded", function () {
    // Initialize the index for new rows based on existing rows
    let businessIndex = document.querySelectorAll('#about-business tr').length;
    
    // Function to add a new business row
    function addBusinessRow() {
      // Create a new row element
      const newRow = document.createElement('tr');
    
      newRow.innerHTML = `
        <td>
          <input type="text" class="form-control" name="businessName[${businessIndex}]" />
        </td>
        <td>
          <input type="text" class="form-control" name="description[${businessIndex}]" />
        </td>
        <td>
          <input type="text" class="form-control" name="corporateStructure[${businessIndex}]" />
        </td>
        <td>
          <input type="text" class="form-control" name="ownershipDetails[${businessIndex}]" />
        </td>
        <td>
          <input type="text" class="form-control" name="turnover[${businessIndex}]" />
        </td>
        <td>
          <input type="text" class="form-control" name="businessAssets[${businessIndex}]" />
        </td>
        <td>
          <input type="text" class="form-control" name="valueOfBusinessAssets[${businessIndex}]" />
        </td>
        <td>
          <input type="text" class="form-control" name="numOfEmployees[${businessIndex}]" />
        </td>
        <td>
          <input type="text" class="form-control" name="dateStarted[${businessIndex}]" />
        </td>
        <td>
          <button class="remove-business-row-btn btn btn-sm btn-danger" type="button">remove</button>
        </td>
      `;
    
      // Append the new row to the table body
      document.getElementById('about-business').appendChild(newRow);
      
      // Increment the index for the next row
      businessIndex++;
    }
    
    // Function to remove a business row
    function removeBusinessRow(event) {
      // Remove the row containing the button that was clicked
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
// for about business end


// for about employment 
document.addEventListener("DOMContentLoaded", function () {
    // Initialize the index for new rows based on existing rows
    let employmentIndex = document.querySelectorAll('#employment-details tr').length;

    // Function to add a new employment row
    function addEmploymentRow() {
    // Create a new row element
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>
        <input type="text" class="form-control" name="clientName[${employmentIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="jobDescription[${employmentIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="dateStarted[${employmentIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="salary[${employmentIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="bonuses[${employmentIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="qualifications[${employmentIndex}]" />
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

    // Append the new row to the table body
    document.getElementById('employment-details').appendChild(newRow);
    
    // Increment the index for the next row
    employmentIndex++;
    }

    // Function to remove an employment row
    function removeEmploymentRow(event) {
    // Remove the row containing the button that was clicked
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
// for about employment end


// for property table 
document.addEventListener("DOMContentLoaded", function () {
    // Initialize the index for new rows based on existing rows
    let propertyIndex = document.querySelectorAll('#property-details tr').length;

    // Function to add a new property row
    function addPropertyRow() {
    // Create a new row element
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>
        <input type="text" class="form-control" name="suburb[${propertyIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="state[${propertyIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="ownershipDetails[${propertyIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="propertyType[${propertyIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="dateOfPurchase[${propertyIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="purchasePrice[${propertyIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="currentMarketValue[${propertyIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="debt[${propertyIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="loanTypeLender[${propertyIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="equity[${propertyIndex}]" />
        </td>
        <td>
        <input type="text" class="form-control" name="weeklyRentalIncome[${propertyIndex}]" />
        </td>
        <td>
        <select class="form-select" name="depreciationClaimed[${propertyIndex}]">
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
        <td>
        <button class="remove-property-row-btn btn btn-sm btn-danger" type="button">remove</button>
        </td>
    `;

    // Append the new row to the table body
    document.getElementById('property-details').appendChild(newRow);
    
    // Increment the index for the next row
    propertyIndex++;
    }

    // Function to remove a property row
    function removePropertyRow(event) {
    // Remove the row containing the button that was clicked
    const row = event.target.closest('tr');
    if (row) {
        row.remove();
    }
    }

    // Event listener for adding new property rows
    document.querySelector('.add-property-row').addEventListener('click', addPropertyRow);

    // Event delegation to handle row removal
    document.getElementById('property-details').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-property-row-btn')) {
        removePropertyRow(event);
    }
    });

});
// for property table end


// for Shares or Managed Funds 
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
        <input type="text" class="form-control" name="ownershipDetails[${sharesFundsIndex}]" />
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
        <input type="text" class="form-control" name="dividend[${sharesFundsIndex}]" />
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

    // Event listener for adding new shares and funds rows
    document.querySelector('.add-shares-funds-row').addEventListener('click', addSharesFundsRow);

    // Event delegation to handle row removal
    document.getElementById('shares-funds-details').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-shares-funds-row-btn')) {
        removeSharesFundsRow(event);
    }
    });

});
// for Shares or Managed Funds end