// Our calculator needs to:
// Add
// Subtract
// Multiply
// Divide


function Calculator() {

}




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
  return x / y;
}


// Make the display update whenever we click a number button
const numberButtons = document.querySelectorAll('.number');
const opButtons = document.querySelectorAll('.operation');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const previous = document.querySelector('.previous');
const current = document.querySelector('.current');
let currentOp = '';
let displayValue = '';
let previousVal = '';
let currentVal = '';

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
    updateDisplay();
  })
})

opButtons.forEach(button => {
  button.addEventListener('click', () => {
    handleOperator(button.innerText);
  })
})

equals.addEventListener('click', () => {
  let result = operate(currentOp, previousVal, currentVal);
  current.innerText = result;
  previousVal = '';
  previous.innerText = '';
})

clear.addEventListener('click', () => {
  clearAll();
})



function appendNumber(number) {
  // if(currentVal !== '') {
  //   currentVal = '';
  //   displayValue = '';
  //   // current.innerText = '';
  // }
  displayValue += number;
  console.log(displayValue);
  currentVal += number;
  console.log('Current Val: ', currentVal);
}

function updateDisplay() {
  current.innerText = displayValue;
  currentVal = +current.innerText;
}

function handleOperator(op) {
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