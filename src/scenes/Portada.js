

export default class Portada extends Phaser.Scene {
    constructor() {
        super("Portada")
    }
    preload() {

    }
    create() {
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;

        this.estrellas = []
        for (let i = 0; i < 50; i++) {
            const x = Phaser.Math.Between(0, gameWidth)
            const y = Phaser.Math.Between(0, gameHeight)
            let estrella = this.add.image(x, y, 'estrellas')
            const scale = Phaser.Math.FloatBetween(0.2, 1)
            estrella.setScale(scale)
            estrella.velocidad = Phaser.Math.FloatBetween(20, 120)

            this.estrellas.push(estrella)
        }
        this.title = this.add.text(400, 100, "ROBOT: The Game", {
            fontSize: "64px",
            fill: "#efefef"
        }).setOrigin(0.5)
        this.tweens.add({
            targets: this.title,
            y: 120,
            duration: 1500,
            yoyo: true,
            repeat: -1
        })

        this.meteo = this.add.image(780, 10, 'meteorito')
        this.tweens.add({
            targets: this.meteo,
            x: 10,
            y: 590,
            duration: 5000,
            repeat: -1
        })
        this.add.image(400, 210, 'robot').setScale(0.8)


        this.createUIButton(400, 300, "Start", () => this.scene.start("Game"))
        this.createUIButton(400, 400, "Instrucciones", () => this.scene.start("Instrucciones"))


    }
    createUIButton(x, y, label, callback) {
        const width = 200;
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
    update(time, delta) {
        const width = this.sys.game.config.width
        this.estrellas.forEach((star) => {
            star.x += star.velocidad * (delta / 1000)
            if (star.x > width) {
                star.x = -10
            }
        })

    }
}