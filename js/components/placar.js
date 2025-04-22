import { canvas, contexto } from './sprites.js';
import { frames } from '../script.js';

export function criaPlacar() {
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
}
  