import {getInput, getTestFunction} from './helper';
const DAY = 6;
test();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});
function calculatePart1(input: number[]) {
  let result = 0;
  const map = {[arrToString(input)]: true};
  while (true) {
    result++;
    rebase(input);
    if (map[arrToString(input)]) {
      return result;
    }
    map[arrToString(input)] = true;
  }
}
function calculatePart2(input: number[]) {
  let result = 0;
  const map = {[arrToString(input)]: 0};
  while (true) {
    result++;
    rebase(input);
    if (map[arrToString(input)]) {
      return result - map[arrToString(input)];
    }
    map[arrToString(input)] = result;
  }
}
function arrToString(arr: number[]): string {
  return arr.join('_');
}
function getMaxIndex(arr: number[]) {
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[max]) {
      max = i;
    }
  }
  return max;
}
function rebase(arr: number[]) {
  let maxIndex = getMaxIndex(arr);
  const size = arr.length;
  let buff = arr[maxIndex];
  arr[maxIndex] = 0;
  while (buff > 0) {
    arr[++maxIndex % size]++;
    buff--;
  }
  return arr;
}
function parse(input: string): number[] {
  return input.split(/\s+/)
    .map(item => +item)
}
async function run() {
  const input = await getInput(DAY);
  const parsed = parse(input);
  return [calculatePart1(parsed), calculatePart2(parsed)]
}
function test() {
  const test = `0 2 7 0`;
  const testPart1 = getTestFunction(input => calculatePart1(parse(input)));
  testPart1(test, 5);
  const testPart2 = getTestFunction(input => calculatePart2(parse(input)));
  testPart2(test, 4);
}