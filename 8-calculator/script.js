function createCalculator(base) {
  let currentNumber = checkValue(base);

  return {
    add: (number) => {
      currentNumber += checkValue(number);
    },
    sub: (number) => {
      currentNumber -= checkValue(number);
    },
    get: () => currentNumber,
    set: (number) => {
      currentNumber = checkValue(currentNumber);
    }
  };
};

function checkValue(value, defaultValue = 0) {
  return typeof value === 'number' ? value : defaultValue;
}

const calculator = createCalculator(100);