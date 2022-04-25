// Our calculator needs to:
// Add
// Subtract
// Multiply
// Divide



function operate(op, num1, num2) {

  let result = 0;
  num1 = Number(num1);
  num2 = Number(num2);
  switch(op) {
    case '+':
      result = add(num1, num2);
      break;
    case '-':
      result = substract(num1, num2);
      break;
    case '*':
      result = multiply(num1, num2);
      break;
    case '/':
      result = divide(num1, num2);
      break;
    case '%':
      result = percent(num1, num2);
      break;
    default:
      break;
  }
  return result;
}

function add(x, y) {
  return x + y;
} 

function substract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if(y === 0) {
    console.log('Cannot divide by 0!');
    clearAll();
    current.innerText = '0';
    return;
  }
  return x / y;
}

function percent(x, y) {
  return x * (y / 100);
}


// Make the display update whenever we click a number button
const numberButtons = document.querySelectorAll('.number');
const opButtons = document.querySelectorAll('.operation');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const delButton = document.querySelector('.delete');
const previous = document.querySelector('.previous');
const current = document.querySelector('.current');
let currentOp = '';
let displayValue = '';
let previousVal = '';
let currentVal = '';
let computed = false;

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
    updateDisplay();
  })
})

document.addEventListener('keydown', e => {
  if(e.key === '+' || e.key === '/' || e.key === '*' || e.key === '-' || e.key === '%') {
    handleOperator(e.key);
  } else if(e.key === 'Enter') {
    compute();
  } else if(e.key === 'Backspace') {
    backspace();
  } else if(e.key === 'Escape') {
    clearAll();
  }else if(!isNaN(e.key)) {
    appendNumber(e.key);
    updateDisplay();
  } 
})



opButtons.forEach(button => {
  button.addEventListener('click', () => {
    handleOperator(button.innerText);
  })
})

delButton.addEventListener('click', () => {
  backspace();
})

equals.addEventListener('click', () => {
  compute();
})

clear.addEventListener('click', () => {
  clearAll();
})



function appendNumber(number) {

  if(number === '.' && current.innerText.includes('.')) {
    return;
  }
  // if(number === '.' && (current.innerText === '0' || current.innerText === '' || current.innerText === '.')) {
  //   displayValue = '0';
  //   current.innerText = '0';
  // } 

  if(computed) {
    currentVal = '';
    displayValue = '';
    current.innerText = '';
    computed = false;
  }
  displayValue += number;
  if(number !== '.') {
    currentVal += number;
  }
}

function updateDisplay() {
  current.innerText = displayValue;
  currentVal = +current.innerText;
}

function compute() {
  if(currentOp !== '') {
    console.log(previousVal, currentVal);
    let result = operate(currentOp, previousVal, currentVal);
    if(result || result === 0) {
      if(result.toString().length > 8) {
        current.innerText = result.toFixed(6);
        currentVal = result.toFixed(6);
      } else {
        current.innerText = result; 
        currentVal = result
      }
      previousVal = '';
      previous.innerText = '';
      computed = true;
      currentOp = '';
    }
  }
}

function handleOperator(op) {

  if(currentOp && !current.innerText) {
    return;
  }

  if(previous.innerText && current.innerText) {
    let newOp = previous.innerText[previous.innerText.length - 1];
    let result = operate(newOp, previousVal, currentVal);
    console.log(result);
    previous.innerText = `${result} ${op}`;
    previousVal = result;
    currentOp = op;
    current.innerText = '';
    currentVal = '';
    displayValue = '';
    return;
  }


  previous.innerText = current.innerText;
  previousVal = currentVal;
  currentOp = op;
  current.innerText = '';
  currentVal = '';
  previous.innerText += ` ${op}`;
  displayValue = '';
}

function clearAll() {
  displayValue = '';
  previous.innerText = '';
  current.innerText = '0';
  previousVal = '';
  currentVal = '';
  currentOp = '';
}

function backspace() {
  if(!computed && currentVal !== '') {
    console.log('Current val', currentVal)
    current.innerText = current.innerText.slice(0, -1);
    displayValue = current.innerText;
    if(displayValue === '') {
      displayValue = '0';
      current.innerText = displayValue;
    }
    currentVal = Math.floor(currentVal/10);
  }
}