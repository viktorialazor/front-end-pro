enterData();

function enterData() {
  const operator = prompt('Enter operator +, -, *, /');
  const firstNumber = prompt('Enter first number');
  const secondNumber = prompt('Enter second number');

  checkData(operator, firstNumber, secondNumber);
};

function checkData(command, firstValue, secondValue) {
  const firstNumber = Number(firstValue);
  const secondNumber = Number(secondValue);
  const errorMessage = 'Your data is incorrectly.';
  const isFirstNumberCorrectly = !isNaN(firstNumber);
  const isSecondNumberCorrectly = !isNaN(secondNumber);
  let isOperatorCorrectly = true;

  if (command != '+' && command != '-' && command != '*' && command != '/') {
    isOperatorCorrectly = false;
  }

  if (isOperatorCorrectly && isFirstNumberCorrectly && isSecondNumberCorrectly) {
    calcResult(command, firstNumber, secondNumber);
  } else {
    alert(errorMessage);
    askQuestion();
  }
};

function calcResult(command, firstValue, secondValue) {
  let result = 0;

  switch(command) {
    case '+':
      result = add(firstValue, secondValue);
      break;
    case '-':
      result = sub(firstValue, secondValue);
      break;
    case '*':
      result = mult(firstValue, secondValue);
      break;
    case '/':
      result = div(firstValue, secondValue);
      break;
  }

  alert(`${firstValue} ${command} ${secondValue} = ${result}`);
  askQuestion();
};

function askQuestion() {
  const isAgain = confirm('Would you like to try again?');

  if(isAgain) {
    enterData();
  } else {
    return;
  }
};

function add(firstValue, secondValue) {
  return firstValue + secondValue;
};

function sub(firstValue, secondValue) {
  return firstValue - secondValue;
};

function mult(firstValue, secondValue) {
  return firstValue * secondValue;
};

function div(firstValue, secondValue) {
  return firstValue / secondValue;
};
