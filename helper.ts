declare const require: any;
const http = require('http');

const session = '53616c7465645f5ff606a55b6e6a43c5ed75d0a3a2e357ee6caa1f99231c79436bc89a8bcb7b24b62ff34df27bd8c8ae';

type strOrNum = string | number;

export function getInput(day: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const options = {
      host: 'adventofcode.com',
      path: `/2017/day/${day}/input`,
      headers: {Cookie: `session=${session}`}
    };

    const req = http.request(options, function(response) {
      let str = '';

      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        resolve(str.trim());
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  })
}

export function getTestFunctin(call: (input) => strOrNum): (data: strOrNum, expected: strOrNum) => boolean {
  return (data: string, expected: strOrNum) => {
    const actual = call(data);
    if (actual == expected)
      console.log('\x1b[32mSuccess test\x1b[0m:\x1b[36m', data,'\x1b[32m', actual, '\x1b[0m');
    else
      console.log('\x1b[31mFail test\x1b[0m:\x1b[36m', data, '\x1b[0mexpected:\x1b[33m', expected, '\x1b[0mactual:\x1b[31m', actual);

    return actual == expected;
  }
}