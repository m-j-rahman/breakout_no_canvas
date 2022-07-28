// find missing numbers in array
function findMissingNumbers(arr) {
  result = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[i + 1]) {
      for (let j = arr[i]; j <= arr[i + 1]; j++) {
        if (arr[j] === arr[i]) {
          break;
        } else {
          result = result + 1;
        }
      }
      return result;
    }
  }
}

function solution(statues) {
  statues.forEach((value, index) => {
    statues.forEach((value2, index2) => {
      if (value != value2) {
        if (value < value2) {
          let a = (b = 0);
          a = statues[index];
          b = statues[index2];
          statues[index] = b;
          statues[index2] = a;
        }
      }
    });
  });
  let start = undefined;
  let result = 0;
  for (let i = 0; i < statues.length; i++) {
    if (statues[i+1] - statues[i] > 1) {
        result += statues[i+1] - statues[i] - 1;
    }
  }
  return result;
}

let test = [7, 1, 5, 3, 9];

console.log(solution(test));
// console.log(findMissingNumbers(test))
