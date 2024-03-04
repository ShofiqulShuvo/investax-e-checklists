// funtion for step
let currentStep = 1;
    const totalSteps = document.querySelectorAll('.step').length;
    const nextBtn = document.getElementById('nextBtn');

    showStep(currentStep);

    function showStep(step) {
        const steps = document.querySelectorAll('.step');
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

    function nextStep(event) {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        }
        event.preventDefault();
    }

    function prevStep(event) {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
        event.preventDefault();
    }