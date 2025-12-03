export default class Instrucciones extends Phaser.Scene {
    constructor() {
        super("Instrucciones")
    }
    preload() { }
    create() {
        this.estrellas = []
        for (let i = 0; i < 50; i++) {
            const x = Phaser.Math.Between(0, 800)
            const y = Phaser.Math.Between(0, 600)
            let estrella = this.add.image(x, y, 'estrellas')
            const scale = Phaser.Math.FloatBetween(0.2, 1)
            estrella.setScale(scale)
            estrella.velocidad = Phaser.Math.FloatBetween(20, 120)

            this.estrellas.push(estrella)
        }
        this.fondo=this.add.rectangle(400,370,700,460,0xff0000,0.7)
        const instrucciones=
        `
-Usa las flechas de direccion para mover a tu personaje y conseguir todas las tuercas para poder pasar al siguiente nivel.

-Pero ten cuidado con los cubos de hielo, no querras quedarte congelado
        `
        const style={
            color:"#ffffff",
            fontSize:24,
            lineSpacing:12,
            wordWrap:{
                width:400,
                use:true
            },
            align:"left"
        }
        this.add.text(400,350,instrucciones,style).setOrigin(0.5)

        this.title = this.add.text(400, 60, "Instrucciones", {
            fontSize: "64px",
            fill: "#efefef"
        }).setOrigin(0.5)
        this.tweens.add({
            targets: this.title,
            y: 80,
            duration: 1500,
            yoyo: true,
            repeat: -1
        })

    this.createUIButton(400, 560, "Comenzar juego", () => this.scene.start("Game"))

    }
    createUIButton(x, y, label, callback) {
        const width = 210;
        const height = 60;
        const color = 0xff0000;
        const bg = this.add.rectangle(x, y, width, height, color, 1).setOrigin(0.5).setStrokeStyle(3, 0xffffff).setInteractive()
        const text = this.add.text(x, y, label, {
            fontSize: "24px",
            fill: "#FFFFFF"
        }).setOrigin(0.5).setInteractive()
        bg.on('pointerdown', () => {
            this.sound.add("click").play()
            callback();
        })
        text.on('pointerdown', () => {
            this.sound.add("click").play()
            callback();
        })
    }
        
    
    
    update(time,delta){
    const width=this.sys.game.config.width
    this.estrellas.forEach((star)=>{
        star.x+=star.velocidad*(delta/1000)
      if(star.x>width){
        star.x= -10
      }
    })

  }
}