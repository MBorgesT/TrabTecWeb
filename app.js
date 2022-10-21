import { Game } from "./game.js";


class MainPage {


    constructor() {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.has('linhas')) { this.nLinhas = urlParams.get('linhas'); }
        else { this.nLinhas = 5; }

        if (urlParams.has('colunas')) { this.nColunas = urlParams.get('colunas'); }
        else { this.nColunas = 5; }


        this.dificuldade = 1;

        this.game = new Game(this.nLinhas, this.nColunas, this.dificuldade);

        this.startPage();

    }


    fillConfigFields() {
        document.getElementById("linhas").value = this.nLinhas;
        document.getElementById("colunas").value = this.nColunas;
        document.getElementById("nivelIA").value = this.dificuldade;
    }


    play(coluna, valor) {
        this.game.play(coluna, valor);
        this.fillGameBoard();
    }


    fillGameBoard() {
        this.clearGameBoard();
        
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
