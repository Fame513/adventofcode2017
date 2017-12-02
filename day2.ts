import {getInput, getTestFunctin} from './helper';

const DAY = 2;

test();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: number[][]): number {
  let result = 0;
  for (const row of input) {
    let min = Infinity;
    let max = -Infinity;
    for(const item of row) {
      if (item < min)
        min = item;
      if (item > max)
        max = item
    }
    result += (max - min);
  }
  return result;
}

function calculatePart2(input: number[][]): number {
  let result = 0;
  row: for (const row of input) {
     for(let i = 0; i < row.length; i++) {
      for(let j = i+1; j < row.length; j++) {
        if (row[i] % row[j] === 0) {
          result += row[i] / row[j];
          continue row;
        }
        if (row[j] % row[i] === 0) {
          result += row[j] / row[i];
          continue row;
        }
      }
    }
  }
  return result;
}


function parse(input: string): number[][] {
  const regexp = /\d+/g;
  return input.split('\n')
    .map(row => row.match(regexp)
      .map(val => +val))
}

async function run() {
  const input = await getInput(DAY);
  const parsed: number[][] = parse(input);
  return [calculatePart1(parsed), calculatePart2(parsed)]
}

function test() {
  const test1 =
`5 1 9 5
 7 5 3
 2 4 6 8`;
  const testPart1 = getTestFunctin(input => calculatePart1(parse(input)));
  testPart1(test1, 18);

  const test2 =
`5 9 2 8
9 4 7 3
3 8 6 5`;
  const testPart2 = getTestFunctin(input => calculatePart2(parse(input)));
  testPart2(test2, 9);

}