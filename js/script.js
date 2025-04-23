import { Telas, mudaParaTela, globais, telaAtiva} from './components/telas.js';
import { criaFlappyBird } from './components/flappy.js';
import { criaChao } from './components/chao.js';
import { criaCanos } from './components/canos.js';
import { criaPlacar } from './components/placar.js';

export let frames = 0;

document.addEventListener('DOMContentLoaded', () => {

  const modalRegras = document.getElementById('modalRegras');
  
  modalRegras.style.display = 'flex';
});

function inicializaJogo() {

  globais.flappyBird = criaFlappyBird();
  globais.chao = criaChao();
  globais.canos = criaCanos();
  globais.placar = criaPlacar();

  mudaParaTela(Telas.INICIO);
}

function loop() {

  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames++;
  requestAnimationFrame(loop);
}


window.addEventListener('click', function() {
  if(telaAtiva.click) {
    telaAtiva.click();
  }
});

document.addEventListener("keydown", (evento) => {
  const tecla = evento.code;

  if (tecla == "Space") {
    if (telaAtiva.click) {
      telaAtiva.click();
    }
  }

  if (evento.code === "Enter" && telaAtiva === Telas.GAME_OVER) {
    mudaParaTela(Telas.INICIO);
  }
});

inicializaJogo();
loop();