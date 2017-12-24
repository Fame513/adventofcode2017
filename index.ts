declare function require(name:string);

(async() => {
  for (let i = 1; i <= 24; i++) {
    console.log(`\x1b[32m*** Day ${i} ***\x1b[0m`);
   await require(`./day${i}`).run().then(([result1, result2]) => {
      console.log('\x1b[36mPart 1:\x1b[0m', result1);
      console.log('\x1b[36mPart 2:\x1b[0m', result2);
    })
  }
})();
