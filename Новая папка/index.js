const fs = require('fs')
const path = require('path')

console.log(path.parse(__dirname));
console.log(path.join(__filename, 'test', '..', '//demo.txt'));

const dir = path.join(__dirname, 'demo')
fs.mkdir(dir, (err) => {
  if (err) throw Error(err)
  console.log('Ok!');
})

const file = path.join(__dirname, 'demo', 'new.txt')
const text = 'Hello \n'
fs.writeFile(file, text, (err) => {
  if (err) throw Error(err)
  console.log('Done');
})
fs.appendFile(file, text, (err) => {
  if (err) throw Error(err)
  console.log('Done');
})

fs.readFile(file, 'utf-8', (err, data) => {
  if (err) throw Error(err)
  console.log(data);
})