'use strict';

const fs = require('fs');
let contents = [];
/**
 * Our module exports a single function that expects an array of files
 * @type {function(*=)}
 */
module.exports = exports = (files, callback) => {
  readAll([...files],callback);
  contents = [];
  console.log(`These are the files past and to be read ${files}`);
  console.log(`If the data from the previous console comes from an array, this console will show the file name of the second element in the array: ${files[1]}`);

};

/**
 * This wraps the fs module, primarily so that we can more easily write tests around it.
 * @param file
 * @param callback
 */
const readMyFile = (file, callback) => {
  fs.readFile( file, (err, fileContents) => {
    console.log(`This is a test to make sure the variable for file1 exists: ${fileContents}`);
    if(err) { callback(err); }
    else { callback(null, fileContents); }
  });
};
// const readTwo = (file, callback) => {
//   fs.readFile( file, (err, data) => {
//     console.log(`This is a test to make sure the variable for file2 exists: ${file}`);
//     if(err) { callback(err); }
//     else { callback(undefined, data); }
//   });
// };
// const readThree = (file, callback) => {
//   fs.readFile( file, (err, data) => {
//     console.log(`This is a test to make sure the variable for file3 exists: ${file}`);
//     if(err) { callback(err); }
//     else { callback(undefined, data); }
//   });
// };

/**
 * Reads and returns the contents of 3 files
 * Requires 3 paths, otherwise, it'll fail with aggression
 * @param paths
 */
const readAll = (paths, callback) => {

  let contents = [];
  // let splitPath = paths[0].split('/');
  // let firstSplitFile = splitPath[1]; 
  readMyFile(paths[0], (err, fileContents) => {
    console.log(`This is what the data variable looks like ${fileContents}`);
    if (err) {
      callback(err);
    }
    else {
      // console.log(`Read File 1 for reals ${firstSplitFile}`);
      // let splitPath = paths[0].split('/');
      contents.push(fileContents.toString().trim());
      readMyFile(paths[1], (err, fileContents) => {
        if (err) {
          callback(err);
        }
        else {
          console.log('Read File 2');
          contents.push(fileContents.toString().trim());
          readMyFile(paths[2], (err, fileContents) => {
            if (err) {
              callback(err);
            }
            else {
              console.log('Read File 3');
              contents.push(fileContents.toString().trim());
              console.log(`This is the contents array ${contents}`);
            }
          });
        }
      });
    }
  });

  // readTwo(paths[1], (err, data) => {
  //   if (err) {
  //     callback(err);
  //   }
  //   else {
  //     console.log('Read File 2');
  //     contents.push(data.toString().trim());
  //   }
  // });

  // readThree(paths[2], (err, data) => {
  //   if (err) {
  //     callback(err);
  //   }
  //   else {
  //     console.log('Read File 3');
  //     contents.push(data.toString().trim());
  //   }
  // });

  callback(undefined, contents);
};

