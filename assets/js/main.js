let currentNum = "";

let previousNum = "";

let operator = "";

const output1 = document.querySelector('#output1');

const output2 = document.querySelector('#output2');

const numBtn = document.querySelectorAll('.numbers');

const opBtn = document.querySelectorAll('.operators');

const allClearBtn = document.querySelector('#all-clear');

const clearBtn = document.querySelector('#clear');

const dotBtn = document.querySelector('.dot');

const equalBtn = document.querySelector('.equal');


const handleNumber = (number) => {
    if (previousNum !== "" && currentNum !== "" && operator === "") {
        previousNum = "";
        output1.textContent = currentNum;
    }
    if (currentNum.length <= 11) {
        currentNum += number;
        output1.textContent = currentNum;
    }
};

numBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        let value = Number(e.currentTarget.value);
        handleNumber(value);
    });
});

const displayOutput = () => {
    if (previousNum.length <= 11) {
        output1.textContent = previousNum;
    } else {
        output1.textContent = (`${previousNum.slice(0, 11)} ...`);
    }
    output2.textContent = "";
    operator = "";
    currentNum = "";
};

const roundNumber = num => Math.round(num * 100000) / 100000;

const operate = () => {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);
    if (operator === "+") {
        previousNum += currentNum;
    } else if (operator === "-") {
        previousNum -= currentNum;
    } else if (operator === "*") {
        previousNum *= currentNum;
    } else if (operator === "/") {
        if (currentNum <= 0) {
            previousNum = "Error";
            displayOutput();
            return;
        }
        previousNum /= currentNum;
    }
    previousNum = roundNumber(previousNum);
    previousNum = previousNum.toString();
    displayOutput();
};

const operatorCheck = text => {
    operator = text;
    output2.textContent = (`${previousNum} ${operator}`);
    output1.textContent = '';
    currentNum = "";
};

const handleOperator = (op) => {
    if (previousNum === "") {
        previousNum = currentNum;
        operatorCheck(op);
    } else if (currentNum === "") {
        operatorCheck(op);
    } else {
        operate();
        operator = op;
        output1.textContent = '';
        output2.textContent = (`${previousNum} ${operator}`);
    }
};

opBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        let value = (e.currentTarget.value);
        handleOperator(value);
    });
});

allClearBtn.addEventListener('click', () => {
    output1.textContent = '';
    output2.textContent = '';
    currentNum = '';
    previousNum = '';
    operator = '';
});

const handleUndo = () => {
    if (currentNum !== "") {
        currentNum = currentNum.slice(0, -1);
        output1.textContent = currentNum;
        if (currentNum === "") {
            output1.textContent = "";
        }
    }
    if (currentNum === "" && previousNum !== "" && operator === "") {
        previousNum = previousNum.slice(0, -1);
        output1.textContent = previousNum;
    }
};

clearBtn.addEventListener('click', handleUndo);

const addDecimal = () => {
    if (!currentNum.includes(".")) {
        currentNum += ".";
        output1.textContent = currentNum;
    }
};

dotBtn.addEventListener('click', addDecimal);

equalBtn.addEventListener('click', () => {
    if (currentNum != "" && previousNum != "") {
        operate();
    }
});

function handleKeyPress(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {
        handleNumber(e.key);
    }
    if (
        e.key === "Enter" ||
        (e.key === "=" && currentNum != "" && previousNum != "")
    ) {
        operate();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/") {
        handleOperator(e.key);
    }
    if (e.key === "*") {
        handleOperator("x");
    }
    if (e.key === ".") {
        addDecimal();
    }
    if (e.key === "Backspace") {
        handleUndo();
    }
};

window.addEventListener("keydown", handleKeyPress);