'use strict';

const fs = require('fs');
//hard coded
let file = './files/test.txt';
//from command line
// let file = process.argv.slice[2][0];

const randomInput = (Math.floor(Math.random() * (20 - 10) + 10));

//data represent data read from the test.txt file

// module.exports = exports = (file, callback) => {
fs.readFile( file, (err, data) => {
  if(err) { throw err; }
  console.log(`Random number before write function ${data}`);
  
  fs.writeFile( file, randomInput, (err) => {
    if (err) throw err;
    // console.log(`Random number after write function ${randomInput}`);
    fs.readFile(file, (err, data) => {
      if(err) { throw err;}
      console.log(`Random number written after modifying the write function ${data}`);
    });
  });
});