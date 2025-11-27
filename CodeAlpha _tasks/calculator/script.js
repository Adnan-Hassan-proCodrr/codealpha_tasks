const previousElement = document.querySelector("[data-previous]");
const currentElement = document.querySelector("[data-current]");
const buttons = document.querySelectorAll("button");

let currentOperand = "0";
let previousOperand = "";
let currentOperator = null;
let overwrite = false;

const MAX_LENGTH = 15;

buttons.forEach((btn) => {
  btn.addEventListener("click", () => handleInput(btn));
});

document.addEventListener("keydown", (event) => handleKeyboard(event));

function handleInput(button) {
  const { value } = button.dataset;
  const action = button.dataset.action;

  switch (action) {
    case "clear":
      clearAll();
      break;
    case "delete":
      deleteDigit();
      break;
    case "operator":
      chooseOperator(value);
      break;
    case "equals":
      evaluate();
      break;
    case "percent":
      percent();
      break;
    case "sign":
      toggleSign();
      break;
    default:
      appendDigit(value);
  }
  updateDisplay();
}

function handleKeyboard({ key }) {
  if (!isNaN(key)) {
    appendDigit(key);
  } else if (key === ".") {
    appendDigit(".");
  } else if (["/", "*", "-", "+"].includes(key)) {
    chooseOperator(key);
  } else if (key === "Enter" || key === "=") {
    evaluate();
  } else if (key === "Backspace") {
    deleteDigit();
  } else if (key.toLowerCase() === "c") {
    clearAll();
  } else if (key === "%") {
    percent();
  } else {
    return;
  }
  updateDisplay();
}

function clearAll() {
  currentOperand = "0";
  previousOperand = "";
  currentOperator = null;
  overwrite = false;
}

function deleteDigit() {
  if (overwrite) {
    currentOperand = "0";
    overwrite = false;
    return;
  }
  if (currentOperand.length === 1) {
    currentOperand = "0";
    return;
  }
  currentOperand = currentOperand.slice(0, -1);
}

function appendDigit(digit) {
  if (digit === "." && currentOperand.includes(".")) {
    return;
  }
  if (overwrite) {
    currentOperand = digit === "." ? "0." : digit;
    overwrite = false;
    return;
  }
  if (currentOperand === "0" && digit !== ".") {
    currentOperand = digit;
  } else if (currentOperand.length < MAX_LENGTH) {
    currentOperand += digit;
  }
}

function chooseOperator(operator) {
  if (currentOperator && !overwrite) {
    evaluate();
  }
  previousOperand = currentOperand;
  currentOperator = operator;
  overwrite = true;
}

function evaluate() {
  if (!currentOperator || overwrite) {
    return;
  }

  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (Number.isNaN(prev) || Number.isNaN(current)) {
    return;
  }

  let result = 0;
  switch (currentOperator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = current === 0 ? "Error" : prev / current;
      break;
    default:
      return;
  }

  if (typeof result === "number") {
    result = +parseFloat(result.toFixed(10)).toString();
  }

  currentOperand = String(result);
  previousOperand = "";
  currentOperator = null;
  overwrite = true;
}

function percent() {
  const value = parseFloat(currentOperand);
  if (Number.isNaN(value)) return;
  currentOperand = String(value / 100);
  overwrite = true;
}

function toggleSign() {
  if (currentOperand === "0") return;
  currentOperand = currentOperand.startsWith("-")
    ? currentOperand.slice(1)
    : `-${currentOperand}`;
}

function updateDisplay() {
  currentElement.textContent = formatNumber(currentOperand);
  previousElement.textContent = currentOperator
    ? `${formatNumber(previousOperand)} ${translateOperator(currentOperator)}`
    : "";
}

function formatNumber(value) {
  if (value === "Error") return value;
  const [integer, decimal] = value.split(".");
  const integerDisplay = Number(integer).toLocaleString("en-US");
  if (decimal == null) return integerDisplay;
  return `${integerDisplay}.${decimal.slice(0, 6)}`;
}

function translateOperator(operator) {
  return operator === "/"
    ? "÷"
    : operator === "*"
    ? "×"
    : operator;
}

updateDisplay();

