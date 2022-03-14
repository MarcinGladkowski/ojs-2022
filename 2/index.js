const gameConstructor = require('./game')
const game = new gameConstructor()

game.move('rock', 'paper')
game.move('scissors', 'scissors')
game.move('paper', 'scissors')
game.move('paper', 'rock')

const storedGame = JSON.stringify(game)
const loadedGame = JSON.parse(storedGame)

const instanceToLoadState = new gameConstructor(loadedGame.p1Wins, loadedGame.p2Wins);

instanceToLoadState.move('paper', 'scissors')
