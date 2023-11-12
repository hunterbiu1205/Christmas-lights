import "./styles.css";

const checkbox = document.getElementById('checkbox');
const stopAnimation = document.querySelectorAll('.circle');
const inputField = document.getElementById('speed-input');

let lastValidInput = 3; // Set a default value for the first time

function applyRandomDelay(elements) {
    elements.forEach(element => {
        const randomDelay = Math.floor(Math.random() * 2000); // Change 2000 to adjust the maximum delay
        element.style.animationDelay = randomDelay + 'ms';
        console.log(`Random delay for element: ${randomDelay}ms`);
    });
}

function changeAnimationDuration(userInput) {
    const animationDuration = userInput * 0.5; // Convert 1-5 to 0.5-2.5
    stopAnimation.forEach(element => {
        element.style.animationDuration = `${animationDuration}s`;
    });
}

applyRandomDelay(stopAnimation);

inputField.addEventListener('input', function() {
    const userInput = inputField.value;

    if (userInput === '' || userInput === null) {
        changeAnimationDuration(lastValidInput); // Maintain the last valid input if current input is empty
    } else if (inputField.validity.rangeOverflow || userInput > 5) {
        inputField.setCustomValidity('Please enter a number between 1 and 5.');
    } else if (inputField.validity.rangeUnderflow || userInput < 1) {
        inputField.setCustomValidity('Please enter a number between 1 and 5.');
    } else {
        lastValidInput = userInput; // Store the last valid input
        inputField.setCustomValidity('');
        changeAnimationDuration(userInput);
    }

    inputField.reportValidity();
});

checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
        stopAnimation.forEach(element => {
            element.classList.add('stop-animation');
        });
    } else {
        stopAnimation.forEach(element => {
            element.classList.remove('stop-animation');
        });
    }
});
