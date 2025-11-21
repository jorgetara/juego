import './style.css'
import Phaser, { Physics } from 'phaser'
import Portada from './scenes/Portada';
import Game from './scenes/Game';
import GameOver from './scenes/GameOver';
import Instrucciones from './scenes/Instrucciones';
const config = {
  type: Phaser.AUTO,
  backgroundColor: "#333",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [Portada,Game,GameOver,Instrucciones] // Aquí registras la escena

}
const game = new Phaser.Game(config);