import {getInput, getTestFunction} from './helper';

const DAY = 1;

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});



function calculate(input: string, distance: number) {
  let result = 0;
  let size = input.length;
  for (let i = 0; i < size; i++) {
    const a = input[i];
    const b = input[(i + distance) % size];
    if (a === b)
      result += +a;
  }
  return result;
}



async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculate(input, 1);
  const result2 = calculate(input, input.length / 2);
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculate(input, 1));
  const part2Test = getTestFunction((input) => calculate(input, input.length / 2));
  part1Test('1122', 3);
  part1Test('1111', 4);
  part1Test('1234', 0);
  part1Test('91212129', 9);
  console.log('---------------------');

  part2Test('1212', 6);
  part2Test('1221', 0);
  part2Test('123425', 4);
  part2Test('123123', 12);
  part2Test('12131415', 4);
  console.log('---------------------');

}