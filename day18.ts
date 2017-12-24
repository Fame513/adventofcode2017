import {getInput, getTestFunction} from './helper';

const DAY = 18;

export class Command {
  cmd: string;
  data: any[];
}

// test();
// run().then(([result1, result2]) => {
//   console.log('Part 1:', result1);
//   console.log('Part 2:', result2);
// });

function calculatePart1(input: Command[]) {
  let data: {[reg: string]: number} = {};
  let play: number[] = [];

  let result = 0;
  let cursor = 0;
  while (!result) {
    let cmd = input[cursor];
    switch (cmd.cmd) {
      case 'snd': {
        snd1(cmd.data[0], data, play);
        break;
      }
      case 'set': {
        set(cmd.data[0], cmd.data[1], data);
        break;
      }
      case 'add': {
        add(cmd.data[0], cmd.data[1], data);
        break;
      }
      case 'mul': {
        mul(cmd.data[0], cmd.data[1], data);
        break;
      }
      case 'mod': {
        mod(cmd.data[0], cmd.data[1], data);
        break;
      }
      case 'rcv': {
        result = rcv1(cmd.data[0], data, play);
        break;
      }
      case 'jgz': {
        let val = jgz(cmd.data[0], cmd.data[1], data);
        cursor += (val === undefined) ? 0 : (val - 1);
        break;
      }
    }

    cursor++;
  }
  return result;
}

function calculatePart2(input: Command[]): number {
  let result = 0;
  const threads = [{
    data: {p: 0},
    queue: [],
    cursor: 0
  }, {
    data: {p: 1},
    queue: [],
    cursor: 0
  }];

  let thread = 0;


  let sv = false;
  loop: while (true) {
    let cmd = input[threads[thread].cursor];
    let data = threads[thread].data;
    switch (cmd.cmd) {
      case 'snd': {
        if (thread === 1)
          result++;
        snd2(cmd.data[0], data, threads[thread].queue);
        break;
      }
      case 'set': {
        set(cmd.data[0], cmd.data[1], data);
        break;
      }
      case 'add': {
        add(cmd.data[0], cmd.data[1], data);
        break;
      }
      case 'mul': {
        mul(cmd.data[0], cmd.data[1], data);
        break;
      }
      case 'mod': {
        mod(cmd.data[0], cmd.data[1], data);
        break;
      }
      case 'rcv': {
        let val = rcv2(cmd.data[0], data, threads[thread === 1 ? 0 : 1].queue);
        if (val === undefined) {
          if (sv) break loop;
          sv = true;
          thread = thread === 1 ? 0 : 1;
          continue;
        }
        break;
      }
      case 'jgz': {
        let val = jgz(cmd.data[0], cmd.data[1], data);
        threads[thread].cursor += (val === undefined) ? 0 : (val - 1);
        break;
      }
    }
    sv = false;
    threads[thread].cursor++;
  }

  return result;
}

function getRegOrVal(reg: string, data: {[reg: string]: number}) {
  const int = parseInt(reg);

  return isNaN(int) ? (data[reg] || 0) : int;
}

function snd1(reg: string, data: {[reg: string]: number}, play: number[]) {
  const val = getRegOrVal(reg, data);
  play.push(val);
}

function snd2(reg: string, data: {[reg: string]: number}, queue: number[]) {
  const val = getRegOrVal(reg, data);
  queue.push(val);
}

function set(reg: string, val: string | number, data: {[reg: string]: number}) {
  data[reg] = getRegOrVal(val.toString(), data);
}

function add(reg: string, val: string, data: {[reg: string]: number}) {
  set(reg, getRegOrVal(reg, data) + getRegOrVal(val, data), data);
}

function mul(reg: string, val: string, data: {[reg: string]: number}) {
  set(reg, getRegOrVal(reg, data) * getRegOrVal(val, data), data);
}

function mod(reg: string, val: string, data: {[reg: string]: number}) {
  set(reg, getRegOrVal(reg, data) % getRegOrVal(val, data), data);
}

function rcv1(reg: string, data: {[reg: string]: number}, play: number[]): number {
  let val = getRegOrVal(reg, data);
  if (val !== 0)
    return play[play.length - 1];
}

function rcv2(reg: string, data: {[reg: string]: number}, queue: number[]): number {
  let val = queue.shift();
  if (val !== undefined)
    set(reg, val, data);
  return val;
}

function jgz(cond: string, val: string, data: {[reg: string]: number}):number {
  if (getRegOrVal(cond, data) > 0)
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

export async function run() {
  const input = await getInput(DAY);
  const parsed = parse(input);
  return [calculatePart1(parsed), calculatePart2(parsed)]
}

function test() {
  const test1 = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;
  const testPart1 = getTestFunction(input => calculatePart1(parse(input)));
  testPart1(test1, 4);
  console.log('---------------------');

  const test2 = `snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`;
  const testPart2 = getTestFunction(input => calculatePart2(parse(input)));
  testPart2(test2, 3);
  console.log('---------------------');
}

