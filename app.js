import { Game } from './game.js';


let game = new Game(7, 3);
game.board = [6, 5, 4];


console.log(game.board)
game.printBoard();

let matDecomp = game.binaryDecomposition();
for (let i = 0; i < matDecomp.length; i++) {
    console.log(matDecomp[i].reverse());
function fillBoard() {
    let nRows = 10;
    let nCols = 5;

    let board = [3, 10, 6, 2, 8];
    let boardElem = document.getElementById('board');

    for (let i = 0; i < nCols; i++) {
        let colElem = document.createElement('span');
        for (let j = 0; j < board[i]; j++) {
            let circleWrap = document.createElement('div');
            circleWrap.className = 'circleWrap';
            circleWrap.style.width = `50px`;
            circleWrap.style.height = `50px`;

            let circle = document.createElement('div');
            circle.className = 'circle';
            circle.style.width = '100%';
            circle.style.height = '100%';
            circleWrap.appendChild(circle);

            colElem.appendChild(circleWrap);
        }
        boardElem.appendChild(colElem);
    }
}

console.log('\n\n');


game.doBestPlay();

console.log(game.board)
game.printBoard();

matDecomp = game.binaryDecomposition();
for (let i = 0; i < matDecomp.length; i++) {
    console.log(matDecomp[i].reverse());
}
window.onload = () => fillBoard();