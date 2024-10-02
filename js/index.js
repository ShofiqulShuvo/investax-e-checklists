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




const navLinks = document.querySelectorAll(".nav-link");

const isMobile = () => window.innerWidth < 768;

// Function to add 'active' class and remove it from others
const activateNavItem = (link) => {
  navLinks.forEach((navLink) => {
    navLink.closest(".nav-item").classList.remove("active");
  });
  link.closest(".nav-item").classList.add("active");
};

// Function to remove 'active' class on hover out or click
const deactivateNavItem = (link) => {
  link.closest(".nav-item").classList.remove("active");
};

// Function to set menu behavior based on screen size
const setMenuBehavior = () => {
  navLinks.forEach((link) => {
    const navItem = link.closest(".nav-item");

    // Remove any previous event listeners to prevent duplication
    // No need to reference undefined functions
    link.removeEventListener("click", () => {});
    link.removeEventListener("mouseenter", () => {});
    navItem.removeEventListener("mouseleave", () => {});

    if (isMobile()) {
      // Mobile: Add click event
      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (navItem.classList.contains("active")) {
          deactivateNavItem(link);
        } else {
          activateNavItem(link);
        }
      });
    } else {
      // Desktop: Add hover events
      link.addEventListener("mouseenter", () => {
        activateNavItem(link);
      });

      // On hover out, remove the 'active' class
      navItem.addEventListener("mouseleave", () => {
        deactivateNavItem(link);
      });
    }
  });
};

// Apply the correct behavior when the window is resized
window.addEventListener("resize", setMenuBehavior);

// Initial call to set up the menu behavior based on current screen size
setMenuBehavior();



const menuBtns = document.querySelectorAll(".menu-btn");


// Function to handle hover or click based on screen size
const setMenuBtnBehavior = () => {
  menuBtns.forEach((btn) => {
    const parentListItem = btn.parentNode;
    const closestNavItem = btn.closest(".nav-item");
    const lastSubMenuContainer = closestNavItem.querySelector(".last-submenu-container");

    // Clear any previous event listeners to avoid duplicates
    btn.removeEventListener("click", () => {});
    btn.removeEventListener("mouseenter", () => {});

    // Mobile behavior: click event
    if (isMobile()) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        // Check if the current item is already active
        if (parentListItem.classList.contains("active")) {
          // Remove active class if already active (toggle behavior)
          parentListItem.classList.remove("active");
          lastSubMenuContainer.innerHTML = "";  // Clear submenu content
        } else {
          // Remove active class from all other menu buttons
          menuBtns.forEach((menuButton) => {
            menuButton.parentNode.classList.remove("active");
          });

          // Add active class to clicked button
          parentListItem.classList.add("active");


        }
      });
    } else {
      // Desktop behavior: hover event
      btn.addEventListener("mouseenter", () => {
        // Remove active class from all menu buttons
        menuBtns.forEach((menuButton) => {
          menuButton.parentNode.classList.remove("active");
        });

        // Add active class to hovered button
        parentListItem.classList.add("active");

        // Get second sub menu container
        const secondSubMenuContainer = parentListItem.querySelector(".second-sub-menu-container");

        // Add second sub menu's content into last sub menu container
        if (secondSubMenuContainer && lastSubMenuContainer) {
          lastSubMenuContainer.innerHTML = "";
          lastSubMenuContainer.innerHTML = secondSubMenuContainer.innerHTML;
        }
      });
    }
  });
};

// Apply the correct behavior when the window is resized
window.addEventListener("resize", setMenuBtnBehavior);

// Initial call to set up the menu behavior based on current screen size
setMenuBtnBehavior();
