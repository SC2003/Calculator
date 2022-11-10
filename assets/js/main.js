const output1 = document.querySelector('#output1');
const output2 = document.querySelector('#output2');
const numBtn = document.querySelectorAll('.numbers');
const opBtn = document.querySelectorAll('.operators');
const allClearBtn = document.querySelector('#all-clear');
const clearBtn = document.querySelector('#clear');
let operator = '+';
let num1 = 10;
let num2 = 5;
numBtn.forEach(btn => {
    
    btn.addEventListener('click', (e) => {
    output1.textContent += (btn.value);
    });
});
allClearBtn.addEventListener('click', () => {
    output1.textContent = null;;
    output2.textContent = null;
    operator = null;;
    num1 = null;
    num2 = null;
});
clearBtn.addEventListener('click', () => output1.textContent = output1.textContent.slice(0, -1));
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;
const power = (num1, num2) => num1 ** num2;

const operate = (operator, num1, num2) => {
    if(!operator || !num1 || !num2) return;
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === '*') {
        return multiply(num1, num2);
   // } else if (operate === '/') {
    //    return divide(num1, num2)
    } else {
        return divide(num1, num2)
    }
};

output2.textContent = operate(operator, num1, num2);