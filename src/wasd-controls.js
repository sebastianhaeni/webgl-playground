const THREE = require('THREE');

module.exports = class WasdControls {
    constructor(camera) {
        this.camera = camera;

        this.addListeners('keydown', true);
        this.addListeners('keyup', false);
    }

    update() {
        if (this.moveForward) {
            this.camera.translateZ(-.1);
        }
        if (this.moveLeft) {
            this.camera.translateX(-.05);
        }
        if (this.moveRight) {
            this.camera.translateX(.05);
        }
        if (this.moveBackward) {
            this.camera.translateZ(.1);
        }

        if (this.lookUp) {
            this.camera.rotateX(.05);
        }
        if (this.lookLeft) {
            this.camera.rotateY(.05);
        }
        if (this.lookRight) {
            this.camera.rotateY(-.05);
        }
        if (this.lookDown) {
            this.camera.rotateX(-.05);
        }

        if (this.goingDown) {
            this.camera.position.y -= .05   ;
            if (this.camera.position.y < 0) {
                this.goingDown = false;
            }
        } else if (this.jump) {
            this.camera.position.y += .05;
            
            if (this.camera.position.y > .8) {
                this.goingDown = true;
            }
        } else {
            this.camera.position.y = 0;
        }

        this.camera.rotation.z = 0;
    }

    addListeners(event, enable) {
        document.body.addEventListener(event, (e) => {
            console.log(e.code);
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
