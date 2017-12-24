import {getInput, getTestFunction} from './helper';

const DAY = 8;

let registers: {[reg: string]: number} = {};

// test();
// run().then(([result1, result2]) => {
//   console.log('Part 1:', result1);
//   console.log('Part 2:', result2);
// });

function calculatePart1(input: Command[]): number {
  registers = {};
  for (let command of input) {
    exec(command);
  }
  let result = -Infinity;
  for (let reg in registers) {
    if (registers[reg] > result)
      result = registers[reg];
  }
  return result;
}


function calculatePart2(input: Command[]): number {
  registers = {};
  let result = -Infinity;

  for (let command of input) {
    exec(command);
    if (getVal(command.reg) > result)
      result = getVal(command.reg);
  }
  return result;
}


function getVal(reg: string): number {
  return  registers[reg] = registers[reg] ? registers[reg] : 0;
}

function inc(reg: string, val: number) {
  registers[reg] = registers[reg] ? registers[reg] + val : val;
}

function dec(reg: string, val: number) {
  registers[reg] = registers[reg] ? registers[reg] - val : -val;
}

function exec(command: Command) {
  if (canAction(command)) {
    switch (command.action) {
      case 'inc': {
        inc(command.reg, command.val);
        break;
      }
      case  'dec': {
        dec(command.reg, command.val);
        break;
      }
    }
  }
}

function canAction(command: Command) {
  switch (command.condition) {
    case '>':
      return getVal(command.conditionReg) > command.conditionVal;
    case '<':
      return getVal(command.conditionReg) < command.conditionVal;
    case '>=':
      return getVal(command.conditionReg) >= command.conditionVal;
    case '<=':
      return getVal(command.conditionReg) <= command.conditionVal;
    case '==':
      return getVal(command.conditionReg) === command.conditionVal;
    case '!=':
      return getVal(command.conditionReg) != command.conditionVal;
  }
}

function parse(input: string): Command[] {
  const regexp = /([a-z]+)\s(inc|dec)\s(-?\d+)\sif\s([a-z]+)\s([><=!]{1,2})\s(-?\d+)/;
  return input.split('\n')
    .map(row => regexp.exec(row))
    .map(result => ({reg: result[1], action: result[2], val: +result[3],
     conditionReg: result[4], condition: result[5], conditionVal: +result[6]} as Command))
}

export async function run() {
  const input = await getInput(DAY);
  const parsed = parse(input);
  return [calculatePart1(parsed), calculatePart2(parsed)]
}

function test() {
  const test = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`;

  registers = {};
  const testPart1 = getTestFunction(input => calculatePart1(parse(input)));
  testPart1(test, 1);
  console.log('---------------------');

  registers = {};
  const testPart2 = getTestFunction(input => calculatePart2(parse(input)));
  testPart2(test, 10);
  console.log('---------------------');

}

interface Command {
  reg: string;
  action: string;
  val: number;
  condition: string;
  conditionReg: string;
  conditionVal: number;
}