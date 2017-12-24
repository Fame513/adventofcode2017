import {getInput, getTestFunction} from './helper';

const DAY = 12;

let map: Pipe[] = [];

// test();
// run().then(([result1, result2]) => {
//   console.log('Part 1:', result1);
//   console.log('Part 2:', result2);
// });

function calculatePart1(input) {
  map = input;
  const set = getGroup(0);
  map = [];
  return set.size;
}

function calculatePart2(input) {
  map = input;
  const groupSet: Set<number> = new Set()
  for (let i = 0; i < map.length; i++) {
    if (map[i].group === undefined) {
      getGroup(i);
      groupSet.add(i);
    }
  }
  map = [];
  return groupSet.size;
}

function getGroup(start: number): Set<number> {
  const set: Set<number> = new Set();
  const queue = [];
  queue.push(start);
  set.add(start);
  while (queue.length > 0) {
    const index = queue.shift();
    map[index].group = start;
    for (let prog of map[index].connections) {
      if (!set.has(prog)) {
        set.add(prog);
        queue.push(prog);
      }
    }
  }
  return set;
}


function parse(input: string): Pipe[] {
  let map: Pipe[] = [];
  const regexp = /(\d+)\s<->\s(.*)/;
  input.split('\n')
    .map(row => regexp.exec(row))
    .map(res => {
      map[+res[1]] = {connections: res[2].split(', ').map(v => +v.trim())}
    });
  return map;
}

export async function run() {
  const input = await getInput(DAY);
  const parsed1 = parse(input);
  const parsed2 = parse(input);
  return [calculatePart1(parsed1), calculatePart2(parsed2)]
}

function test() {
  const test = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;
  const testPart1 = getTestFunction(input => calculatePart1(parse(input)));
  testPart1(test, 6);
  map = [];
  console.log('---------------------');

  const testPart2 = getTestFunction(input => calculatePart2(parse(input)));
  testPart2(test, 2);
  map = [];
  console.log('---------------------');
}

interface Pipe {
  connections: number[];
  group?: number;
}