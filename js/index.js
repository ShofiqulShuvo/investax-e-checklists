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
