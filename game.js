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
            this.board[i] = Math.floor(Math.random() * (this.nCols)) + 1;
        }
    }


    printBoard() {
        let message = '';

        for (let i = 0; i < this.nRows; i++) message += ' _';
        message += '\n';

        for (let i = this.nCols; i >= 1; i--) {
            for (let j = 0; j < this.nRows; j++) {
                message += '|';
                if (this.board[j] >= i) {
                    message += 'o';
                } else {
                    message += ' ';
                }
            }
            message += '|\n';
        }

        message += '\n';

        console.log(message);
    }


    isFinalState() {
        for (let i = 0; i < this.nRows; i++) {
            // caso alguma coluna não tenha nenhum elemento sobrando
            if (this.board[i] > 0) {
                return false;
            }
        }
        return true;
    }


    play(row, amount) {
        if (row < 0) {
            throw `Índice da coluna invalido: ${row} menor que 0`
        }
        if (row >= this.nRows) {
            throw `Índice da coluna invalido: ${row} maior ou igual que a quantidade de colunas ${this.nRows}`
        }

        if (this.board[row] < amount) {
            throw `Não é possível remover essa quantidade de elementos da coluna`
        }

        this.board[row] -= amount;
    }


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

        for (let i = 0; i < this.nRows; i++) {
            for (let j = 0; j < matDecomp[i].length; j++) {
                if (j % 2 == 1 && matDecomp[i][j] != 0) {
                    return i;
                }
            }
        }

        return -1;
    }


    doRandomMove(amountToRemove) {
        let possibleMoves = [];
        for (let i = 0; i < this.nRows; i++) {
            if (this.board[i] > 0) {
                possibleMoves.push(i);
            }
        }

        let row = Math.floor(Math.random() * possibleMoves.length);

        // quantidade aleatória
        if (amountToRemove == null) {
            amountToRemove = Math.floor(Math.random() * (this.board[row] - 1)) + 1;
        }

        this.play(possibleMoves[row], amountToRemove);
    }


    doBestMove() {
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
            this.doRandomMove(1);
        } else {
            // try to find a move that balances
            let unbalancedRow = this.getFirstUnbalancedRow();
            if (unbalancedRow == -1) {
                throw 'Isto não deveria acontecer';
            }

            let matDecomp = this.binaryDecomposition();
            let amountToRemove = 0;
            // a inicialização em 1 e o j += 2 são para não somar os valores
            // das colunas de índices pares
            for (let j = 1; j < matDecomp[unbalancedRow].length; j += 2) {
                if (matDecomp[unbalancedRow][j] == 1) {
                    amountToRemove += Math.pow(2, j);
                }
            }

            this.play(unbalancedRow, amountToRemove);
        }
    }


    doAIMove() {
        if (Math.floor(Math.random() * 10) < this.difficulty) {
            this.doBestMove();
        } else {
            this.doRandomMove();
        }
    }


}



