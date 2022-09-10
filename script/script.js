const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculatorKeys');
const display = document.querySelector('.calculatorDisplay');

function add(firstNumber, secondNumber) {
    return parseFloat(firstNumber) + parseFloat(secondNumber);
}
function subtract(firstNumber, secondNumber) {
    return parseFloat(firstNumber) - parseFloat(secondNumber);
}
function multiply(firstNumber, secondNumber) {
    return parseFloat(firstNumber) * parseFloat(secondNumber);
}
function divide(firstNumber, secondNumber) {
    return parseFloat(firstNumber) / parseFloat(secondNumber);
}

function operate(x, y, operator) {
    let result = 0;
    if (operator === 'add') {
        result = add(x, y);
    }
    else if (operator === 'subtract') {
        result = subtract(x, y);
    }
    else if (operator === 'multiply') {
        result = multiply(x, y);
    }
    else if (operator === 'divide') {
        result = divide(x, y).toFixed(2);
    }
    return result;
}

keys.addEventListener('click', e => {
 if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;
    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('isDepressed'));
    //If a number is pressed
    if (!action) {
        if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
            display.textContent = keyContent;
        }
        else {
            display.textContent = displayedNum + keyContent;
        }
        calculator.dataset.previousKeyType = 'number';
    }
    //If '+ - * or /' button is pressed
    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;
        if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
            const result = operate(firstValue, secondValue, operator);
            display.textContent = result;
            calculator.dataset.firstValue = result;
        }
        else {
            calculator.dataset.firstValue = displayedNum;
        }
        key.classList.add('isDepressed');
        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.operator = action;
    }
    //If '.' button is pressed
    if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.';
        } 
        else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
            display.textContent = '0.';
        }
        calculator.dataset.previousKeyType = 'decimal';
    }
    //If 'AC' button is pressed
    if (action === 'clear') {
        calculator.dataset.firstValue = '';
        calculator.dataset.operator = '';
        calculator.dataset.previousKeyType = '';
        display.textContent = 0;
        calculator.dataset.previousKeyType = 'clear';
    }
    //If '=' button is pressed
    if (action === 'calculate') {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;
        if (firstValue) {
            display.textContent = operate(firstValue, secondValue, operator);
        }
        calculator.dataset.previousKeyType = 'calculate';
    }
 }
})