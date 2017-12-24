import {getInput, getTestFunction} from './helper';

const DAY = 15;

const factorA = 16807;
const factorB = 48271;
const maxVal = 2147483647;

const criteriaA = 4;
const criteriaB = 8;

// test();
// run().then(([result1, result2]) => {
//   console.log('Part 1:', result1);
//   console.log('Part 2:', result2);
// });


function calculatePart1(input: number[]) {
  let result = 0;
  let A = input[0];
  let B = input[1];
  for (let i = 0; i < 40000000; i++) {
    A = getValueWithCriteria(A , factorA);
    B = getValueWithCriteria(B , factorB);
    if (A % 0x10000 === B % 0x10000) {
      result++;
    }
  }
  return result;
}

function getValueWithCriteria(val: number, factor: number, criteria: number = 1): number {
  do {
    val = (val * factor) % maxVal;
  } while (val % criteria !== 0);
  return val;
}

function calculatePart2(input) {
  let result = 0;
  let A = input[0];
  let B = input[1];
  for (let i = 0; i < 5000000; i++) {
    A = getValueWithCriteria(A , factorA, criteriaA);
    B = getValueWithCriteria(B , factorB, criteriaB);
    if (A % 0x10000 === B % 0x10000) {
      result++;
    }
  }
  return result;
}

function parse(input: string): number[] {
  const regexp = /Generator . starts with (\d+)/;
  return input.split('\n')
    .map(row => regexp.exec(row))
    .map(res => +res[1]);
}

export async function run() {
  const input = await getInput(DAY);
  const parsed = parse(input);
  return [calculatePart1(parsed), calculatePart2(parsed)]
}

function test() {
  const test1 = `Generator A starts with 65
Generator B starts with 8921`;
  const testPart1 = getTestFunction(input => calculatePart1(parse(input)));
  testPart1(test1, 588);
  console.log('---------------------');

  const testPart2 = getTestFunction(input => calculatePart2(parse(input)));
  testPart2(test1, 309);
  console.log('---------------------');
}