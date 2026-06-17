const calculator = document.getElementById("calculator");
const bill = calculator.querySelector("#bill");
const people = calculator.querySelector("#people");
const customTip = calculator.querySelector("#custom");
const tipRadios = calculator.querySelectorAll('input[name="tip-percent"]');
const tipOutput = calculator.querySelector("#tip-output");
const totalOutput = calculator.querySelector("#total-output");
const resetBtn = calculator.querySelector("#reset-btn");

//
// VALIDATORS
//
// Runs both validating functions
function validateCalculator() {
  if (!noNegatives()) {
    return false;
  }

  if (!noZeros()) {
    return false;
  }

  if (!isComplete()) {
    return false;
  }

  return true;
}

// Checks that neither the bill input nor the people input have been set to 0
function noZeros() {
  let isValid = true;

  if (bill.value !== "" && parseFloat(bill.value) === 0) {
    showError(bill);
    isValid = false;
  } else {
    clearError(bill);
  }

  if (people.value !== "" && parseInt(people.value, 10) === 0) {
    showError(people);
    isValid = false;
  } else {
    clearError(people);
  }

  return isValid;
}

// Checks if necessary input fields are complete
function isComplete() {
  let isValid;

  if (
    bill.value &&
    people.value &&
    (customTip.value ||
      calculator.querySelector('input[name="tip-percent"]:checked'))
  ) {
    isValid = true;
  } else {
    isValid = false;
  }

  return isValid;
}

// Checks if any input field contains a minus sign
function noNegatives() {
  let isValid;

  if (
    bill.value.includes("-") ||
    people.value.includes("-") ||
    customTip.value.includes("-")
  ) {
    isValid = false;
  } else {
    isValid = true;
  }

  return isValid;
}

// Helper function: displays error
function showError(el) {
  el.classList.add("error");
  el.closest(".input-group")
    .querySelector(".error-msg")
    ?.classList.add("error");
}

// Helper function: clears error
function clearError(el) {
  el.classList.remove("error");
  el.closest(".input-group")
    .querySelector(".error-msg")
    ?.classList.remove("error");
}

//
// CALCULATOR
//
// Runs functions to calculate the results and to display them
function doMath() {
  const selectedTip = calculator.querySelector(
    'input[name="tip-percent"]:checked',
  );

  let results;

  if (customTip.value) {
    results = getResults(customTip.value / 100);
  } else if (selectedTip) {
    results = getResults(selectedTip.value);
  }

  showResults(results);
}

// Calculates results
function getResults(percentage) {
  // Convert bill and people inputs from strings to numbers
  const billNum = parseFloat(bill.value) || 0;
  const peopleNum = parseInt(people.value) || 1;

  // Convert those values to cents in order to have whole numbers
  const billInCents = Math.round(billNum * 100);
  const tipInCents = Math.round(billInCents * percentage);
  const totalInCents = billInCents + tipInCents;

  // Divide cents cleanly and convert back to dollar amounts with decimals
  const tipPerPerson = tipInCents / peopleNum / 100;
  const totalPerPerson = totalInCents / peopleNum / 100;

  // Return data as object
  return { tipPerPerson, totalPerPerson };
}

// Displays results
function showResults(results) {
  tipOutput.textContent = `$${results.tipPerPerson.toFixed(2)}`;
  totalOutput.textContent = `$${results.totalPerPerson.toFixed(2)}`;
}

// Resets outputs
function resetOutputs() {
  tipOutput.textContent = "$0.00";
  totalOutput.textContent = "$0.00";
}

//
// EVENT LISTENERS
//
// Prevents scroll behavior on number inputs
document.addEventListener("wheel", function (e) {
  if (document.activeElement.type === "number") {
    document.activeElement.blur();
  }
});

// Cleans number inputs: removes leading zeros, removes decimals from people input, clears input if invalid
calculator.addEventListener(
  "blur",
  (e) => {
    if (e.target.type === "number" && e.target.value !== "") {
      // Clear input if negative or invalid
      if (e.target.value.includes("-") || isNaN(Number(e.target.value))) {
        e.target.value = "";
        resetOutputs();
        return;
      }

      let cleanedValue;

      // Remove leading zeros for all inputs and trailing decimals for people
      if (e.target.id === "people") {
        cleanedValue = parseInt(e.target.value, 10);
      } else {
        cleanedValue = parseFloat(e.target.value);
      }

      // Display cleaned value on the screen
      e.target.value = cleanedValue.toString();
    }
  },
  true,
);

// Main calculator event listener: enables resetBtn, validates calculator, then runs doMath
calculator.addEventListener("input", () => {
  resetBtn.disabled = false;

  if (validateCalculator()) {
    doMath();
  } else {
    resetOutputs();
  }
});

// Clears tip radio button if custom tip is given
customTip.addEventListener("input", () => {
  if (customTip.value !== "") {
    tipRadios.forEach((radio) => {
      radio.checked = false;
    });
  }
});

// Clears custom tip if tip radio button is selected
tipRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.checked) {
      customTip.value = "";
    }
  });
});

// Reset calculator: resets outputs, clears errors, and disables resetBtn
resetBtn.addEventListener("click", () => {
  resetOutputs();

  calculator.querySelectorAll(".input-field.error").forEach((el) => {
    clearError(el);
  });

  setTimeout(() => {
    resetBtn.disabled = true;
  }, 0);
});
