import {getInput, getTestFunction} from './helper';

const DAY = 17;

test();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: number, year: number): number {
  const buf = [0];
  let pos = 0;

  for (let i = 1; i < year; i++) {
    pos = ((pos + input) % buf.length) + 1;
    buf.splice(pos, 0, i);
  }
  return buf[pos + 1]
}

function calculatePart2(input: number, year: number): number {
  let result = 0;
  let pos = 0;
  for (let i = 1; i < year; i++) {
    pos = ((pos + input) % i) + 1;
    if (pos === 1)
      result = i;
  }
  return result;
}

async function run() {
  const input = await getInput(DAY);
  return [calculatePart1(+input, 2018), calculatePart2(+input, 50000001)]
}

function test() {
  const testPart1 = getTestFunction(input => calculatePart1(input[0], input[1]));
  testPart1([3, 2018], 638);
  console.log('---------------------');

  const testPart2 = getTestFunction(input => calculatePart2(input[0], input[1]));
  testPart2([3, 10], 9);
  console.log('---------------------');
}