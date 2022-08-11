enterData();

function enterData() {
  const operator = enterOperator();
  const firstNumber = enterNumber('Enter first number');
  const secondNumber = enterNumber('Enter second number');

  calcResult(operator, firstNumber, secondNumber);
};

function enterOperator() {
  const comandList = ['+', '-', '*', '/'];
  let command = prompt('Enter operator +, -, *, /');

  if (!comandList.includes(command)) {
    alert('Your data is incorrectly.');
    command = enterOperator();
  }

  return command;
};

function enterNumber(message) {
  let number = Number(prompt(`${message}`));

  if (isNaN(number)) {
  alert('Your data is incorrectly.');
  number = enterNumber(message);
  }

  return number;
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

function askQuestion() {
  const isAgain = confirm('Would you like to try again?');

  if(isAgain) {
    enterData();
  } else {
    return;
  }
};
