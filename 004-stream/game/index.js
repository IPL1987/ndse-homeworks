#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');
const path = require('path')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// генерируе случайное число (1 или 2)
function generateRandomNumber() {
  return Math.round(Math.random());
}

// Функция для записи результатов в лог-файл
function logResult(result, logFile) {
  fs.appendFileSync(logFile, `${result}\n`, 'utf8');
}

function playGame(logFile) {
  console.log('Сыграем в "Орёл или решка"!');

  rl.question('Введите число: 0 - орёл, 1 - решка: ', (guess) => {
    const parsedGuess = parseInt(guess);

    if (isNaN(parsedGuess) || (parsedGuess !== 0 && parsedGuess !== 1)) {
      console.log('Пожалуйста, введите 0 или 1.');
      playGame(logFile);
    } else {
      const result = generateRandomNumber();
      const resultText = (result === parsedGuess) ? 'Верно!' : 'Вы не угадали.';

      console.log(`Результат: ${resultText}`);
      logResult(resultText, logFile);

      rl.question('Еще разок? (y/n): ', (playAgain) => {
        if (playAgain.toLowerCase() === 'y') {
          playGame(logFile);
        } else {
          console.log('Спасибо за игру. До свидания!');
          rl.close();
        }
      });
    }
  });
}

// Создаем файл логирования
const logFileName = path.join(__dirname, 'log.txt');
console.log(`Результаты будут сохранены в файле: ${logFileName}`);

// Очищаем логи перед началом игры
fs.writeFileSync(logFileName, '', 'utf8');

playGame(logFileName);

// const yargs = require('yargs/yargs')
// const { hideBin } = require('yargs/helpers')
// const argv = yargs(hideBin(process.argv)).argv
// const path = require('path');
// const fs = require("fs");
// const readline = require('node:readline');

// random = Math.round(Math.random())

// let rl = readline.createInterface(process.stdin, process.stdout),
//   userInput = q => {
//     return new Promise((res) => {
//       rl.question(q, answer => {
//         res(answer);
//       })
//     });
//   };

// (async function main() {
//   const fileName = path.join(__dirname, 'log.txt');

//   if (argv.logs) {
//     getStatistics(fileName)
//     rl.close();
//   }
//   else {
//     console.log(`Сыграем а орел или решка! Загадано число (0 или 1)`)

//     let answer = await userInput('Введи 0 или 1: ')

//     if (+answer !== random) {
//       console.log('Ты проиграл!')
//       victory = false
//       await mainSaveFileLogic( victory, fileName)
//       rl.close();
//     } else {
//       console.log('Ты выиграл!')
//       victory = true
//       await mainSaveFileLogic( victory, fileName)
//       rl.close();
//     }
//   }

// })();

// async function saveFile(jsonData, fileName) {
//   fs.writeFile(fileName, jsonData, (err) => {
//     if (err) console.log(err);
//   });
// }

// function createJsonData( attempts) {
//   return JSON.stringify([{ attempts }])
// }

// async function mainSaveFileLogic( victory, fileName) {

//   let dataJson = createJsonData(victory)

//   // Проверяем наличие файлы
//   fs.access(fileName, (error) => {
//     // Если файла нет - создаем и сохраняем начальный json
//     if (error) saveFile(dataJson, fileName);
//     else {
//       // Если файл существуем, то создаем новый объект
//       let player = { victory };
//       // Парсим json и добавляем в конец созданный объект
//       let playersJSON = fs.readFileSync(fileName, "utf-8"),
//         players = JSON.parse(playersJSON);
//         players.push(player)

//       // Пересохраняем файл
//       saveFile(JSON.stringify(players), fileName);
//     }
//   });
// }

// function getStatistics(fileName) {

//   let playersJSON = fs.readFileSync(fileName, "utf-8"),
//     players = JSON.parse(playersJSON);

//   let wins = players.filter(player => player.victory === true),
//     lose = players.filter(player => player.victory === false),
//     winPercent = ((wins.length * 100) / players.length),
//     losePercent = ((lose.length * 100) / players.length);

//   console.log('Статистика игры:')
//   console.log('Общее количество партий: ', players.length)
//   console.log('Количество побед: ', wins.length)
//   console.log('Количество поражений: ', lose.length)
//   console.log('Процент побед: ', winPercent, '%')
//   console.log('Процент поражений: ', losePercent, '%')
// }