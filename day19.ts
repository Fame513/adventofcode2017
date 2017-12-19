import {getInput, getTestFunction} from './helper';

const DAY = 19;

test();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: string[]) {
  let direction = 'd';
  let result = '';
  let y = 0;
  let x = input[y].indexOf('|');

  while (true) {
    if (input[y][x] >= 'A' && input[y][x] <= 'Z') {
      result += input[y][x];
    }
    else if (input[y][x] === '+') {
      if (direction === 'd' || direction === 'u') {
        direction = (input[y][x - 1] !== ' ') ? 'l' : 'r';
      } else if (direction === 'l' || direction === 'r') {
        direction = (input[y - 1][x] !== ' ') ? 'u' : 'd';
      }
    }
    else if (input[y][x] === ' ') {
      break;
    }

    if (direction === 'd') y++;
    else if (direction === 'u') y--;
    else if (direction === 'l') x--;
    else if (direction === 'r') x++;
  }

  return result;
}

function calculatePart2(input: string[]) {
  let direction = 'd';
  let result = 0;
  let y = 0;
  let x = input[y].indexOf('|');

  while (true) {
    if (input[y][x] === '+') {
      if (direction === 'd' || direction === 'u') {
        direction = (input[y][x - 1] !== ' ') ? 'l' : 'r';
      } else if (direction === 'l' || direction === 'r') {
        direction = (input[y - 1][x] !== ' ') ? 'u' : 'd';
      }
    }
    else if (input[y][x] === ' ') {
      break;
    }

    if (direction === 'd') y++;
    else if (direction === 'u') y--;
    else if (direction === 'l') x--;
    else if (direction === 'r') x++;
    result++;
  }

  return result;
}


function parse(input: string): string[] {
  return input.split('\n');
}

async function run() {
  const input = await getInput(DAY);
  const parsed = parse(input);
  while (parsed[0].length < parsed[1].length)
    parsed[0] = " " + parsed[0];
  while (parsed[parsed.length - 1].length < parsed[1].length)
    parsed[parsed.length - 1] += " ";
  return [calculatePart1(parsed), calculatePart2(parsed)]
}

function test() {
  const test1 =
    `     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ `;
  const testPart1 = getTestFunction(input => calculatePart1(parse(input)));
  testPart1(test1, 'ABCDEF');
  console.log('---------------------');

  const testPart2 = getTestFunction(input => calculatePart2(parse(input)));
  testPart2(test1, 38);
  console.log('---------------------');
}
