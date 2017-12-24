import {getInput, getTestFunction} from './helper';

const DAY = 9;

// test();
// run().then(([result1, result2]) => {
//   console.log('Part 1:', result1);
//   console.log('Part 2:', result2);
// });


function calculatePart1(input) {
  let isInGarbage = false;
  let ignoreNext = false;

  let result = 0;
  let deep = 0;
  for(const c of input) {
    if (ignoreNext) {
      ignoreNext = false;
      continue;
    }
    switch (c) {
      case '{': {
        if (!isInGarbage)
          deep++;
        break
      }
      case '}': {
        if (!isInGarbage) {
          result += deep;
          deep--;
        }
        break
      }
      case '!': {
        ignoreNext = true;
        break
      }
      case '<': {
        isInGarbage = true;
        break;
      }
      case '>': {
        isInGarbage = false;
        break
      }
    }
   }
  return result;
}

function calculatePart2(input) {
  let isInGarbage = false;
  let ignoreNext = false;

  let result = 0;
  for(const c of input) {
    if(isInGarbage)
      result++;

    if (ignoreNext) {
      ignoreNext = false;
      result--;
      continue;
    }
    switch (c) {
      case '!': {
        ignoreNext = true;
        result--;
        break
      }
      case '<': {
        isInGarbage = true;
        break;
      }
      case '>': {
        result--;
        isInGarbage = false;
        break
      }
    }
  }
  return result;
}


export async function run() {
  const input = await getInput(DAY);
  return [calculatePart1(input), calculatePart2(input)]
}

function test() {
  const testPart1 = getTestFunction(input => calculatePart1(input));
  testPart1('{}', 1);
  testPart1('{{{}}}', 6);
  testPart1('{{},{}}', 5);
  testPart1('{{{},{},{{}}}}', 16);
  testPart1('{<a>,<a>,<a>,<a>}', 1);
  testPart1('{{<ab>},{<ab>},{<ab>},{<ab>}}', 9);
  testPart1('{{<!!>},{<!!>},{<!!>},{<!!>}}', 9);
  testPart1('{{<a!>},{<a!>},{<a!>},{<ab>}}', 3);
  console.log('-------------------');

  const testPart2 = getTestFunction(input => calculatePart2(input));
  testPart2('<>', 0);
  testPart2('<random characters>', 17);
  testPart2('<<<<>', 3);
  testPart2('<{!>}>', 2);
  testPart2('<!!>', 0);
  testPart2('<!!!>>', 0);
  testPart2('<{o"i!a,<{i<a>', 10);
  console.log('-------------------');


}