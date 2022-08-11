function Hamburger(size) {
  this.price = size.price;
  this.calorie = size.calorie;
  this.toppingsListForMessage = [];
};

Hamburger.prototype.addTopping = function(topping) {
  this.price += topping.price;
  this.calorie += topping.calorie;

  if (!this.toppingsListForMessage.includes(topping.product)) {
    this.toppingsListForMessage.push(topping.product);
  }
};

Hamburger.prototype.getPrice = function() {
  return this.price;
};

Hamburger.prototype.getCalories = function() {
  return this.calorie;
};

Hamburger.prototype.getMessage = function(defaultMessage) {
  return this.toppingsListForMessage.length > 0 
  ? `${defaultMessage} with addition ${this.toppingsListForMessage.join(', ')}:` 
  : `${defaultMessage}:`;
};

Hamburger.SIZE_SMALL = {
  price: 50,
  calorie: 20,
};

Hamburger.SIZE_MIDDLE = {
  price: 75,
  calorie: 30,
};

Hamburger.SIZE_BIG = {
  price: 100,
  calorie: 40,
};

Hamburger.TOPPING_CHEESE = {
  price: 10,
  calorie: 20,
  product: 'cheese',
};

Hamburger.TOPPING_SALAD = {
  price: 20,
  calorie: 5,
  product: 'salad',
};

Hamburger.TOPPING_POTATO = {
  price: 15,
  calorie: 10,
  product: 'potato',
};

Hamburger.TOPPING_CONDIMENT = {
  price: 15,
  calorie: 0,
  product: 'condiment',
};

Hamburger.TOPPING_MAYO = {
  price: 20,
  calorie: 5,
  product: 'mayo',
};

const hamburger = new Hamburger(Hamburger.SIZE_SMALL);

hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_POTATO);
hamburger.addTopping(Hamburger.TOPPING_POTATO);

const priceMessage = hamburger.getMessage('Hamburger price');
const calorieMessage = hamburger.getMessage('Hamburger calories');

console.log(`${priceMessage} ${hamburger.getPrice()}`);
console.log(`${calorieMessage} ${hamburger.getCalories()}`);
