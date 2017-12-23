import {getInput, getTestFunction} from './helper';

const DAY = 24;

test();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input) {
  let result = 0;

  return result;
}

function calculatePart2(input) {
  let result = 0;

  return result;
}

function parse(input: string) {
  const regexp = /\d+/;
  return input.split('\n')
    .map(row => regexp.exec(row));
}

async function run() {
  const input = await getInput(DAY);
  const parsed = parse(input);
  return [calculatePart1(parsed), calculatePart2(parsed)]
}

function test() {
  const test1 = ``;
  const testPart1 = getTestFunction(input => calculatePart1(parse(input)));
  testPart1(test1, 0);
  console.log('---------------------');

  const testPart2 = getTestFunction(input => calculatePart2(parse(input)));
  testPart2(test1, 0);
  console.log('---------------------');
}