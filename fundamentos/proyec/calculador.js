const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operation = null;
let waitingForSecondOperand = false;

function inputDigit(digit) {
  if (waitingForSecondOperand) {
    currentInput = digit;
    waitingForSecondOperand = false;
  } else {
    currentInput += digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (waitingForSecondOperand) {
    currentInput = '0.';
    waitingForSecondOperand = false;
    return;
  }
  if (!currentInput.includes('.')) {
    currentInput += '.';
  }
  updateDisplay();
}

function clearAll() {
  currentInput = '';
  previousInput = '';
  operation = null;
  waitingForSecondOperand = false;
  updateDisplay();
}

function deleteLastChar() {
  currentInput = currentInput.slice(0, -1);
  if (currentInput === '') currentInput = '0';
  updateDisplay();
}

function toggleSign() {
  if (currentInput !== '') {
    currentInput = currentInput.startsWith('-') ? currentInput.substring(1) : '-' + currentInput;
    updateDisplay();
  }
}

function performOperation(nextOperation) {
  const inputValue = parseFloat(currentInput);

  if (previousInput === '' && !waitingForSecondOperand) {
    previousInput = currentInput;
  } else if (operation) {
    const currentValue = parseFloat(previousInput);
    const newValue = calculate(currentValue, inputValue, operation);

    currentInput = String(newValue);
    previousInput = currentInput;
  }

  waitingForSecondOperand = true;
  operation = nextOperation;
  updateDisplay();
}

function calculate(first, second, op) {
  switch (op) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '×':
      return first * second;
    case '÷':
      return first / second;
    case '%':
      return first % second;
    default:
      return second;
  }
}

function handleEquals() {
  if (operation === null || waitingForSecondOperand) return;

  const inputValue = parseFloat(currentInput);
  const result = calculate(parseFloat(previousInput), inputValue, operation);

  currentInput = String(result);
  previousInput = '';
  operation = null;
  waitingForSecondOperand = false;
  updateDisplay();
}

function updateDisplay() {
  // Formatear número con comas para miles
  let formattedInput = currentInput;
  if (formattedInput.length > 10) {
    formattedInput = Number(formattedInput).toLocaleString('es-ES');
  } else {
    formattedInput = formattedInput.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  display.textContent = formattedInput;
}

// Eventos
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-op');

    if (value === 'AC') {
      clearAll();
    } else if (value === '⌫') {
      deleteLastChar();
    } else if (value === '=') {
      handleEquals();
    } else if (value === '()') {
      if (currentInput === '') {
        currentInput = '(';
      } else {
        currentInput += ')';
      }
      updateDisplay();
    } else if (value === '%') {
      performOperation('%');
    } else if (['+', '-', '×', '÷'].includes(value)) {
      performOperation(value);
    } else if (value === '.') {
      inputDecimal();
    } else if (!isNaN(value)) {
      inputDigit(value);
    }
  });
});

// Animación de hover en botones
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(0.95)';
    btn.style.boxShadow = 'inset 0 0 0 2px rgba(255,255,255,0.3)';
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
    btn.style.boxShadow = 'none';
  });
});