#!/usr/bin/env node

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });
const params = {
  min: 0,
  max: 100,
  get num() {
    if (this._ === undefined) {
      this._ = Math.round(Math.random() * this.max);
    }
    return this._
  },
  moves: 0
}

rl.write(`Загадано число в диапазоне от ${params.min} до ${params.max} \n`)

rl.on('line', input => {
  if (input < params.min || input > params.max) {
    rl.write('Число вне диапазона \n');
  } else {
    if (input < params.num) {
      rl.write('Больше \n')
      params.moves++;
    } else if (input > params.num) {
      rl.write('Меньше \n')
      params.moves++;
    } else if (+input === params.num) {
      rl.write(`Отгадано число ${params.num} за ${params.moves} шагов`)
      rl.close();
    }
  }
})