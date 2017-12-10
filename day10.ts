import {getInput, getTestFunction} from './helper';

const DAY = 10;

test();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: number[], length: number = 256): number {
  let arr = getInitArray(length);
  let position = 0;
  let skipSize = 0;
  for(let size of input) {
    arr = revers(arr, position, size);
    position = (position + size + skipSize) % length;
    skipSize++;
  }
  return arr[0] * arr[1];
}

function calculatePart2(input: number[], length: number = 256): string {
  let arr = getInitArray(length);
  let position = 0;
  let skipSize = 0;
  for (let i = 0; i < 64; i++) {
    for (let size of input) {
      arr = revers(arr, position, size);
      position = (position + size + skipSize) % length;
      skipSize++;
    }
  }

  return getHash(arr);

}


function getInitArray(length: number): number[]{
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(i);
  }
  return result;
}

function revers(arr: number[], start: number, length: number): number[] {
  let result = arr.slice();
  let startLength = start + length - arr.length;
  startLength = startLength < 0 ? 0 : startLength;
  let endLength: number = length - startLength;
  let endArr: number[] = result.slice(start, start + endLength);
  let startArr: number[] = result.slice(0, startLength);
  let subArr: number[] = endArr.concat(startArr);
  let reversedArr = subArr.reverse();
  result.splice(start, endLength, ...reversedArr.slice(0, endLength));
  result.splice(0, startLength, ...reversedArr.slice(endLength));
  return result;
}

function getHash(arr: number[]): string {
  let result = '';
  for(let shift = 0; shift < arr.length; shift+= 16) {
    let buff = 0;
    for (let i = shift; i < shift + 16; i++) {
      buff ^= arr[i];
    }
    result += ('00' + buff.toString(16)).substr(-2);
  }
  return result;
}

function getCharSequence(str: string): number[] {
  const result = [];
  for (let i = 0; i < str.length; i++) {
    result.push(str.charCodeAt(i))
  }
  return result.concat([17, 31, 73, 47, 23]);
}

function parse(input: string): number[] {
  return input.split(',')
    .map(val => +(val.trim()))
}

async function run() {
  const input = await getInput(DAY);
  const parsed = parse(input);
  const parsed2 = getCharSequence(input);
  return [calculatePart1(parsed), calculatePart2(parsed2)]
}

function test() {
  const test = `3, 4, 1, 5`;
  const testPart1 = getTestFunction(input => calculatePart1(parse(input), 5));
  testPart1(test, 12);
  console.log('-------------------------');

  const testPart2 = getTestFunction(input => calculatePart2(getCharSequence(input)));
  testPart2('', 'a2582a3a0e66e6e86e3812dcb672a272');
  testPart2('AoC 2017', '33efeb34ea91902bb2f59c9920caa6cd');
  testPart2('1,2,3', '3efbe78a8d82f29979031a4aa0b16a9d');
  testPart2('1,2,4', '63960835bcdc130f0b66d7ff4f6a5a8e');
  console.log('-------------------------');

}