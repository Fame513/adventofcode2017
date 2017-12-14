import {getInput, getTestFunction} from './helper';
import {hash} from './day10';

const DAY = 14;

test();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input) {
  let result = 0;
  for (let i = 0; i < 128; i++) {
    const str = input + '-' + i;
    const h = hash(str);
    for(let c of h) {
      let bin = parseInt(c, 16).toString(2);
      for(let d of bin) {
        if (d ==='1') {
          result++;
        }
      }
    }
  }
  return result;
}

function calculatePart2(input) {
  const map: number[][] = [];
  for (let i = 0; i < 128; i++) {
    const str = input + '-' + i;
    const h = hash(str);
    let row: number[] = [];
    for(let c of h) {
      let bin = ('0000' + parseInt(c, 16).toString(2)).slice(-4);
      for(let d of bin) {
        row.push(+d)
      }
    }
    map.push(row);
  }
  return getAreasCount(map);
}

function getAreasCount(map: number[][]): number {
  let result = 0;
  for (let row = 0; row < map.length; row++) {
    for (let column = 0; column < map[row].length; column++) {
      if (map[row][column] === 1) {
        result++;
        clearArea(map, row, column);
      }
    }
  }
  return result;
}

function clearArea(map: number[][], row: number, column: number) {
  map[row][column] = 0;
  if (row > 0 && map[row - 1][column] === 1)
    clearArea(map, row-1, column);
  if (row < map.length - 1 &&  map[row + 1][column] === 1)
    clearArea(map, row + 1, column)
  if (column > 0 &&  map[row][column - 1] === 1)
    clearArea(map, row, column - 1)
  if (column < map[row].length - 1 &&  map[row][column + 1] === 1)
    clearArea(map, row, column + 1);
}

async function run() {
  const input = await getInput(DAY);
  return [calculatePart1(input), calculatePart2(input)]
}

function test() {
  const test1 = `flqrgnkx`;
  const testPart1 = getTestFunction(input => calculatePart1(input));
  testPart1(test1, 8108);
  console.log('---------------------');

  const testPart2 = getTestFunction(input => calculatePart2(input));
  testPart2(test1, 1242);
  console.log('---------------------');
}