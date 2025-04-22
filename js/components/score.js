export function pegaMedalha(score) {
    if (score >= 50) return 'platina';
    if (score >= 40) return 'ouro';
    if (score >= 30) return 'prata';
    if (score >= 0) return 'bronze';
    return null;
  }
  
  export function salvaHighScore(pontuacao) {
    const highScore = localStorage.getItem('highScore');
    
    if (!highScore || pontuacao > parseInt(highScore)) {
      localStorage.setItem('highScore', pontuacao);
    }
  }
  
  export function pegaHighScore() {
    return localStorage.getItem('highScore') || 0;
}