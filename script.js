let input = '';
let result = 0;
let history = [];

// Get references to the display elements
const inputDisplay = document.getElementById('display-input');
const resultDisplay = document.getElementById('display-result');
const historyDisplay = document.getElementById('history');
const powerModal = document.getElementById('power-modal');

// Function to append value to input
function appendToInput(value) {
  input += value; // Add value to input
  updateDisplay();
}

// Function to update the display
function updateDisplay() {
  inputDisplay.innerText = input || '0'; // Show current input or 0 if empty
}

// Function to clear input
function clearInput() {
  input = '';
  result = 0;
  updateDisplay();
  resultDisplay.innerText = '0'; // Reset result display
}

// Function to delete last input
function deleteLast() {
  input = input.slice(0, -1); // Remove last character
  updateDisplay();
}

// Function to calculate result
function calculateResult() {
  try {
    // Replace power notation for easier calculation
    const formattedInput = input.replace(/\^/g, '**'); // Change ^ to **

    // Use math.js to evaluate the expression
    result = math.evaluate(formattedInput); 
    resultDisplay.innerText = result; // Show result on equals click

    logCalculation(); // Log calculation in history
  } catch (error) {
    resultDisplay.innerText = 'Error'; // Show error if calculation fails
  }
}

// Function to show power input modal
function showPowerInput() {
  powerModal.style.display = 'block'; // Show modal
}

// Function to close power input modal
function closePowerInput() {
  powerModal.style.display = 'none'; // Hide modal
}

// Function to calculate power
function calculatePower() {
  const base = parseFloat(document.getElementById('base-input').value); // Get base
  const exponent = parseFloat(document.getElementById('exponent-input').value); // Get exponent

  if (isNaN(base) || isNaN(exponent)) {
    alert('Please enter valid numbers for base and exponent'); // Alert if inputs are invalid
    return;
  }

  // Calculate power and update input
  const powerResult = Math.pow(base, exponent); 
  input += `${base}^${exponent}`; // Append power input to main input
  updateDisplay(); // Update display
  resultDisplay.innerText = powerResult; // Show power result

  closePowerInput(); // Close modal
  logCalculation(); // Log calculation in history
}

// Function to toggle history display
function toggleHistory() {
  historyDisplay.classList.toggle('show');
  if (historyDisplay.classList.contains('show')) {
    historyDisplay.style.maxHeight = history.length * 40 + 'px'; // Adjust height based on items
    historyDisplay.innerHTML = history.map(item => `<div class="history-item" onclick="reuseCalculation('${item}')">${item}</div>`).join('');
  } else {
    historyDisplay.style.maxHeight = '0'; // Hide history
  }
}

// Function to reuse a calculation
function reuseCalculation(item) {
  input = item.split(' = ')[0]; // Get input part
  updateDisplay();
}

// Function to log the current calculation into history
function logCalculation() {
  if (input) {
    history.push(`${input} = ${result}`);
  }
}

// Attach log calculation to equals button
document.getElementById('equals').addEventListener('click', function() {
  calculateResult(); // Calculate result
});

// Attach event to close modal when clicking outside of it
window.onclick = function(event) {
  if (event.target === powerModal) {
    closePowerInput();
  }
}
// Function to calculate result
function calculateResult() {
    try {
        // Replace power notation for easier calculation
        const formattedInput = input
            .replace(/\^/g, '**') // Change ^ to **
            .replace(/x/g, '*'); // Change x to * for multiplication

        // Use math.js to evaluate the expression
        result = math.evaluate(formattedInput);
        resultDisplay.innerText = result; // Show result on equals click

        logCalculation(); // Log calculation in history
    } catch (error) {
        resultDisplay.innerText = 'Error'; // Show error if calculation fails
    }
}
