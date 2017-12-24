import {getInput, getTestFunction} from './helper';

const DAY = 3;

// test();
// run().then(([result1, result2]) => {
//   console.log('Part 1:', result1);
//   console.log('Part 2:', result2);
// });

function calculatePart1(input: number): number {
  const pos = getPos(input);
  return Math.abs(pos[0]) + Math.abs(pos[1]);
}

function calculatePart1_2(input: number): number {
  const rowSize = Math.ceil(Math.sqrt(input)) & -2;
  const maxValueInCircle = Math.pow(rowSize + 1, 2);
  return rowSize - (((maxValueInCircle - input) % rowSize) || 0);
}


function calculatePart2(input: number): number {
  let result = 1;
  let i = 2;
  const map = {'0,0': 1};
  while (result <= input) {
    const pos = getPos(i);
    result = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x || y)
          result+= (+map[posToString([pos[0]+x, pos[1]+y])]) || 0
      }
    }
    map[posToString(pos)] = result;
    i++
  }

  return result;
}

function posToString(pos: [number, number]): string {
  return pos[0].toString() + ',' + pos[1].toString();
}

function getPos(input: number): [number, number] {
  const map = [[1, 1], [-1, 1], [-1,-1], [1, -1]];
  const rowSize = Math.ceil(Math.sqrt(input)) & -2;
  const pos = rowSize / 2;
  const maxValueInCircle = Math.pow(rowSize + 1, 2);
  const side = Math.floor((maxValueInCircle - input) / rowSize) || 0;
  const diff = ((maxValueInCircle - input) % rowSize) || 0;
  return (side % 2) ? [pos * map[side][0], (pos - diff) * map[side][1]] :
                      [(pos - diff) * map[side][0], pos * map[side][1]];
}

function getPos_2(input: number): [number, number] {
  let steps = 0;
  let index = 1;
  let x = 0;
  let y = 0;
  while (true) {
    if (index === input)
      return [x, y];
    steps++;
    for (let i = 0; i < steps; i++) {
      index++;
      x++;
      if (index === input)
        return [x, y];
    }
    for (let i = 0; i < steps; i++) {
      index++;
      y--;
      if (index === input)
        return [x, y];
    }
    steps++;
    for (let i = 0; i < steps; i++) {
      index++;
      x--;
      if (index === input)
        return [x, y];
    }
    for (let i = 0; i < steps; i++) {
      index++;
      y++;
      if (index === input)
        return [x, y];
    }
  }
}


export async function run() {
  const input = +(await getInput(DAY));
  return [calculatePart1(input), calculatePart2(input)]
}

function test() {
  const testPart1 = getTestFunction(calculatePart1);
  testPart1(1, 0);
  testPart1(12, 3);
  testPart1(23, 2);
  testPart1(1024, 31);
  console.log('---------------------');


  const testPart2 = getTestFunction(calculatePart2);
  testPart2(1, 2);
  testPart2(2, 4);
  testPart2(4, 5);
  testPart2(7, 10);
  testPart2(10, 11);
  testPart2(16, 23);
  testPart2(100, 122);
  testPart2(351, 362);
  console.log('---------------------');

}