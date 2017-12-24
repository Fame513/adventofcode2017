import {getInput, getTestFunction} from './helper';

const DAY = 22;

// test();
// run().then(([result1, result2]) => {
//   console.log('Part 1:', result1);
//   console.log('Part 2:', result2);
// });

function calculatePart1([input, [width, height]]: [Map<string, string>, [number, number]], iterations: number): number {
  let result = 0;
  const dirMap = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  let x = Math.floor(width / 2);
  let y = Math.floor(height / 2);
  let dir = iterations * 4;
  
  for( let i = 0; i < iterations; i++) {
    let pos = `${x}_${y}`;
    if (input.get(pos) === '#') {
      dir++;
      input.set(pos, '.');
    } else {
      dir--;
      input.set(pos, '#');
      result++;
    }
    
    x+= dirMap[dir % 4][0];
    y+= dirMap[dir % 4][1];
  }

  return result;
}

function calculatePart2([input, [width, height]]: [Map<string, string>, [number, number]], iterations: number): number {
  let result = 0;
  const dirMap = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  let x = Math.floor(width / 2);
  let y = Math.floor(height / 2);
  let dir = iterations * 4;

  for (let i = 0; i < iterations; i++) {
    let pos = `${x}_${y}`;
    if (input.get(pos) === '#') {
      dir++;
      input.set(pos, 'F');
    } else if (input.get(pos) === 'W') {
      result++;
      input.set(pos, '#');
    } else if (input.get(pos) === 'F') {
      dir += 2;
      input.set(pos, '.');
    } else {
      dir--;
      input.set(pos, 'W');
    }
      
    x += dirMap[dir % 4][0];
    y += dirMap[dir % 4][1];
  }
  return result
}

function parse(input: string): [Map<string, string>, [number, number]] {
  const map: Map<string, string> = new Map();
  let arr: string[][] =  input.split('\n')
    .map(row => row.split(''));
  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      map.set(`${x}_${y}`, arr[y][x]);
    }
  }
  
  return [map, [arr[0].length, arr.length]]
}

export async function run() {
  const input = await getInput(DAY);
  const parsed1 = parse(input);
  const parsed2 = parse(input);
  return [calculatePart1(parsed1, 10000), calculatePart2(parsed2, 10000000)]
}

function test() {
  const test1 = `..#
#..
...`;
  const testPart1 = getTestFunction(input => calculatePart1(parse(input), 10000));
  testPart1(test1, 5587);
  console.log('---------------------');

  const testPart2 = getTestFunction(input => calculatePart2(parse(input), 10000000));
  testPart2(test1, 2511944);
  console.log('---------------------');
}