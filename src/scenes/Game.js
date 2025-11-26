
export default class Game extends Phaser.Scene {
    constructor() {
        super("Game")
    }
    preload() {
    }
    create() {

        const walls = this.physics.add.staticGroup();
        const mapa = [
            "#############",
            "#..#..0.....#",
            "#0.#.....#0.#",
            "#..##.0.##..#",
            "#.0#.....#.0#",
            "#1....0..#..#",
            "#############"
        ];
        const tileW = this.scale.width / mapa[0].length;
        const tileH = this.scale.height / mapa.length;
        // Guardamos grupos en la escena
        this.walls = this.physics.add.staticGroup();

        this.tuercas = this.physics.add.group({ allowGravity: false, immovable: true })
        this.cubitos = this.physics.add.group({ allowGravity: false, immovable: true })
        mapa.forEach((fila, y) => {
            fila.split("").forEach((c, x) => {
                const px = x * tileW + tileW / 2;
                const py = y * tileH + tileH / 2;
                switch (c) {
                    case "#": {
                        const wall = this.add.rectangle(px, py, tileW, tileH, 0xcccccc);
                        this.walls.add(wall); // ya crea body estático
                        break;
                    }
                    case ".": {
                        const star = this.tuercas.create(px, py, 'tuerca').setScale(0.15);
                        star.body.setCircle(8);
                        break;
                    }
                    case "0": {
                        const cbt = this.cubitos.create(px, py, 'cubo').setScale(0.3);
                        cbt.body.setCircle(8);
                        break;
                    }
                    case "1": {
                        // Un solo robot
                        this.robot = this.physics.add.sprite(px, py, 'robot');
                        this.robot.setScale(0.35);
                        break;
                    }
                }
            });
        });
        // colisiones entre estrellas y muros
        this.physics.add.collider(this.tuercas, this.walls);
        this.physics.add.collider(this.cubitos, this.walls);
        this.physics.add.collider(this.robot, this.walls);
        this.physics.add.overlap(this.robot, this.tuercas, tragarTuercas, null, this);
        this.physics.add.overlap(this.robot, this.cubitos, tragarCubos, null, this);

        function tragarTuercas(robot, tuercas) {
            tuercas.disableBody(true, true)
            this.puntos++
            this.actualizarTexto()
        }
        function tragarCubos(robot, cubitos) { 
            cubitos.disableBody(true,true)
            this.vidas--
            this.actualizarTexto()
        }


        this.cursors = this.input.keyboard.createCursorKeys();

        this.puntos = 0
        this.vidas = 3
        this.puntosVidas = this.add.text(10, 10, "", { color: "black", fontSize: 30 })
        if(this.vidas)
        this.actualizarTexto = () => {
            this.puntosVidas.setText(`Puntos: ${this.puntos} 🤖x${this.vidas}`)
            if(this.vidas==0){
            this.scene.start('GameOver')
        }
        }
        this.actualizarTexto()

        
    }


    update() {
        const speed = 160;
        // Resetear velocidad cada frame
        this.robot.setVelocity(0);
        if (this.cursors.left.isDown) {
            this.robot.setVelocityX(-speed);
        }
        else if (this.cursors.right.isDown) {
            this.robot.setVelocityX(speed);
        }
        if (this.cursors.up.isDown) {
            this.robot.setVelocityY(-speed);
        }
        else if (this.cursors.down.isDown) {
            this.robot.setVelocityY(speed);
        }
    }
}