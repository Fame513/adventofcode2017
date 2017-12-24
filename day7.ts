import {getInput, getTestFunction} from './helper';

const DAY = 7;

// test();
// run().then(([result1, result2]) => {
//   console.log('Part 1:', result1);
//   console.log('Part 2:', result2);
// });

function calculatePart1(input: Tower[]): string {
  return getBaseTowerName(input);
}

function calculatePart2(input: Tower[]): number {
  const towerMap = createTowerMap(input);
  const baseTowerName = getBaseTowerName(input);

  return checkTowerBalance(baseTowerName, towerMap);

}

function checkTowerBalance(name: string, towerMap: {[name: string]: Tower}): number {
  try {
    getTowerWeight(name, towerMap)
  } catch (e) {
    const resultMap = {};
    for (let weight of e.subWeights) {
      if (resultMap[weight]) {
        resultMap[weight] = resultMap[weight] + 1
      } else {
        resultMap[weight] = 1;
      }
    }
    let good = 0;
    let bad = 0;
    for(let key in resultMap) {
      if (resultMap[key] === 1)
        bad = +key;
      else
        good = +key;
    }

    let diff = good - bad;
    const badIndex = e.subWeights.indexOf(bad);
    const badName = e.subTowers[badIndex];
    const badTower = towerMap[badName];
    return badTower.weight + diff;
  }
  return 0;
}

function getTowerWeight(name: string, towerMap: {[name: string]: Tower}): number {
  const baseWeight: number = towerMap[name].weight;
  const subWeights: number[] = [];
  for (const subTowerName of towerMap[name].children) {
    subWeights.push(getTowerWeight(subTowerName, towerMap));
  }

  for(let i = 0; i < subWeights.length - 1; i++) {
    if (subWeights[i] !== subWeights[i+1])
      throw {subWeights: subWeights, subTowers: towerMap[name].children};
  }

  return baseWeight + subWeights.reduce((acc, v) => acc += v, 0)
}


function getBaseTowerName(towers: Tower[]): string {
  const parentMap = createParentMap(towers);

  let towerName = towers[0].name;

  while (parentMap[towerName])
    towerName = parentMap[towerName];

  return towerName;
}

function createParentMap(towers: Tower[]): {[name: string]: string} {
  const map: {[name: string]: string} = {};
  for (const tower of towers) {
    for (const child of tower.children) {
      map[child] = tower.name;
    }
  }
  return map;
}

function createTowerMap(towers: Tower[]): {[name: string]: Tower}{
  const map: {[name: string]: Tower} = {};
  for (const tower of towers) {
    map[tower.name] = tower;
  }
  return map;
}


function parse(input: string): Tower[]  {
  const regexp = /([a-z]+)\s\((\d+)\)(\s\-\>\s([a-z,\s]+))?/;
  return input.split('\n')
    .map(row => regexp.exec(row))
    .map(result => ({
      name: result[1],
      weight: +result[2],
      children: result[4] ? result[4].split(', ') : []
    }))
}

export async function run() {
  const input = await getInput(DAY);
  const parsed = parse(input);
  return [calculatePart1(parsed), calculatePart2(parsed)]
}

function test() {
  const test = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`;
  const testPart1 = getTestFunction(input => calculatePart1(parse(input)));
  testPart1(test, 'tknk');
  console.log('---------------------');

  const testPart2 = getTestFunction(input => calculatePart2(parse(input)));
  testPart2(test, 60);
  console.log('---------------------');

}

interface Tower {
  name: string;
  weight: number;
  children: string[];
}