import click from "../assets/click.mp3"
import ambiente from "../assets/arcade.mp3"
import robot from "../assets/robot.svg"
import tuerca from "../assets/tuerca.svg"
import cubo from "../assets/ice-cube.svg"
import estrellas from "../assets/star.png"
import meteorito from "../assets/fireball.svg"

export default class Preload extends Phaser.Scene {
    constructor() {
        super("Preload")
    }
    preload() {
        this.load.audio('ambiente',ambiente)
        this.load.audio('click',click)
        this.load.image('robot',robot)
        this.load.image('tuerca',tuerca)
        this.load.image('cubo',cubo)
        this.load.image('estrellas',estrellas)
        this.load.image('meteorito',meteorito)

    }
    create() {
        this.scene.start("Portada")
    }
    update() { }
}