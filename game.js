export class Game {
    constructor(_nUIRows, _nUICols, _difficulty) {
        // os números de rows e cols aqui são referentes à como é exibido na tela
        // por motivos de praticidade, esses valores são invertidos na modelagem
        this.nUIRows = _nUIRows;
        this.nUICols = _nUICols;

        this.nRows = _nUICols;
        this.nCols = _nUIRows;

        if (_difficulty < 0 || _difficulty > 10) {
            throw 'A dificuldade precisa ser entre 0 e 10';
        }
        this.difficulty = _difficulty;
        this.newBoard();
    }
    newBoard() {
        this.board = [];
        for (let i = 0; i < this.nRows; i++) {
            // 1 sendo o valor mínimo da coluna
            this.board[i] = Math.floor(Math.random() * (this.nCols - 1)) + 1;
        }
    }
    printBoard() {
        let message = '';


        binaryDecomposition() {
            let highestPowerPossible = Math.floor(Math.sqrt(this.nCols));
            // copiando os valores, para não alterar o original
            let decompBoard = this.board.slice();
            let matDecomp = [];
            for (let i = 0; i < this.nRows; i++) {
                let colDecomp = [];
                for (let j = highestPowerPossible; j >= 0; j--) {
                    let two_powered = Math.pow(2, j);
                    if (decompBoard[i] >= two_powered) {
                        colDecomp[j] = 1;
                        decompBoard[i] -= two_powered;
                    } else {
                        colDecomp[j] = 0;
                    }
                }
                matDecomp[i] = colDecomp;
            }
            return matDecomp;
        }
        isBalanced() {
            let matDecomp = this.binaryDecomposition();
            for (let i = 0; i < this.nRows; i++) {
                for (let j = 0; j < matDecomp[i].length; j++) {
                    if (j % 2 == 1 && matDecomp[i][j] != 0) {
                        return false;
                    }
                }
            }
            return true;
        }
    
    
        canEndInNextMove() {
            let count = 0;
            for (let i = 0; i < this.nRows; i++) {
                if (this.board[i] > 0) {
                    count++;
                }
            }
            return (count == 1);
        }
    
    
        getFirstUnbalancedRow() {
            let matDecomp = this.binaryDecomposition();


            let row = Math.floor(Math.random() * possibleMoves.length);

            // quantidade aleatória
            if (amountToRemove == -1) {
            if (amountToRemove == null) {
                amountToRemove = Math.floor(Math.random() * (this.board[row] - 1)) + 1;
            }
    
            this.play(possibleMoves[col], amountToRemove);
            this.play(possibleMoves[row], amountToRemove);
        }
    
    
        doBestMove() {
            if (this.isBalanced()) {
            if (this.canEndInNextMove()) {
                for (let i = 0; i < this.nRows; i++) {
                    if (this.board[i] > 0) {
                        this.play(i, this.board[i]);
                        break;
                    }
                }
            }
            else if (this.isBalanced()) {
                // play random move
                this.doRandomMove(1)
            } else {



                doAIMove() {
                    if (Math.floor(Math.random() * 10) > this.difficulty) {
                    if (Math.floor(Math.random() * 10) < this.difficulty) {
                        this.doBestMove();
                    } else {
                        this.doRandomMove(-1);
                        this.doRandomMove();
                    }
                }