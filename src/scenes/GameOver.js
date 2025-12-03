export default class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver")
    }
    preload() { }
    create() {
        this.add.text(400, 200, "Game Over", {
            fontSize: "64px",
            fill: "#efefef"
        }).setOrigin(0.5)
        this.createUIButton(400, 300, "Reintentar", () => this.scene.start("Game"))
        

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
    update() { }
}
