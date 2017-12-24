import {getInput, getTestFunction} from './helper';

const DAY = 13;

// test();
// run().then(([result1, result2]) => {
//   console.log('Part 1:', result1);
//   console.log('Part 2:', result2);
// });

function calculatePart1(input: Map<number, number>): number {
  let result = 0;
    input.forEach((range, step) => {
      if (!canCross(step, range))
        result += range * step;
    });
  return result;
}

function calculatePart2(input: Map<number, number>) {
  let delay = 0;
  let done = false;
  while (!done) {
    done = true;
    input.forEach((range, step) => {
      if (!canCross(step, range, delay)) {
        done = false;
        delay++;
      }
    });
  }
  return delay;
}

function canCross(step: number, range: number, delay: number = 0): boolean {
  return (step + delay) % (range * 2 - 2) !== 0;
}

function parse(input: string): Map<number, number> {
  const result: Map<number, number> = new Map();
  const regexp = /(\d+):\s(\d+)/;
  input.split('\n')
    .map(row => regexp.exec(row))
    .map(res => result.set(+res[1], +res[2]));
  return result;
}

export async function run() {
  const input = await getInput(DAY);
  const parsed = parse(input);
  return [calculatePart1(parsed), calculatePart2(parsed)]
}

function test() {
  const test1 = `0: 3
1: 2
4: 4
6: 4`;
  const testPart1 = getTestFunction(input => calculatePart1(parse(input)));
  testPart1(test1, 24);
  console.log('---------------------');

  const testPart2 = getTestFunction(input => calculatePart2(parse(input)));
  testPart2(test1, 10);
  console.log('---------------------');
}