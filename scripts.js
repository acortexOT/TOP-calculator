let firstNumber = "";
let secondNumber
let operator

const screen = document.querySelector('.screen');
//Input numbers
const numbers = document.querySelectorAll('.number');
numbers.forEach((number)=> {
    number.addEventListener('click', ()=> {
        screen.textContent = firstNumber + number.textContent;
        firstNumber = firstNumber + number.textContent;
    })
})
//Calculation functions
function add(a,b) {
    return a+b;
};
function minus(a,b) {
    return a-b;
};
function multiply(a,b) {
    return a*b;
};
function divide(a,b) {
    return a/b;
};
//Choosing right calculation when operator's selected
function operate() {
    switch (operator) {
        case 'add':
            add(firstNumber,secondNumber);
        break;
        case 'minus':
            minus(firstNumber,secondNumber);
        break;
        case 'multiply':
            multiply(firstNumber,secondNumber);
        break;
        case 'divide':
            divide(firstNumber,secondNumber);
        break;
        default: 
        //put error message here
    }
};