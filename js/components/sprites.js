export const sprites = new Image();
sprites.src = '../assets/img/sprites.png';

export const flappy = new Image();
flappy.src = '../assets/img/flappy.png';

export const som_HIT = new Audio('../assets/sounds/hit.wav');
export const som_JUMP = new Audio('../assets/sounds/flappy_jump.wav');

som_HIT.load();
som_JUMP.load();

export const canvas = document.querySelector('canvas');
export const contexto = canvas.getContext('2d');