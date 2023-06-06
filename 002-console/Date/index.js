#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const getDate = yargs(hideBin(process.argv))

// Текущая дата и время в формате ISO
getDate.command({
  command: 'current',
  describe: 'Get current date and time in ISO format',
  handler: function () {
    console.log(new Date().toISOString());
  }
});

// Текущий год
getDate.command({
  command: 'current-year',
  describe: 'Get current year',
  handler: function () {
    console.log(new Date().getFullYear());
  }
});

// Текущий месяц
getDate.command({
  command: 'current-month',
  describe: 'Get current month',
  handler: function () {
    console.log(new Date().getMonth() + 1);
  }
});

// Дата в календарном месяце
getDate.command({
  command: 'current-date',
  describe: 'Get current date in the calendar month',
  handler: function () {
    console.log(new Date().getDate());
  }
});

// Дата в будущем
getDate.command({
  command: 'add',
  describe: 'Add time to current date and time',
  builder: {
    'd': {
      describe: 'Days to add',
      demandOption: true,
      type: 'number'
    },
    'm': {
      describe: 'Months to add',
      demandOption: true,
      type: 'number'
    },
  },
  handler: function (argv) {
    const date = new Date();
    if (argv.d) {
      date.setDate(date.getDate() + argv.d);
    }
    if (argv.m) {
      date.setMonth(date.getMonth() + argv.m);
    }
    console.log(date.toISOString());
  }
});

// Дата в прошлом
getDate.command({
  command: 'sub',
  describe: 'Subtract time from current date and time',
  builder: {
    'd': {
      describe: 'Days to subtract',
      demandOption: true,
      type: 'number'
    },
    'm': {
      describe: 'Months to subtract',
      demandOption: true,
      type: 'number'
    },
  },
  handler: function (argv) {
    const date = new Date();
    if (argv.d) {
      date.setDate(date.getDate() - argv.d);
    }
    if (argv.m) {
      date.setMonth(date.getMonth() - argv.m);
    }
    console.log(date.toISOString());
  }
});

getDate.parse();