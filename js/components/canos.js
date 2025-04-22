import { contexto, sprites, canvas, som_HIT } from './sprites.js';
import { mudaParaTela, Telas, globais } from './telas.js';
import { frames } from '../script.js';

export function criaCanos() {
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
      },
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