let input = '';
const operatorArr = []
const screen = document.querySelector('.screen');
//Number button functionality
const numbers = document.querySelectorAll('.number');
numbers.forEach((number)=> {
    number.addEventListener('click', ()=> {
        input += number.textContent;
        screen.textContent = input;
    })
})
//Clear button functionality
const clear = document.querySelector('#clear');
clear.addEventListener('click', ()=> {
    screen.textContent = '0';
    input = '';
})
//Backspace button functionality
const backspace = document.querySelector('#backspace');
backspace.addEventListener('click', ()=>{
    const numberArr = Array.from(screen.textContent)    //create array from input
    const removedNum = numberArr.pop(); 
    input = numberArr.join('');   //convert new array back into string 
    screen.textContent = input;    
})
//Negative button functionality
const negative = document.querySelector('#negative');
negative.addEventListener('click', ()=>{
    const numberArr = Array.from(screen.textContent)    //create array from input
    //NEED TO ACCOUNT FOR MULTIPLE ARGUMENTS
    //if last value is space then stop function (can't reverse sign of an operator)
    if(input[input.length-1] === ' ') { //check if input has operator
        return  //can't change sign of operator, terminate function
    };
    //iterate backwards from end of string
    for (let i = numberArr.length-1; i > 0; --i){   //search for last number
        if (numberArr[i] === ' ') {
            if (numberArr[i+1] === '-') {
                numberArr.splice(i+1,1);      //make number positive it it's negative
                input = numberArr.join('');   //convert new array back into string
                screen.textContent = input;
                break  
            } else {
                numberArr.splice(i+1, 0, '-') //make number negative if it's positive
                input = numberArr.join('');   //convert new array back into string
                screen.textContent = input;  
                break
            };
        };
    };       
    if (numberArr.includes(!' ') && numberArr[0] === '-') { //if only 1 value, add change sign at front of array
        const removedSign = numberArr.shift();
    } else if (numberArr.includes(!' ')){
        numberArr.unshift('-');
    }; 
    input = numberArr.join('');   //convert new array back into string
    screen.textContent = input;    
})
    
    //if num AND includes ' ', iterate to last ' ' and change sign at last space
    //if num AND !includes ' ', change sign at [0];
//Period button functionality
const period = document.querySelector('#period');
    period.addEventListener('click', ()=> {
        if (input.includes('.')) {return}   //interrupt if period is there
        input += '.';
        screen.textContent = input;
    })
//Operator button functionality
const operators = document.querySelectorAll('.operator');
operators.forEach((op)=> {
    op.addEventListener('click', ()=> {
        if (input[input.length-1] === (' ')) {return}   //interrupt if last input was an operator (separated by spaces)
            input += ' ' + op.textContent + ' ';
            screen.textContent = input;
        operatorArr.push(op.id);
    })
})
//Equals button functionality
const equals = document.querySelector('#equals');
equals.addEventListener('click', ()=> {
    const omits = ['+', '-', 'x', '÷']; //list of operators to omit from number array
    const noSpaces = input.split(' ');  //separate string of numbers into their respective values
    const numberArr = noSpaces.filter((item)=>!omits.includes(item));
    let sum = numberArr[0];
    for (let i = 0; i < operatorArr.length ; i++) {
            sum = operate(sum,operatorArr[i],numberArr[i+1]);
    }
    screen.textContent = sum;
    input = '';
    operatorArr.length = 0;
})
//Calculation functions
function add(a,b) {
    return parseInt(a)+parseInt(b);
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
function operate(firstNumber,operator,secondNumber) {
    switch (operator) {
        case 'plus':
            return add(firstNumber,secondNumber);
        break;
        case 'minus':
            return minus(firstNumber,secondNumber);
        break;
        case 'multiply':
            return multiply(firstNumber,secondNumber);
        break;
        case 'divide':
            return divide(firstNumber,secondNumber);
        break;
        default: return 'Error';
        //put error message here
    }
};