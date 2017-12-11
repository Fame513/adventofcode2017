import {getInput, getTestFunction} from './helper';

const DAY = 5;

test();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: number[]): number {
  let result = 0;
  let cursor = 0;
  while ((cursor >= 0) && (cursor < input.length)) {
    cursor += input[cursor]++;
    result++;
  }

  return result;
}

function calculatePart2(input) {
  let result = 0;
  let cursor = 0;
  while ((cursor >= 0) && (cursor < input.length)) {
    cursor += input[cursor] >= 3 ? input[cursor]-- : input[cursor]++;
    result++;
  }

  return result;
}


function parse(input: string): number[] {
  const regexp = /\n+/g;
  return input.split('\n')
    .map(item => +item)
}

async function run() {
  const input = await getInput(DAY);
  const parsed1 = parse(input);
  const parsed2 = parse(input);
  return [calculatePart1(parsed1), calculatePart2(parsed2)]
}

function test() {
  const test = `0 3 0 1 -3`;
  const testPart1 = getTestFunction(input => calculatePart1(input.split(' ').map(v => +v)));
  testPart1(test, 5);
  console.log('---------------------');

  const testPart2 = getTestFunction(input => calculatePart2(input.split(' ').map(v => +v)));
  testPart2(test, 10);
  console.log('---------------------');

}