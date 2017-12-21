import {getInput, getTestFunction} from './helper';

const DAY = 21;



function calculate(input: Map<Rect, Rect>, iteration: number): number {
  let rect = new Rect('.#./..#/###');
  for(let i = 0; i < iteration; i++) {
   rect = iterate(rect, input);
  }
  return rect.getItemCount('#');
}

function iterate(rect: Rect, rules: Map<Rect, Rect>): Rect {
  let s: number = 0;
  if (rect.size % 2 === 0)
    s = 2;
  else if (rect.size % 3 === 0)
    s = 3;

  let subRects: Rect[][] = [];
  for (let y = 0; y < rect.size; y += s) {
    subRects.push([]);
    for (let x = 0; x < rect.size; x += s) {
      subRects[subRects.length - 1].push(rect.subRect(x, y, s))
    }
  }

  for (let y = 0; y < subRects.length; y++) {
    for (let x = 0; x < subRects.length; x++) {
      subRects[y][x] = convert(subRects[y][x], rules);
    }
  }

  return Rect.toRect(subRects);
}

function convert(rect: Rect, rules: Map<Rect, Rect>): Rect {
  for (let from of rules.keys()) {
    if (rect.same(from)) {
      return rules.get(from);
    }
  }
}

function parse(input: string): Map<Rect, Rect> {
  const regexp = /([.\/#]+) => ([.\/#]+)/;
  const map: Map<Rect, Rect> = new Map();
  input.split('\n')
    .map(row => regexp.exec(row))
    .map(res => map.set(new Rect(res[1]), new Rect(res[2])));
  return map;
}

async function run() {
  const input = await getInput(DAY);
  const parsed = parse(input);
  return [calculate(parsed, 5), calculate(parsed, 18)]
}

function test() {
  const test1 = `../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`;
  const testPart1 = getTestFunction(input => calculate(parse(input), 2));
  testPart1(test1, 12);
  console.log('---------------------');
  
}


export class Rect {
  size: number;
  
  data: string[][] = [];
  
  constructor(data?: string) {
    if (data) {
      let arr = data.split('/');
      this.size = arr.length;
      for (let y = 0; y < arr.length; y++) {
        this.data.push([]);
        for (let x = 0; x < arr.length; x++) {
          this.data[this.data.length - 1].push(arr[y][x]);
        }
      }
    }
  }
  
  subRect(x: number, y: number, size: number): Rect {
    let rect = new Rect();
    rect.size = size;
    for(let j = y; j < y + size; j++) {
      rect.data.push([]);
      for(let i = x; i < x + size; i++){
        rect.data[rect.data.length-1].push(this.data[j][i]);
      }
    }
   return rect; 
  }
  
  static toRect(rects: Rect[][]): Rect {
    let rect = new Rect();
    const subRectSize = rects.length;
    rect.size = subRectSize * rects[0][0].size;
    
    for (let j = 0; j < subRectSize; j++) {
      for (let y = 0; y < rects[0][0].size; y++) {
        rect.data.push([]);
        for (let i = 0; i < subRectSize; i++) {
          for (let x = 0; x < rects[0][0].size; x++) {
            rect.data[rect.data.length-1].push(rects[j][i].data[y][x]);
          }
        }
      }
    }
    return rect;
  }
  
  getItemCount(item: string): number {
    let result = 0;
    for(let y = 0; y < this.size; y++) {
      for(let x = 0; x < this.size; x++) {
        if (this.data[y][x] === item) {
          result++;
        }
      }
    }
    return result;
  }
  
  same(rect: Rect): boolean {
    if (rect.size !== this.size)
      return false;
    let size = this.size;
    let max = size - 1;
    let same = true;
    
    loop: for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (this.data[y][x] !== rect.data[y][x]) {
          same = false;
          break loop;
        }
      }
    }
    if (same) return true;
    same = true;

    loop: for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (this.data[y][x] !== rect.data[x][y]) {
          same = false;
          break loop;
        }
      }
    }
    if (same) return true;
    same = true;

    loop: for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (this.data[y][x] !== rect.data[max - y][x]) {
          same = false;
          break loop;
        }
      }
    }
    if (same) return true;
    same = true;

    loop: for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (this.data[y][x] !== rect.data[x][max - y]) {
          same = false;
          break loop;
        }
      }
    }
    if (same) return true;
    same = true;

    loop: for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (this.data[y][x] !== rect.data[y][max - x]) {
          same = false;
          break loop;
        }
      }
    }
    if (same) return true;
    same = true;

    loop: for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (this.data[y][x] !== rect.data[max - x][y]) {
          same = false;
          break loop;
        }
      }
    }
    if (same) return true;
    same = true;

    loop: for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (this.data[y][x] !== rect.data[max - y][max - x]) {
          same = false;
          break loop;
        }
      }
    }
    if (same) return true;
    same = true;

    loop: for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (this.data[y][x] !== rect.data[max - x][max - y]) {
          same = false;
          break loop;
        }
      }
    }
    if (same) return true;
    
    return false
  }

  log() {
    for(let i = 0; i < this.size; i++) {
      console.log(this.data[i].join(''));
    }
    console.log('______________________________________');
    console.log('');
  }
}


test();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});