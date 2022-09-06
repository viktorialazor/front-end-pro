let regexp = /love/;

console.log(regexp.test('I love JavaScript')); // true
console.log(regexp.test('I JavaScript')); // false

regexp = /ing$/;

console.log(regexp.test('Good morning')); // true
console.log(regexp.test('Good morning!')); // false
