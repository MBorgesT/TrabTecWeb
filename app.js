import { Game } from "./game.js";


class MainPage {


    constructor() {
        this.nLinhas = 5;
        this.nColunas = 5;
        this.dificuldade = 10;

        this.opponent = "AI";
        this.lastPlayed = "AI";

        this.game = new Game(this.nLinhas, this.nColunas, this.dificuldade);

        this.startPage();
    }


    fillConfigFields() {
        document.getElementById("linhas").value = this.nLinhas;
        document.getElementById("colunas").value = this.nColunas;
        document.getElementById("nivelIA").value = this.dificuldade;
    }


    setMensagem(mensagem) {
        document.getElementById("mensagem-texto").innerHTML = mensagem;
    }


    checkGameStatus() {
        if (this.game.isFinalState()) {
            this.setMensagem(`${this.lastPlayed} venceu!`)
        } else if (this.lastPlayed == "AI") {
            this.setMensagem("Vez do jogador");
        } else {
            this.setMensagem("Vez da IA");
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


    async play(coluna, valor) {
        this.game.play(coluna, valor);
        this.lastPlayed = "Player";
        this.fillGameBoard();

        if (this.opponent == "AI") {
            this.disablePlay();

            await new Promise(resolve => setTimeout(resolve, 250));

            this.game.doAIMove();
            this.lastPlayed = "AI";

            this.fillGameBoard();

            this.enablePlay();
        }
    }


    fillGameBoard() {
        this.clearGameBoard();
        this.checkGameStatus();

        const contentorJogo = document.getElementById("contentorJogo");
        for (let j = 0; j < this.nColunas; j++) {
            let colElem = document.createElement("div");
            colElem.className = "coluna-jogo";

            for (let i = 0; i < this.game.board[j]; i++) {
                let bolaElem = document.createElement("div");
                bolaElem.className = "bola";
                bolaElem.setAttribute("value", i+1);
                bolaElem.setAttribute("coluna", j);
                bolaElem.onclick = () => this.play(j, i+1);

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
        this.fillGameBoard();
    }
     
}


function main() {
    const mainPage = new MainPage();
}

window.onload = () => main();
