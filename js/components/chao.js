import { canvas, contexto, sprites } from './sprites.js';

export function criaChao() {
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