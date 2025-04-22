import { fazColisao } from './colisaoChao.js';
import { globais, mudaParaTela, Telas } from './telas.js';
import { som_JUMP, som_HIT, contexto, sprites } from './sprites.js'; 
import { frames } from '../script.js';

export function criaFlappyBird() {
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
      { spriteX: 0, spriteY: 0, }, 
      { spriteX: 0, spriteY: 26, }, 
      { spriteX: 0, spriteY: 52, }, 
      { spriteX: 0, spriteY: 26, }, 
    ],
    frameAtual: 0,
    atualizaOFrameAtual() {

      const intervaloDeFrames = 10; 
      if (frames % intervaloDeFrames === 0) {
        flappyBird.frameAtual = (flappyBird.frameAtual + 1) % flappyBird.movimentos.length;
      }
    },
    
    desenha() {
      flappyBird.atualizaOFrameAtual();
      const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

      contexto.drawImage(
        sprites,
        spriteX, spriteY,
        flappyBird.largura, flappyBird.altura,
        flappyBird.x, flappyBird.y,
        flappyBird.largura, flappyBird.altura,
      );
    }
  }
  return flappyBird;  
}