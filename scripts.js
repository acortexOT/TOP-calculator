let firstNumber = "";
let secondNumber
let operator
const screen = document.querySelector('.screen');
//Number button functionality
const numbers = document.querySelectorAll('.number');
numbers.forEach((number)=> {
    number.addEventListener('click', ()=> {
        screen.textContent = firstNumber + number.textContent;
        firstNumber = firstNumber + number.textContent;
    })
})
//Clear button functionality
const clear = document.querySelector('#clear');
clear.addEventListener('click', ()=> {
    screen.textContent = '0';
    firstNumber = '';
})
//Backspace button functionality
const backspace = document.querySelector('#backspace');
backspace.addEventListener('click', ()=>{
    const numberArr = Array.from(screen.textContent)    //create array from input
    const removedNum = numberArr.pop(); 
    screen.textContent = numberArr.join('');    //convert new array back into string
    firstNumber = numberArr.join('');   //update variable with new number  
})
//Negative button functionality
const negative = document.querySelector('#negative');
negative.addEventListener('click', ()=>{
    const numberArr = Array.from(screen.textContent)    //create array from input
    if (numberArr[0] === '-') {
        const removedSign = numberArr.shift();
    } else {
        numberArr.unshift('-');
    }; 
    screen.textContent = numberArr.join('');    //convert new array back into string
    firstNumber = numberArr.join('');   //update variable with new number  
})
//Period button functionality
const period = document.querySelector('#period');
    period.addEventListener('click', ()=> {
    const currentNumber = screen.textContent;
        if (currentNumber.includes('.')) {return}   //interrupt if period is there
        screen.textContent = firstNumber + '.';
        firstNumber = firstNumber + '.';
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