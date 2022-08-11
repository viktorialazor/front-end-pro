Array.prototype.max = function() {
  for(let i = 0; i < this.length; i++) {
    if (this[i] === '' || isNaN(this[i])) {
      return;
    }
  }

  let maxNumber = this[0];

  for(let i = 1; i < this.length; i++) {
    if (this[i] > maxNumber) {
      maxNumber = this[i];
    }
  }

  return maxNumber;
};

export default Array.prototype.max;
