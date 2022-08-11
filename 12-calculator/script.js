function Calculator(base) {
  if (checkValue(base)) {
    this.currentNumber = base;
  }
  this.add = function(number) {
    if (checkValue(number)) {
      this.currentNumber += number;
    }
  };
  this.sub = function(number) {
    if (checkValue(number)) {
      this.currentNumber -= number;
    }
  };
  this.get = function() {
    return this.currentNumber;
  };
  this.set = function(number) {
    if (checkValue(number)) {
      this.currentNumber = number;
    }
  }
};

function checkValue(value) {
  return typeof value === 'number';
}

const calculator = new Calculator(100);
