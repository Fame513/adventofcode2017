declare const require: any;
const http = require('http');

const session = '53616c7465645f5f910f34789fd99b65c4e7a84f3eb3161b9088eb70c2f0e89ef871d10b4d826510b43ed72e86e56cc8';

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

export function getTestFunction(call: (input) => any): (data: any, expected: any) => boolean {
  return (data: string, expected: any) => {
    const actual = call(data);
    if (actual === expected)
      console.log('\x1b[32mSuccess test\x1b[0m:\x1b[36m', data,'\x1b[32m', actual, '\x1b[0m');
    else
      console.log('\x1b[31mFail test\x1b[0m:\x1b[36m', data, '\x1b[0mexpected:\x1b[33m', expected, '\x1b[0mactual:\x1b[31m', actual);

    return actual == expected;
  }
}