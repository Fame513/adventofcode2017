import {getInput, getTestFunction} from './helper';

const DAY = 23;

export class Command {
  cmd: string;
  data: any[];
}

run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: Command[]): number {
  let data: {[reg: string]: number} = {};
  let size = input.length; 
  
  let result = 0;
  let cursor = 0;
  while (cursor < size) {
    let cmd = input[cursor];
    switch (cmd.cmd) {
      case 'set': {
        set(cmd.data[0], cmd.data[1], data);
        break;
      }
      case 'sub': {
        sub(cmd.data[0], cmd.data[1], data);
        break;
      }
      case 'mul': {
        result++;
        mul(cmd.data[0], cmd.data[1], data);
        break;
      }
      case 'jnz': {
        let val = jnz(cmd.data[0], cmd.data[1], data);
        cursor += (val === undefined) ? 0 : (val - 1);
        break;
      }
    }
    
    cursor++;
  }
  return result;
}

function calculatePart2(input: Command[]): number {
  let data: {[reg: string]: number} = {'a': 1};
  let size = input.length;
  
  let cursor = 0;
  while (cursor < size) {
    let cmd = input[cursor];
    switch (cmd.cmd) {
      case 'set': {
        set(cmd.data[0], cmd.data[1], data);
        break;
      }
      case 'sub': {
        sub(cmd.data[0], cmd.data[1], data);
        break;
      }
      case 'mul': {
        mul(cmd.data[0], cmd.data[1], data);
        break;
      }
      case 'jnz': {
        let val = jnz(cmd.data[0], cmd.data[1], data);
        cursor += (val === undefined) ? 0 : (val - 1);
        break;
      }
    }

    cursor++;
  }
  return data['h'];
}

function getRegOrVal(reg: string, data: {[reg: string]: number}) {
  const int = parseInt(reg);

  return isNaN(int) ? (data[reg] || 0) : int;
}

function set(reg: string, val: string | number, data: {[reg: string]: number}) {
  data[reg] = getRegOrVal(val.toString(), data);
}

function sub(reg: string, val: string, data: {[reg: string]: number}) {
  set(reg, getRegOrVal(reg, data) - getRegOrVal(val, data), data);
}

function mul(reg: string, val: string, data: {[reg: string]: number}) {
  set(reg, getRegOrVal(reg, data) * getRegOrVal(val, data), data);
}

function jnz(cond: string, val: string, data: {[reg: string]: number}):number {
  if (getRegOrVal(cond, data) !== 0)
    return getRegOrVal(val, data);
}

function parse(input: string): Command[] {
  const regexp = /([a-z]{3})\s(\S*)\s?(\S*)?/;
  return input.split('\n')
    .map(row => regexp.exec(row))
    .map(res => {
      const cmd = new Command();
      cmd.cmd = res[1];
      cmd.data = [res[2], res[3]];
      return cmd
    });
}

function prog(): number {
let a = 1, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0;

  b = 99;
  c = b;
  if (a !== 0) {
    b = (b * 100) + 100000;
    c = b + 17000;
  }
  for (;b <= c; b += 17) {
    for (d = 2; d < b; d++) {
      if (b % d === 0) {
        h++;
        break;
      }
    }
  }
  return h;
  
}

async function run() {
  const input = await getInput(DAY);
  const parsed = parse(input);
  return [calculatePart1(parsed), prog()]
}