import {getInput, getTestFunction} from './helper';

const DAY = 10;

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
  const regexp = /\S+/g;
  return input.split('\n')
    .map(row => row.match(regexp))
}

async function run() {
  const input = await getInput(DAY);
  const parsed = parse(input);
  return [calculatePart1(parsed), calculatePart2(parsed)]
}

function test() {
  const test = ``;
  const testPart1 = getTestFunction(input => calculatePart1(parse(input)));
  testPart1(test, 0);

  const testPart2 = getTestFunction(input => calculatePart2(parse(input)));
  testPart2(test, 0);

}