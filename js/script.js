let frames = 0;

const som_HIT = new Audio('../assets/sounds/hit.wav');

const som_JUMP = new Audio('../assets/sounds/flappy_jump.wav');

const sprites = new Image();
sprites.src = '../assets/img/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );
  },
};

function criaChao() {
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() {
      const movimentoDoChao = 1;
      const repeteEm = chao.largura / 2;
      const movimentacao = chao.x - movimentoDoChao;
      chao.x = movimentacao % repeteEm;
    },
    desenha() {
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        chao.x, chao.y,
        chao.largura, chao.altura,
      );
  
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        (chao.x + chao.largura), chao.y,
        chao.largura, chao.altura,
      );
    },
  };
  return chao;
}

function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;
  
    if(flappyBirdY >= chaoY) {
      salvaHighScore(globais.placar.pontuacao)
      return true;
    }
  
    return false;
  }

function criaFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
      if (som_JUMP.ended || som_JUMP.currentTime == 0) {
        som_JUMP.currentTime = 0;
        som_JUMP.play();
      }
      flappyBird.velocidade = - flappyBird.pulo;
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
      if(fazColisao(flappyBird, globais.chao)) {
        som_HIT.play();

        mudaParaTela(Telas.GAME_OVER);
        return;
      }
  
      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
      flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    movimentos: [
      { spriteX: 0, spriteY: 0, }, // asa pra cima
      { spriteX: 0, spriteY: 26, }, // asa no meio 
      { spriteX: 0, spriteY: 52, }, // asa pra baixo
      { spriteX: 0, spriteY: 26, }, // asa no meio 
    ],
    frameAtual: 0,
    atualizaOFrameAtual() {     
      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if(passouOIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movimentos.length;
        flappyBird.frameAtual = incremento % baseRepeticao
      }
    },
    desenha() {
      flappyBird.atualizaOFrameAtual();
      const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

      contexto.drawImage(
        sprites,
        spriteX, spriteY, // Sprite X, Sprite Y
        flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
        flappyBird.x, flappyBird.y,
        flappyBird.largura, flappyBird.altura,
      );
    }
  }
  return flappyBird;  
}

const mensagemGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.sX, mensagemGetReady.sY,
      mensagemGetReady.w, mensagemGetReady.h,
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.w, mensagemGetReady.h
    );
  }
}

const mensagemGameOver = {
  sX: 134,
  sY: 153,
  w: 226,
  h: 200,
  x: (canvas.width / 2) - 226 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGameOver.sX, mensagemGameOver.sY,
      mensagemGameOver.w, mensagemGameOver.h,
      mensagemGameOver.x, mensagemGameOver.y,
      mensagemGameOver.w, mensagemGameOver.h
    );
  }
}

function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169,
    },
    espaco: 80,
    desenha() {
      canos.pares.forEach(function(par) {
        const yRandom = par.y;
        const espacamentoEntreCanos = 90;
  
        const canoCeuX = par.x;
        const canoCeuY = yRandom; 

        contexto.drawImage(
          sprites, 
          canos.ceu.spriteX, canos.ceu.spriteY,
          canos.largura, canos.altura,
          canoCeuX, canoCeuY,
          canos.largura, canos.altura,
        )

        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom; 
        contexto.drawImage(
          sprites, 
          canos.chao.spriteX, canos.chao.spriteY,
          canos.largura, canos.altura,
          canoChaoX, canoChaoY,
          canos.largura, canos.altura,
        )

        par.canoCeu = {
          x: canoCeuX,
          y: canos.altura + canoCeuY
        }
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY
        }
      })
    },
    temColisaoComOFlappyBird(par) {
      const cabecaDoFlappy = globais.flappyBird.y;
      const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;
    
      const dentroDoCanoX = globais.flappyBird.x + globais.flappyBird.largura > par.x && globais.flappyBird.x < par.x + canos.largura;
    
      if (dentroDoCanoX) {
        if (cabecaDoFlappy <= par.canoCeu.y) {
          return true;
        }
        
        if (peDoFlappy >= par.canoChao.y) {
          return true;
        }
      }
    
      return false;
    }
    ,
    pares: [],
    atualiza() {
      const passou100Frames = frames % 100 === 0;
      if(passou100Frames) {
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      }

      canos.pares.forEach(function(par) {
        par.x = par.x - 2;

        if(canos.temColisaoComOFlappyBird(par)) {
          som_HIT.play();
          mudaParaTela(Telas.GAME_OVER);
        }

        if(par.x + canos.largura <= 0) {
          canos.pares.shift();
        }
      });

    }
  }

  return canos;
}

function criaPlacar() {
  const placar = {
    pontuacao: 0,
    desenha() {
      contexto.font = '20px "Press Start 2P"';
      contexto.textAlign = 'right';
      contexto.fillStyle = 'white';
      contexto.border = "black";
      contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);      
    },
    atualiza() {
      const intervaloDeFrames = 20;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if(passouOIntervalo) {
        placar.pontuacao = placar.pontuacao + 1;
      }
    }
  }
  return placar;
};

const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if(telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
    },
    desenha() {
      planoDeFundo.desenha();
      globais.flappyBird.desenha();
      
      globais.chao.desenha();
      mensagemGetReady.desenha();
    },
    click() {
      mudaParaTela(Telas.JOGO);
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

function pegaMedalha(pontos) {
  if (pontos >= 50) return 'platina';
  if (pontos >= 40) return 'ouro';
  if (pontos >= 30) return 'prata';
  if (pontos >= 0) return 'bronze';
  return null;
}


function salvaHighScore(pontuacao) {
  const highScore = localStorage.getItem('highScore');
  
  if (!highScore || pontuacao > parseInt(highScore)) {
    localStorage.setItem('highScore', pontuacao);
  }
}

function pegaHighScore() {
  return localStorage.getItem('highScore') || 0;
}

function loop() {

  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames = frames + 1;
  requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
  if(telaAtiva.click) {
    telaAtiva.click();
  }
});

mudaParaTela(Telas.INICIO);
loop();