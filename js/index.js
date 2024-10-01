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
    const currentStepFields = document.querySelectorAll(".step.active input[required]");
    const currentStepRadios = document.querySelectorAll(".step.active input[type='radio']");
    let isValid = true;

    // Validate text inputs
    currentStepFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        const errorMessage = document.createElement("div");
        errorMessage.className = "text-danger";
        errorMessage.textContent = "Please fill out this field.";
        const existingErrorMessage = field.parentElement.querySelector(".text-danger");
        if (!existingErrorMessage) {
          field.parentElement.appendChild(errorMessage);
        }
      } else {
        const existingErrorMessage = field.parentElement.querySelector(".text-danger");
        if (existingErrorMessage) {
          existingErrorMessage.remove();
        }
      }
    });

    // Validate radio buttons with visibility condition
    const radioGroups = {};
    currentStepRadios.forEach((radio) => {
      const radioGroupName = radio.name;
      const container = radio.closest(".form-check-inline").parentElement;

      // Only validate if the container is visible
      if (container.offsetParent !== null) {
        if (!radioGroups[radioGroupName]) {
          radioGroups[radioGroupName] = {
            radios: [],
            container: container
          };
        }
        radioGroups[radioGroupName].radios.push(radio);
      }
    });

    // Check each visible radio group
    Object.keys(radioGroups).forEach((groupName) => {
      const group = radioGroups[groupName];
      const isChecked = group.radios.some((r) => r.checked);

      if (!isChecked) {
        isValid = false;
        let errorMessage = group.container.querySelector(".text-danger");

        if (!errorMessage) {
          errorMessage = document.createElement("div");
          errorMessage.className = "text-danger";
          errorMessage.textContent = "Please select an option.";
          group.container.appendChild(errorMessage);
        }
      } else {
        const errorMessage = group.container.querySelector(".text-danger");
        if (errorMessage) {
          errorMessage.remove();
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


