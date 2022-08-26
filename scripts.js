let input = '';
const operatorArr = []
const screen = document.querySelector('.screen');

//Keyboard functionality
window.addEventListener('keyup', inputKey);
function inputKey(e) {
    const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const buttons = Array.from(document.querySelectorAll('button'));
    buttons.forEach((button) => {
        if (button.textContent == `${e.key}` || button.id == `${e.key}`) {
            if (button.id == 'Enter') {pressEquals()
            } else if (button.textContent == '.') {addPeriod()    //for inputting period
            } else if (button.id == 'Backspace') {deleteLastInput()
            } else if (nums.includes(button.textContent)) {    //for inputting numbers
                if (input.length > 10) {return} //interrupt to prevent overflow
                input += button.textContent;
                screen.textContent = input;
            } else if (button.id == `${e.key}`) {    //for inputting operators
                if (input.length > 10) {return} //interrupt to prevent overflow
                if (input[input.length-1] === (' ')) {return}   //interrupt if last input was an operator (separated by spaces)
                input += ' ' + button.textContent + ' ';
                screen.textContent = input;
                operatorArr.push(button.id);
            }
        }
    })
}

//Number button functionality
const numbers = document.querySelectorAll('.number');
numbers.forEach((number)=> {
    number.addEventListener('click', inputNumber)
})

//Clear button functionality
const clear = document.querySelector('#clear');
clear.addEventListener('click', clearScreen)

//Backspace button functionality
const backspace = document.querySelector('#Backspace');
backspace.addEventListener('click', deleteLastInput)

//Negative button functionality
const negative = document.querySelector('#negative');
negative.addEventListener('click', addNegativeSign)

//Period button functionality
const period = document.querySelector('#period');
period.addEventListener('click', addPeriod)

//Operator button functionality
const operators = document.querySelectorAll('.operator');
operators.forEach((op)=> {
    op.addEventListener('click', inputOperator)
})

//Equals button functionality
const equals = document.querySelector('#Enter');
equals.addEventListener('click', pressEquals)


//Calculation functions
function add(a,b) {
    return parseFloat(a)+parseFloat(b);
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
    case '+':
        return add(firstNumber,secondNumber);
        break;
    case '-':
        return minus(firstNumber,secondNumber);
        break;
    case '*':
        return multiply(firstNumber,secondNumber);
        break;
    case '/':
        return divide(firstNumber,secondNumber);
        break;
    default: return 'Error';
    }
};


//DOM Event Listener
function inputNumber(e) {
    if (input.length > 10) {return} //interrupt to prevent overflow
    input += e.target.textContent;
    screen.textContent = input;
}

function clearScreen() {
    screen.textContent = '0';
    input = '';
}

function deleteLastInput() {
    const numberArr = Array.from(screen.textContent)    //create array from input
    const removedNum = numberArr.pop(); 
    if (removedNum === ' ') {numberArr.splice(-2,2)};   //remove operator if and spaces that go with it
    input = numberArr.join('');   //convert new array back into string 
    screen.textContent = input;    
}

function addNegativeSign(){
    const numberArr = Array.from(screen.textContent)    //create array from input
    if(input[input.length-1] === ' ') { //check if input has operator
        return  //can't change sign of operator, terminate function
    };
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
    if (!numberArr.includes(' ') && numberArr[0] === '-') { //if only 1 value, add change sign at front of array
        const removedSign = numberArr.shift();
    } else if (!numberArr.includes(' ')){
        numberArr.unshift('-');
    }; 
    input = numberArr.join('');   //convert new array back into string
    screen.textContent = input;    
}

function addPeriod() {
    if (input.length > 10) {return} //interrupt to prevent overflow
    const numberArr = input.split(' ');
    const lastNumber = numberArr[numberArr.length-1];
    if (lastNumber.includes('.')) {return}   //interrupt if period is there
    input += '.';
    screen.textContent = input;
}

function inputOperator(e) {
    if (input.length > 10) {return} //interrupt to prevent overflow
    if (input[input.length-1] === (' ')) {return}   //interrupt if last input was an operator (separated by spaces)
    input += ' ' + e.target.textContent + ' ';
    screen.textContent = input;
    operatorArr.push(e.target.id);
}

function pressEquals(){
    const omits = ['+', '-', 'x', '÷']; //list of operators to omit from number array
    const noSpaces = input.split(' ');  //separate string of numbers into their respective values
    const numberArr = noSpaces.filter((item)=>!omits.includes(item));
    let sum = numberArr[0];
    for (let i = 0; i < operatorArr.length ; i++) {
        sum = operate(sum,operatorArr[i],numberArr[i+1]);
    };
    if (sum === Infinity || sum === NaN || sum === 'NaN') {  //Sarcastic error message
        screen.textContent = 'Beep boop... Error. Does not compute... boop beep.'
    } else {
        if (!Number.isInteger(sum)) {sum = sum.toPrecision(9)};
        screen.textContent = sum;
    }
    input = '';
    operatorArr.length = 0;
}