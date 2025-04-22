import { salvaHighScore } from './score.js';
import { globais } from './telas.js';

export function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;
  
    if(flappyBirdY >= chaoY) {
      salvaHighScore(globais.placar.pontuacao)
      return true;
    }
  
    return false;
}