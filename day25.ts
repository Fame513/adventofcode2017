import {getInput, getTestFunction} from './helper';

const DAY = 25

class Rule {
  write: number;
  move: number;
  nextState: string;


  constructor(write: number, move: number, nextState: string) {
    this.write = write;
    this.move = move;
    this.nextState = nextState;
  }
}

// test();
// run().then(([result1, result2]) => {
//   console.log('Part 1:', result1);
//   console.log('Part 2:', result2);
// });

function calculatePart1([input, state, stepCount]: [Map<string, [Rule, Rule]>, string, number]): number {
  let pos = 0;
  let data = {};
  
  for (let i = 0; i < stepCount; i++) {
    let rule = input.get(state)[data[pos.toString()] ? 1 : 0];
    data[pos.toString()] = rule.write;
    pos += rule.move;
    state = rule.nextState;
  }
  let result = 0;
  for (let i in data) {
    result += data[i];
  }
  return result;
}

function parse(input: string): [Map<string, [Rule, Rule]>, string, number] {
  let start: string;
  let steps: number;
  const startRegexp = /Begin in state ([A-Z])\.\nPerform a diagnostic checksum after (\d+) steps\./
  const startResult = startRegexp.exec(input);
  [start, steps] = [startResult[1], +startResult[2]];
  
  const regexp = /In state ([A-Z]):\n\s+If the current value is \d:\n\s+- Write the value (\d)\.\n\s+- Move one slot to the (right|left)\.\n\s+- Continue with state ([A-Z])\.\n\s+If the current value is \d:\n\s+- Write the value (\d)\.\n\s+- Move one slot to the (right|left)\.\n\s+- Continue with state ([A-Z])\./g
  let res;
  let map: Map<string, [Rule, Rule]> = new Map();
  while ((res = regexp.exec(input)) !== null) {
    let rule1: Rule = new Rule(+res[2], res[3] === 'right' ? 1 : -1, res[4]);
    let rule2: Rule = new Rule(+res[5], res[6] === 'right' ? 1 : -1, res[7]);
    map.set(res[1], [rule1, rule2]);
  }
  return [map, start, steps];
}

export async function run() {
  const input = await getInput(DAY);
  const parsed = parse(input);
  return [calculatePart1(parsed), '']
}

function test() {
  const test1 = `Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.`;
  const testPart1 = getTestFunction(input => calculatePart1(parse(input)));
  testPart1(test1, 3);
  console.log('---------------------');
}

