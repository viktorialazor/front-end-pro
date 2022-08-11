console.log('factorial', factorial(5));
console.log('max value', max([1, 8, 37, 5, 17]));

function factorial(number) {
  if (number === 1) {
      return 1;
  }

  return number * factorial(number - 1);
};

// Решение с помощью цикла

function max(arr) {
  let maxValue = arr[0];

  arr.forEach((element) => maxValue = element > maxValue ? element : maxValue);

  return maxValue;
};

// Решение с помощью рекурсии (массив мутируется)

// function max(arr) {
//   if (arr.length > 1) {
//     arr[0] < arr[1] ? arr.splice(0, 1) : arr.splice(1, 1);
//     return max(arr);
//   } else {
//     return arr[0];
//   }
// };

// Решение с помощью рекурсии (массив не мутируется)

// function max(arr, index = 0, maxValue = arr[0]) {
//   if (index < arr.length) {
//     maxValue = arr[index] > maxValue ? arr[index] : maxValue;
//     return max(arr, index + 1, maxValue);
//   } else {
//     return maxValue;
//   }
// };
