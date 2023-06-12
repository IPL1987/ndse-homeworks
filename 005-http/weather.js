#!/usr/bin/env node

const http = require('http');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
require('dotenv').config();

const apiKey = process.env.WEATHER_API_KEY;
const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${argv.city}`;

http.get(url, (response) => {
  const { statusCode } = response;

  if (statusCode !== 200) {
    console.log('Error: ', statusCode)
    return
  }

  response.setEncoding('utf8')
  let rowDate = '';
  response.on('data', chunk => rowDate += chunk)
  response.on('end', () => {
    let parseData = JSON.parse(rowDate)

    if (argv._[0]) {
      console.log('Location: ', parseData.location)
      console.log(argv._[0], parseData.current[argv._[0]])
    }
    else {
      console.log('Location: ', parseData.location)
      console.log('Current: ', parseData.current)
    }

  })
}).on('error', (err) => console.log('Error ', err))