const fs = require('fs')

// const read = fs.createReadStream('./index.js')
// console.log(read);
// let data
// read
//   .setEncoding('utf-8')
//   .on('data', (parts) => {
//     data += parts
//   })
//   .on('end', () => {
//     console.log('end', data);
//   })

  // const text = 'Hello'
  // const write = fs.createWriteStream('./demo/output.txt')
  // write.write(text, 'utf8');
  // write.end()

  // write.on('finish', () => {
  //   console.log("Ok!");
  // })
  // write.on('close', () => {
  //   console.log("Close");
  // })
  // write.on('error', () => {
  //   console.error("Not Ok!");
  // })

  let read_1 = fs.createReadStream('./package.json')
  let write_2 = fs.createWriteStream('./demo/output.txt')
  read_1.pipe(write_2)