enterData();

function enterData() {
  const operator = enterOperator();
  const amountOperators = enterAmountOperators();
  const numberList = getNumberList(amountOperators);

  calcResult(operator, numberList);
};

function enterOperator() {
  const comandList = ['+', '-', '*', '/'];
  let command = prompt(`Enter operator ${comandList.join(', ')}`);

  if (!comandList.includes(command)) {
    alert('Your data is incorrectly.');
    command = enterOperator();
  }

  return command;
};

function enterAmountOperators() {
  let amountOperators = Number(prompt('Enter amount operators from 2 to 5'));

  if(isNaN(amountOperators) || (amountOperators < 2 || amountOperators > 5)) {
    alert('Your data is incorrectly.');
    amountOperators = enterAmountOperators();
  }

  return amountOperators;
};

function getNumberList(amountOperators) {
  const numberList = [];

  for(let i = 0; i < amountOperators; i++) {
    const number = enterNumber(`Enter number ${i+1}`);
    numberList.push(number);
  }

  return numberList;
};

function enterNumber(message) {
  let number = Number(prompt(`${message}`));

  if (isNaN(number)) {
  alert('Your data is incorrectly.');
  number = enterNumber(message);
  }

  return number;
};

function calcResult(command, valueList) {
  let result = 0;
  let mathEquation = '';

  switch(command) {
    case '+':
      result = getResult(add, valueList);
      break;
    case '-':
      result = getResult(sub, valueList);
      break;
    case '*':
      result = getResult(mult, valueList);
      break;
    case '/':
      result = getResult(div, valueList);
      break;
  }

  mathEquation = valueList.join(` ${command} `);

  alert(`${mathEquation} = ${result}`);
  askQuestion();
};

function getResult(actionName, valueList) {
  let firstNumber = valueList[0];
  let secondNumber = 0;
  let result = 0;

  for (let i = 0; i < valueList.length - 1; i++) {
    secondNumber = valueList[i+1];
    result = actionName(firstNumber, secondNumber);
    firstNumber = result;
  }

  return result;
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
