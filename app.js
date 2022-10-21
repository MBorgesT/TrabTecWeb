import { Game } from "./game.js";


class MainPage {


    constructor() {
        this.nLinhas = 5;
        this.nColunas = 5;
        this.oponenteIA = true;
        this.dificuldade = 5;
        this.turno = true; // true - primeiro turno; false - segundo

        this.startPage();
    }


    fillConfigFields() {
        document.getElementById("linhas").value = this.nLinhas;
        document.getElementById("colunas").value = this.nColunas;
        document.getElementById("nivelIA").value = this.dificuldade;
        document.getElementById("quemjogaprimeiro").checked = this.turno;
        if (this.oponenteIA) {
            document.getElementById("computador").checked = true;
        } else {
            document.getElementById("usuario").checked = true;
        }
    }


    setMensagem(mensagem) {
        document.getElementById("mensagem-texto").innerHTML = mensagem;
    }


    checkGameStatus() {
        if (this.game.isFinalState()) {
            let vencedor;
            if (this.turno) {
                vencedor = "IA";
            } else {
                vencedor = "Jogador";
            }
            this.setMensagem(`${vencedor} venceu!`);
            this.disablePlay();
        } else if (this.turno) {
            this.setMensagem("Turno do jogador");
        } else {
            this.setMensagem("Turno da IA");
        }
    }


    disablePlay() {
        let colunasElem = document.getElementById("contentorJogo").childNodes;
        for (let i = 0; i < colunasElem.length; i++) {
            let bolasElem = colunasElem[i].childNodes;
            for (let j = 0; j < bolasElem.length; j++) {
                bolasElem[j].classList.add("disable");
            }
        }
    }


    enablePlay() {
        let colunasElem = document.getElementById("contentorJogo").childNodes;
        for (let i = 0; i < colunasElem.length; i++) {
            let bolasElem = colunasElem[i].childNodes;
            for (let j = 0; j < bolasElem.length; j++) {
                bolasElem[j].classList.remove("disable");
            }
        }
    }


    async playIA() {
        this.disablePlay();

        await new Promise(resolve => setTimeout(resolve, 500));

        this.game.doAIMove();
        this.turno = !this.turno;

        this.fillGameBoard();

        this.enablePlay();
    }


    play(coluna, valor) {
        this.game.play(coluna, valor);
        this.turno = !this.turno;
        this.fillGameBoard();

        if (this.oponenteIA && !this.game.isFinalState()) {
            this.playIA();
        }
    }


    bolaMouseOver(col, bola) {
        const colElem = document.getElementById(`col${col}`);
        for (let i = bola; i >= 0; i--) {
            colElem.childNodes[i].classList.add("bola-hover");
        }
    }


    bolaMouseOut(col, bola) {
        const colElem = document.getElementById(`col${col}`);
        for (let i = bola; i >= 0; i--) {
            colElem.childNodes[i].classList.remove("bola-hover");
        }
    }


    fillGameBoard() {
        this.clearGameBoard();
        this.checkGameStatus();

        const contentorJogo = document.getElementById("contentorJogo");
        for (let j = 0; j < this.nColunas; j++) {
            let colElem = document.createElement("div");
            colElem.className = "coluna-jogo";
            colElem.setAttribute("id", `col${j}`)

            for (let i = 0; i < this.game.board[j]; i++) {
                let bolaElem = document.createElement("div");
                bolaElem.className = "bola";
                bolaElem.setAttribute("value", i + 1);
                bolaElem.setAttribute("coluna", j);
                bolaElem.onclick = () => this.play(j, i + 1);
                bolaElem.onmouseover = () => this.bolaMouseOver(j, i);
                bolaElem.onmouseout = () => this.bolaMouseOut(j, i);

                colElem.appendChild(bolaElem);
            }

            contentorJogo.appendChild(colElem);
        }
    }


    clearGameBoard() {
        const contentorJogo = document.getElementById("contentorJogo");
        contentorJogo.innerHTML = "";
    }


    startPage() {
        this.fillConfigFields();

        document.getElementById("botaoNovoJogo").onclick = () => this.startGame();

        this.startGame();
    }

    startGame() {
        this.nLinhas = parseInt(document.getElementById("linhas").value);
        this.nColunas = parseInt(document.getElementById("colunas").value);
        this.oponenteIA = document.getElementById("computador").checked;
        this.dificuldade = parseInt(document.getElementById("nivelIA").value);
        this.turno = document.getElementById("quemjogaprimeiro").checked;

        this.game = new Game(this.nLinhas, this.nColunas, this.dificuldade);

        this.fillGameBoard();

        if (!this.turno) {
            this.playIA();
        }
    }

}


function main() {
    new MainPage();
}

window.onload = () => main();
