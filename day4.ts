import {getInput, getTestFunction} from './helper';

const DAY = 4;

// test();
// run().then(([result1, result2]) => {
//   console.log('Part 1:', result1);
//   console.log('Part 2:', result2);
// });

function calculatePart1(input: string[][]): number {
  let result = 0;
    for (const row of input) {
      if (isValidPart1(row))
        result++;
    }
  return result;
}

function calculatePart2(input) {
  let result = 0;
  for (const row of input) {
    if (isValidPart2(row))
      result++;
  }
  return result;
}

function isValidPart1(input: string[]): boolean {
  const map = {};
  for (const word of input) {
    if (map[word])
      return false;
    map[word] = true;
  }
  return true;
}

function isValidPart2(input: string[]): boolean {
  const map = {};
  for (const word of input) {
    const sortedWord = word.split('').sort().join('');
    if (map[sortedWord])
      return false;
    map[sortedWord] = true;
  }
  return true;
}



function parse(input: string) {
  const regexp = /\S+/g;
  return input.split('\n')
    .map(row => row.match(regexp))
}

export async function run() {
  const input = await getInput(DAY);
  const parsed = parse(input);
  return [calculatePart1(parsed), calculatePart2(parsed)]
}

function test() {
  const testPart1 = getTestFunction(input => isValidPart1(input.match(/\S+/g)));
  testPart1('aa bb cc dd ee', true);
  testPart1('aa bb cc dd aa', false);
  testPart1('aa bb cc dd aaa', true);
  console.log('---------------------');

  const testPart2 = getTestFunction(input => isValidPart2(input.match(/\S+/g)));
  testPart2('abcde fghij', true);
  testPart2('abcde xyz ecdab', false);
  testPart2('a ab abc abd abf abj', true);
  testPart2('iiii oiii ooii oooi oooo', true);
  testPart2('oiii ioii iioi iiio', false);
  console.log('---------------------');

}