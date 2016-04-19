const THREE = require('THREE');

const MOVE_SPEED = .05;
const ROTATION_SPEED = .05;
const JUMP_SPEED = 0.03;

module.exports = class WasdControls {
    constructor(camera) {
        this.camera = camera;

        this.addListeners('keydown', true);
        this.addListeners('keyup', false);
    }

    update() {
        if (this.moveForward) {
            this.camera.translateZ(-MOVE_SPEED);
        }
        if (this.moveLeft) {
            this.camera.translateX(-MOVE_SPEED);
        }
        if (this.moveRight) {
            this.camera.translateX(MOVE_SPEED);
        }
        if (this.moveBackward) {
            this.camera.translateZ(MOVE_SPEED);
        }

        if (this.lookUp) {
            this.camera.rotateX(ROTATION_SPEED);
        }
        if (this.lookLeft) {
            this.camera.rotateY(ROTATION_SPEED);
        }
        if (this.lookRight) {
            this.camera.rotateY(-ROTATION_SPEED);
        }
        if (this.lookDown) {
            this.camera.rotateX(-ROTATION_SPEED);
        }

        if (this.goingDown) {
            this.camera.position.y -= JUMP_SPEED;
            if (this.camera.position.y < 0) {
                this.goingDown = false;
            }
        } else if (this.jump) {
            this.camera.position.y += JUMP_SPEED;

            if (this.camera.position.y > .8) {
                this.goingDown = true;
            }
        } else if (this.camera.position.y > JUMP_SPEED) {
            this.goingDown = true;
        }

        this.camera.rotation.z = 0;
    }

    addListeners(event, enable) {
        document.body.addEventListener(event, (e) => {
            switch (e.code) {
                case 'KeyW':
                    this.moveForward = enable;
                    break;
                case 'KeyA':
                    this.moveLeft = enable;
                    break;
                case 'KeyD':
                    this.moveRight = enable;
                    break;
                case 'KeyS':
                    this.moveBackward = enable;
                    break;

                case 'Space':
                    this.jump = enable;
                    break;

                case 'ArrowUp':
                    this.lookUp = enable;
                    break;
                case 'ArrowDown':
                    this.lookDown = enable;
                    break;
                case 'ArrowRight':
                    this.lookRight = enable;
                    break;
                case 'ArrowLeft':
                    this.lookLeft = enable;
                    break;
            }
        });
    }

}
