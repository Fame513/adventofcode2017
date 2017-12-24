import {getInput, getTestFunction} from './helper';

const DAY = 16;

const startPosition = 'abcdefghijklmnop';

export class Move {
  move: string;
  data: (string | number)[];
}

// test();
// run().then(([result1, result2]) => {
//   console.log('Part 1:', result1);
//   console.log('Part 2:', result2);
// });

function calculatePart1(pos: string, input: Move[]): string {
  for (let move of input) {
    switch (move.move) {
      case 's': {
        pos = spin(pos, move.data[0] as number);
        break;
      }
      case 'x': {
        pos = exchange(pos, move.data[0] as number, move.data[1] as number);
        break;
      }
      case 'p': {
        pos = partner(pos, move.data[0] as string, move.data[1] as string);
        break
      }
    }
  }
  return pos;
}

function calculateMask(pos: string): number[] {
  let result: number[] = [];
  for (let i = 0; i < pos.length; i++) {
    result.push(pos.charCodeAt(i) - 97);
  }
  return result;
}

function calculatePart2(pos: string, input: Move[]): string {
  input = input.filter(move => move.move !== 'p');
  const firstDance = calculatePart1(pos, input);
  let mask = calculateMask(firstDance);
  let arr: number[];
  for(let j = 0; j < 9; j++) {
    arr = new Array(pos.length).fill(0).map((v, i) => i);
    for (let i = 0; i < 10; i++) {
      let newArr: number[] = [];
      for (let newPos of mask) {
        newArr.push(arr[newPos]);
      }
      arr = newArr;
    }
    mask = arr;
  }
  let newString = '';
  for (let index of arr) {
    newString += pos[index];
  }
  return newString;
}

function spin(pos: string, count: number): string {
  count = count % pos.length;
  if (count === 0)
    return pos;
  const end = pos.slice(-count);
  const start = pos.slice(0, pos.length - count);
  return end + start
}

function exchange(pas: string, from: number, to: number): string {
  const arr: string[] = pas.split('');
  [arr[from], arr[to]] = [arr[to], arr[from]];
  return arr.join('');
}

function partner(pos: string, nameA: string, nameB: string): string {
  return exchange(pos, pos.indexOf(nameA), pos.indexOf(nameB));
}

function parse(input: string): Move[] {
  const regexp = /([sxp])([a-z0-9]+)\/?([a-z0-9]+)?/;
  return input.split(',')
    .map(row => regexp.exec(row))
    .map(result => {
      const move = new Move();
      move.move = result[1];
      move.data = [result[2], result[3]];
      return move;
    });
}

export async function run() {
  const input = await getInput(DAY);
  const parsed = parse(input);
  return [calculatePart1(startPosition, parsed), calculatePart2(startPosition, parsed)]
}

function test() {
  console.log('spinTest');
  const spinTest = getTestFunction(input => spin(input[0], input[1]));
  spinTest(['abcde', 1], 'eabcd');
  spinTest(['abcde', 3], 'cdeab');
  spinTest(['abcde', 5], 'abcde');
  spinTest(['abcde', 6], 'eabcd');
  console.log('---------------------');

  console.log('exchangeTest');
  const exchangeTest = getTestFunction(input => exchange(input[0], input[1], input[2]));
  exchangeTest(['eabcd', 3, 4], 'eabdc');
  exchangeTest(['eabcd', 4, 3], 'eabdc');
  exchangeTest(['abcde', 1, 3], 'adcbe');
  console.log('---------------------');

  console.log('partnerTest');
  const partnerTest = getTestFunction(input => partner(input[0], input[1], input[2]));
  partnerTest(['eabdc', 'e', 'b'], 'baedc');
  partnerTest(['eabdc', 'b', 'e'], 'baedc');
  partnerTest(['abcde', 'a', 'e'], 'ebcda');
  console.log('---------------------');

  console.log('Test part 1');
  const test1 = `s1,x3/4,pe/b`;
  const testPart1 = getTestFunction(input => calculatePart1('abcde', parse(input)));
  testPart1(test1, 'baedc');
  console.log('---------------------');

  // console.log('Test part 2');
  // const testPart2 = getTestFunction(input => calculatePart2('abcde', parse(input)));
  // testPart2(test1, 'ceadb');
  // console.log('---------------------');
}

