import {getInput, getTestFunction} from './helper';

const DAY = 24;

let minIniput = Infinity;

// test();
// run().then(([result1, result2]) => {
//   console.log('Part 1:', result1);
//   console.log('Part 2:', result2);
// });

function calculatePart1(input: [number, number][], start: number) {
  if (start === undefined || !input || input.length === 0 ) {
    return 0;
  }
  
  let max = 0;
  for (let i = 0; i < input.length; i++) {
    let sideIndex = input[i].indexOf(start);
    if (sideIndex >= 0) {
      let res = calculatePart1(input.filter((v, ind) => ind !== i), input[i][1 - sideIndex]);
      max = Math.max(max, res + input[i][0] + input[i][1]);
    }
  }
  
  return max;
}

function calculatePart2(input: [number, number][], start: number) {
  minIniput = Math.min(input.length, minIniput);
  if (start === undefined || !input || input.length === 0 ) {
    return 0;
  }

  let max = 0;
  for (let i = 0; i < input.length; i++) {
    let sideIndex = input[i].indexOf(start);
    if (sideIndex >= 0) {
      let res = calculatePart2(input.filter((v, ind) => ind !== i), input[i][1 - sideIndex]);
      if (res !== 0 || minIniput === input.length - 1)
        max = Math.max(max, res + input[i][0] + input[i][1]);
    }
  }

  return max;
}

function parse(input: string): [number, number][] {
  const regexp = /(\d+)\/(\d+)/;
  return input.split('\n')
    .map(row => regexp.exec(row))
    .map(result => [+result[1], +result[2]] as [number, number]);
}

export async function run() {
  const input = await getInput(DAY);
  const parsed = parse(input);
  minIniput = Infinity;
  return [calculatePart1(parsed, 0), calculatePart2(parsed, 0)]
}

function test() {
  const test1 = `0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`;
  const testPart1 = getTestFunction(input => calculatePart1(parse(input), 0));
  testPart1(test1, 31);
  console.log('---------------------');

  const testPart2 = getTestFunction(input => calculatePart2(parse(input), 0));
  testPart2(test1, 19);
  console.log('---------------------');
}