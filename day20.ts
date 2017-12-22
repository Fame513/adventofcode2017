import {getInput, getTestFunction} from './helper';

const DAY = 20;

function calculatePart1(input: Particle[]): number {
  let result = 0;
  let min = Infinity;
  for (let i = 0; i < input.length; i++) {
    const distance = input[i].getDistance(Number.MAX_SAFE_INTEGER);
    if (distance < min) {
      min = distance;
      result = i;
    }
  }
    
  return result;
}

function calculatePart2(input: Particle[]) {
  const collapsed: Set<number> = new Set();
  for(let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (input[i].isCollapse(input[j])) {
        collapsed.add(i);
        collapsed.add(j);
      }
    }
  }
  
  
  // for (let t = 0; t < 1000; t++) {
  //   if (t % 1000 === 0) {
  //     // console.log(t);
  //   } 
  //   let map: {[pos: string]: number[]} = {};
  //   for (let i = 0; i < input.length; i++) {
  //     if (collapsed.has(i)) {
  //       continue;
  //     }
  //     let pos = input[i].getPos(t);
  //     let index = `${pos.x}_${pos.y}_${pos.z}`;
  //     if (!map[index])
  //       map[index] = [];
  //     map[index].push(i);
  //   }
  //   for (let pos in map) {
  //     if (map[pos].length > 1) {
  //       let cols = map[pos];
  //       for (let col of cols) {
  //         collapsed.add(col);
  //       }
  //     }
  //   }
  // }

  return input.length - collapsed.size;
}

function parse(input: string): Particle[] {
  const regexp = /p=<(.+)>, v=<(.+)>, a=<(.+)>/;
  return input.split('\n')
    .map(row => regexp.exec(row))
    .map(res => new Particle(
      new Vector(res[1].split(',')),
      new Vector(res[2].split(',')),
      new Vector(res[3].split(','))
      ));
}

async function run() {
  const input = await getInput(DAY);
  const parsed = parse(input);
  return [calculatePart1(parsed), calculatePart2(parsed)]
}

function test() {
  const test1 = `p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>`;
  console.log(parse(test1));
  const testPart1 = getTestFunction(input => calculatePart1(parse(input)));
  testPart1(test1, 0);
  console.log('---------------------');

  const test2 = `p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>    
p=<-4,0,0>, v=<2,0,0>, a=<0,0,0>   
p=<-2,0,0>, v=<1,0,0>, a=<0,0,0> 
p=<3,0,0>, v=<-1,0,0>, a=<0,0,0>`;
  const testPart2 = getTestFunction(input => calculatePart2(parse(input)));
  testPart2(test2, 1);
  console.log('---------------------');
}

function qE(a: number, b: number, c: number): number[] {
  if (a === 0) {
    return [-b / c];
  }
  let r1 = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
  let r2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
  let result: number[] = [];
  if (r1 && r1 > 0)
    result.push(r1);
  if (r2 && r2 > 0)
    result.push(r2);
  return result;
}

export class Vector {
  x: number;
  y: number;
  z: number;
  
  constructor(args: any[]) {
    this.x = +args[0];
    this.y = +args[1];
    this.z = +args[2];
  }
}

export class Particle {
  p: Vector;
  v: Vector;
  a: Vector;
  
  constructor(p: Vector, v: Vector, a: Vector) {
    this.p = p;
    this.v = v;
    this.a = a;
  }
  
  getPos(time: number = 0): Vector {
    return {
      x: this.p.x + this.getProgressSum(this.v.x, this.a.x, time),
      y: this.p.y + this.getProgressSum(this.v.y, this.a.y, time),
      z: this.p.z + this.getProgressSum(this.v.z, this.a.z, time)
    }
  }
  
  getDistance(time: number = 0): number {
    let pos = this.getPos(time);
    return Math.abs(pos.x) + Math.abs(pos.y) + Math.abs(pos.z);
  }
  
  isCollapse(part: Particle): boolean {
    let ax = (this.a.x - part.a.x) / 2;
    let bx = (this.v.x - part.v.x);
    let cx = (this.p.x - part.p.x);
    let qex = qE(ax, bx, cx);

    let ay = (this.a.y - part.a.y) / 2;
    let by = (this.v.y - part.v.y);
    let cy = (this.p.y - part.p.y);
    let qey = qE(ay, by, cy);

    let az = (this.a.z - part.a.z) / 2;
    let bz = (this.v.z - part.v.z);
    let cz = (this.p.z - part.p.z);
    let qez = qE(az, bz, cz);
    
    for(let val of qex) {
      console.log(val);
      if (qey.indexOf(val) >= 0 && qez.indexOf(val) >= 0) {
        return true;
      }
    }
    return false;
  }
  
  private getProgressSum(a: number, d: number, n: number): number {
    return ((2*a + d*(n - 1))/2)*n;
  }

}

test();
// run().then(([result1, result2]) => {
//   console.log('Part 1:', result1);
//   console.log('Part 2:', result2);
// });
