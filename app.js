import { Game } from './game.js';


let game = new Game(7, 3);
game.board = [6, 5, 4];


console.log(game.board)
game.printBoard();

let matDecomp = game.binaryDecomposition();
for (let i = 0; i < matDecomp.length; i++) {
    console.log(matDecomp[i].reverse());
}

console.log('\n\n');


game.doBestPlay();

console.log(game.board)
game.printBoard();

matDecomp = game.binaryDecomposition();
for (let i = 0; i < matDecomp.length; i++) {
    console.log(matDecomp[i].reverse());
}