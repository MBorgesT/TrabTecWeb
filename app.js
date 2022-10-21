import { Game } from "./game.js";


class MainPage {


    constructor() {
        /*
        valores padrão da configuração do jogo
        */
        this.nLinhas = 5;
        this.nColunas = 5;
        this.oponenteIA = true;
        this.dificuldade = 5;
        // true - primeiro turno; false - segundo
        // alterna entre um e outro, de acordo com as jogadas
        this.turno = true; 

        this.startPage();
    }


    /*
    ---------------------------------------------------------------------------
    funções de inicialização da página e jogo
    ---------------------------------------------------------------------------
    */


    startPage() {
        this.fillConfigFields();

        document.getElementById("botaoNovoJogo").onclick = () => this.startGame();
        document.getElementById("botaoDesistir").onclick = () => this.desistir();

        this.startGame();
    }


    fillConfigFields() {
        /*
        preenche os valores de configuração de acordo com os salvos 
        nesta classe
        */
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


    startGame() {
        /*
        atualiza as configurações de jogo desta classe com os dados 
        da tela, cria uma nova instância de jogo com tais configs
        e preenche a tela de acordo
        */
        this.nLinhas = parseInt(document.getElementById("linhas").value);
        this.nColunas = parseInt(document.getElementById("colunas").value);
        this.oponenteIA = document.getElementById("computador").checked;
        this.dificuldade = parseInt(document.getElementById("nivelIA").value);
        this.turno = document.getElementById("quemjogaprimeiro").checked;

        this.game = new Game(this.nLinhas, this.nColunas, this.dificuldade);

        this.updateGameBoard();
        this.enableBotaoDesistir();

        if (!this.turno) {
            this.playIA();
        }
    }


    /*
    ---------------------------------------------------------------------------
    organizadores da interface gráfica
    ---------------------------------------------------------------------------
    */


    updateGameBoard() {
        /*
        preenche o container do tabuleiro do jogo de acordo com a
        configuração do mesmo na classe Game, além de adicionar
        funcionalidades às bolas de forma individual
        */
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
                bolaElem.onmouseover = () => this.bolaAddHighlight(j, i, 0);
                bolaElem.onmouseout = () => this.bolaRemoveHighlight(j, i, 0);

                colElem.appendChild(bolaElem);
            }

            contentorJogo.appendChild(colElem);
        }
    }


    clearGameBoard() {
        /*
        remove todos os elementos do container do tabuleiro
        */
        const contentorJogo = document.getElementById("contentorJogo");
        contentorJogo.innerHTML = "";
    }


    setMensagem(mensagem) {
        /*
        altera a mensagem exibida no campo de mensagem
        */
        document.getElementById("mensagem-texto").innerHTML = mensagem;
    }


    enableBotaoDesistir() {
        document.getElementById("botaoDesistir").classList.remove("disable");
    }


    disableBotaoDesistir() {
        document.getElementById("botaoDesistir").classList.add("disable");
    }


    enablePlay() {
        /*
        restaura a possibilidade do jogador interagir com a interface
        do jogo
        */
        let colunasElem = document.getElementById("contentorJogo").childNodes;
        for (let i = 0; i < colunasElem.length; i++) {
            let bolasElem = colunasElem[i].childNodes;
            for (let j = 0; j < bolasElem.length; j++) {
                bolasElem[j].classList.remove("disable");
            }
        }
        this.enableBotaoDesistir();
    }


    disablePlay() {
        /*
        para impedir o jogador de interagir com o jogo, utilizada
        em certas circunstâncias como durante a jogada da IA
        */
        let colunasElem = document.getElementById("contentorJogo").childNodes;
        for (let i = 0; i < colunasElem.length; i++) {
            let bolasElem = colunasElem[i].childNodes;
            for (let j = 0; j < bolasElem.length; j++) {
                bolasElem[j].classList.add("disable");
            }
        }
        this.disableBotaoDesistir();
    }


    bolaAddHighlight(col, bolaInicial, player) {
        /*
        adiciona highlight nas bolas que serão removidas por uma
        jogada
        */
        let colElem = document.getElementById(`col${col}`);
        for (let i = bolaInicial; i >= 0; i--) {
            colElem.childNodes[i].classList.add(`bola-hover-player${player}`);
        }
    }


    bolaRemoveHighlight(col, bolaInicial) {
        /*
        remove os highlights anteriormente adicionadas em certas
        bolas
        */
        let colElem = document.getElementById(`col${col}`);
        for (let i = bolaInicial; i >= 0; i--) {
            colElem.childNodes[i].classList.remove("bola-hover-player0");
        }
    }


    /*
    ---------------------------------------------------------------------------
    lógica do jogo e interação com a classe Game
    ---------------------------------------------------------------------------
    */


    finalizarJogo() {
        /*
        modifica a tela para uma situação de fim de jogo
        */
        let vencedor;
        if (this.turno) {
            vencedor = "IA";
        } else {
            vencedor = "Jogador";
        }
        this.setMensagem(`${vencedor} venceu!`);
        this.disablePlay();

        this.disableBotaoDesistir();
    }


    checkGameStatus() {
        /*
        após toda jogada, detecta a situação do jogo para alterar
        a mensagem exibida de acordo
        */
        if (this.game.isFinalState()) {
            this.finalizarJogo();
        } else if (this.turno) {
            this.setMensagem("Turno do jogador");
        } else {
            this.setMensagem("Turno da IA");
        }
    }


    async playIA() {
        /*
        escolhe uma jogada a ser realizada e realiza a animação
        de highlight da mesma
        */
        this.disablePlay();

        await new Promise(resolve => setTimeout(resolve, 200));

        const move = this.game.getAIMove();
        this.bolaAddHighlight(move[0], move[1] - 1, 1);

        await new Promise(resolve => setTimeout(resolve, 800));

        this.game.play(move[0], move[1]);
        this.updateGameBoard();

        this.enablePlay();
    }


    play(coluna, valor) {
        /*
        realiza a jogada na classe Game e as operações necessárias
        pós esta ação, além de checar da necessidade da realização
        de uma nova jogada por parte da IA
        */
        this.game.play(coluna, valor);
        this.turno = !this.turno;
        this.updateGameBoard();

        if (this.oponenteIA && !this.game.isFinalState()) {
            this.playIA();
        }
    }


    desistir() {
        /*
        termina o jogo, concedendo a vitória ao oponente da vez
        */
        this.turno = !this.turno;
        this.clearGameBoard();
        this.finalizarJogo();
    }


}


function main() {
    new MainPage();
}


window.onload = () => main();
