import {getInput, getTestFunction} from './helper';

const DAY = 11;


/**
 *       \ n  /
 *     nw +--+ ne
 *       /    \
 *     -+      +-
 *       \    /
 *     sw +--+ se
 *       / s  \
 */

const map = {
  'n':  {x: 0,   y:   1 },
  's':  {x: 0,   y:  -1 },
  'nw': {x: -1,  y:   0.5},
  'sw': {x: -1,  y:  -0.5},
  'ne': {x: 1,   y:   0.5},
  'se': {x: 1,   y:  -0.5}
};

// test();
// run().then(([result1, result2]) => {
//   console.log('Part 1:', result1);
//   console.log('Part 2:', result2);
// });

function calculatePart1(input: string[]): number {
  let x = 0, y = 0;
  for(let move of input) {
    x += map[move].x;
    y += map[move].y;
  }

  return getLength(x, y);
}

function getLength(x: number, y: number): number {
  return Math.abs(x)/2 + Math.abs(y);
}

function calculatePart2(input: string[]): number {
  let x = 0, y = 0, maxLength = 0;
  for(let move of input) {
    x += map[move].x;
    y += map[move].y;
    maxLength = Math.max(maxLength, getLength(x, y))
  }

  return maxLength;
}


function parse(input: string): string[] {
  return input.split(',')
}

export async function run() {
  const input = await getInput(DAY);
  const parsed = parse(input);
  return [calculatePart1(parsed), calculatePart2(parsed)]
}

function test() {
  const testPart1 = getTestFunction(input => calculatePart1(parse(input)));
  testPart1('ne,ne,ne', 3);
  testPart1('ne,ne,sw,sw', 0);
  testPart1('ne,ne,s,s', 2);
  testPart1('se,sw,se,sw,sw', 3);
  console.log('---------------------');

  const testPart2 = getTestFunction(input => calculatePart2(parse(input)));
  testPart2('ne,ne,ne', 3);
  testPart2('ne,ne,sw,sw', 2);
  testPart2('ne,ne,s,s', 2);
  testPart2('se,sw,se,sw,sw', 3);
  console.log('---------------------');
}
