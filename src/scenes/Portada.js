import efecto from "../assets/click.mp3"
import ambiente from "../assets/arcade.mp3"

export default class Portada extends Phaser.Scene {
    constructor() {
        super("Portada")
    }
    preload() { 
        this.load.audio('ambiente',ambiente)
        this.load.audio('click',efecto)
    }
    create() {
        this.title = this.add.text(400,150, "Juego", {
            fontSize: "64px",
            fill: "#efefef"
        }).setOrigin(0.5)
        //Lanzamos el evento:
        this.title.setInteractive();
        this.title.on('pointerdown', () => {
            this.scene.start("Game");
        })

        this.createUIButton(400, 300, "Start", () => this.scene.start("Game"))
        this.createUIButton(400, 400, "Instrucciones", () => this.scene.start("Instrucciones"))

        this.click=this.sound.add("click")
        this.musica=this.sound.add("ambiente")
        this.input.once("pointerdown",()=>{
            this.musica.play()
        })
       
    }
    createUIButton(x, y, label, callback) {
        const width = 200;
        const height = 60;
        const bg = this.add.rectangle(x, y, width, height, 0xff0000, 1).setOrigin(0.5).setStrokeStyle(3,0xffffff).setInteractive()
        const text = this.add.text(x, y, label, {
            fontSize: "24px",
            fill: "#FFFFFF"
        }).setOrigin(0.5).setInteractive()
        bg.on('pointerdown', () => {
            this.click.play()
            callback();
        })
        text.on('pointerdown', () => {
            this.click.play()
            callback();
        })
    }
    update() { }
}