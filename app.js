import { Game } from "./game.js";


class MainPage {


    constructor() {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.has('linhas')) { this.nLinhas = urlParams.get('linhas'); }
        else { this.nLinhas = 5; }

        if (urlParams.has('colunas')) { this.nColunas = urlParams.get('colunas'); }
        else { this.nColunas = 5; }

        this.dificuldade = 5;

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
            let vencedor;
            if (this.nextPlayer == "Jogador") {
                vencedor = "IA";
            } else {
                vencedor = "Jogador";
            }
            this.setMensagem(`${vencedor} venceu!`);
            this.disablePlay();
        } else if (this.nextPlayer == "Jogador") {
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
        this.nextPlayer = "IA"
        this.fillGameBoard();

        if (this.opponent == "IA" && !this.game.isFinalState()) {
            this.disablePlay();

            await new Promise(resolve => setTimeout(resolve, 500));

            this.game.doAIMove();
            this.nextPlayer = "Jogador";

            this.fillGameBoard();

            this.enablePlay();
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
        this.opponent = "IA";

        this.nLinhas = parseInt(document.getElementById("linhas").value);
        this.nColunas = parseInt(document.getElementById("colunas").value);
        this.dificuldade = parseInt(document.getElementById("nivelIA").value);
        if (document.getElementById("quemjogaprimeiro").checked) {
            this.nextPlayer = "Jogador";
        } else {
            this.nextPlayer = "IA";
        }

        this.game = new Game(this.nLinhas, this.nColunas, this.dificuldade);

        this.fillGameBoard();
    }

}


function main() {
    const mainPage = new MainPage();
}

window.onload = () => main();
