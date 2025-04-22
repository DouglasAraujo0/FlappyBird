import { criaFlappyBird } from './flappy.js';
import { criaChao } from './chao.js'; 
import { criaCanos } from './canos.js';
import { planoDeFundo } from './planoDeFundo.js';
import { mensagemGetReady, mensagemGameOver } from './mensagens.js';
import { salvaHighScore, pegaHighScore, pegaMedalha} from './score.js';
import { criaPlacar } from './placar.js';
import { contexto, sprites } from './sprites.js';

export const globais = {};
export let telaAtiva = {};
export let regrasExibidas = false;

export function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if(telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

function mostrarModal() {
  if(!regrasExibidas) {
    document.getElementById("modalRegras").style.display = "none";
    regrasExibidas = true;
  }
}

function esconderModal() {
  document.getElementById("modalRegras").style.display = "none";
}

export const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
      mostrarModal();
    },
    desenha() {
      planoDeFundo.desenha();
      globais.flappyBird.desenha();
      globais.chao.desenha();
      mensagemGetReady.desenha();
    },
    click() {
      if (document.getElementById("modalRegras").style.display === "flex") {
        esconderModal();
        mudaParaTela(Telas.INICIO); 
      } else if (regrasExibidas) {
        mudaParaTela(Telas.JOGO)
      }
    },
    atualiza() {
      globais.chao.atualiza();
    }
  }
};

Telas.JOGO = {
  inicializa() {
    globais.placar = criaPlacar();
  },
  desenha() {
    planoDeFundo.desenha();
    globais.canos.desenha();
    globais.chao.desenha();
    globais.flappyBird.desenha();
    globais.placar.desenha();
  },
  click() {
    globais.flappyBird.pula();
  },
  atualiza() {
    globais.canos.atualiza();
    globais.chao.atualiza();
    globais.flappyBird.atualiza();
    globais.placar.atualiza();
  }
};

Telas.GAME_OVER = {
  desenha() {
    mensagemGameOver.desenha();

    const medalha = pegaMedalha(globais.placar.pontuacao);
    if (medalha) {
      const spritesMedalha = {
        bronze: { x: 48, y: 124 },
        prata:  { x: 48, y: 78 },
        ouro:   { x: 0,  y: 124 },
        platina:{ x: 0,  y: 78 },
      };

      const { x, y } = spritesMedalha[medalha];

      const medalhaX = mensagemGameOver.x + 25;
      const medalhaY = mensagemGameOver.y + 87;
      const largura = 44;
      const altura = 44;

      contexto.drawImage(
        sprites,
        x, y,
        largura, altura,
        medalhaX, medalhaY,
        largura, altura
      );
    }

    contexto.font = '15px "Press Start 2P"';
    contexto.fillStyle = '#fff';
    contexto.textAlign = 'right';
    contexto.fillText(`${globais.placar.pontuacao}`, mensagemGameOver.x + 205, mensagemGameOver.y + 95);
    
    contexto.font = '15px "Press Start 2P"';
    contexto.fillStyle = '#fff';
    contexto.textAlign = 'right';
    const highScore = pegaHighScore();
    contexto.fillText(`${highScore}`, mensagemGameOver.x + 205, mensagemGameOver.y + 140);
  },
  atualiza() {
    salvaHighScore(globais.placar.pontuacao)
  },
  click() {
    mudaParaTela(Telas.INICIO);
  }
}