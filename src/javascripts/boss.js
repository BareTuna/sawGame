class Boss {
    constructor(type) {
        this.type = type;
        this.toggle = false;
        this.health = 60;
        if (this.type == BULLETSTORM) {
            this.health = 130;
        }
        if (this.type == DREVIL) {
            this.health = 100;
        }
    }

    show() {
        if (this.type == COLUMNLORD) {
            push();
<<<<<<< HEAD
<<<<<<< HEAD:sawGame/src/javascripts/boss.js
            rect(LEFTWALL, CEILING, RINGWIDTH, 100 * 1.375);
            fill(255,50,50);
            rect(LEFTWALL,CEILING,(RINGWIDTH/60) * this.health, 100 * 1.375);
            pop();
        }
        if(this.type == BULLETSTORM){
            if(this.health >= 120){
                text("Survive!", RINGWIDTH/2, RINGWIDTH/2);
=======
=======
>>>>>>> 63987331dfe156cc648c2eb393f74cd2f2c7a932
            rect(0, 0, 400, 100);
            fill(255, 50, 50);
            rect(0, 0, (400 / 60) * this.health, 100);
            pop();
        }
        if (this.type == BULLETSTORM) {
            if (this.health >= 120) {
                text("Survive!", 200, 200);
<<<<<<< HEAD
>>>>>>> 63987331dfe156cc648c2eb393f74cd2f2c7a932:src/javascripts/boss.js
=======
>>>>>>> 63987331dfe156cc648c2eb393f74cd2f2c7a932
            }
        }
        if (this.type == DREVIL) {
            push();
            fill(255);
<<<<<<< HEAD
<<<<<<< HEAD:sawGame/src/javascripts/boss.js
            ellipse(RINGWIDTH/2,0,150,150);
            rectMode(CENTER);
            rect(RINGWIDTH/2, 85, 100, 10);
            fill(255,0,0);
            rect(RINGWIDTH/2, 85, this.health, 10);
=======
=======
>>>>>>> 63987331dfe156cc648c2eb393f74cd2f2c7a932
            ellipse(200, 0, 150, 150);
            rectMode(CENTER);
            rect(200, 85, 100, 10);
            fill(255, 0, 0);
            rect(200, 85, this.health, 10);
<<<<<<< HEAD
>>>>>>> 63987331dfe156cc648c2eb393f74cd2f2c7a932:src/javascripts/boss.js
=======
>>>>>>> 63987331dfe156cc648c2eb393f74cd2f2c7a932
            pop();
        }
    }

    check() {}

    attack() {
        if (this.type === COLUMNLORD) {
            this.zigZagAttack();
        }
    }

    barsAttack() {
        if (this.toggle) {
            for (let i = 0; i < 8; i++) {
<<<<<<< HEAD
<<<<<<< HEAD:sawGame/src/javascripts/boss.js
                let xTarget = (i * 25 * 1.375) + 20 + LEFTWALL;
=======
                let xTarget = i * 25 + 20;
>>>>>>> 63987331dfe156cc648c2eb393f74cd2f2c7a932:src/javascripts/boss.js
=======
                let xTarget = i * 25 + 20;
>>>>>>> 63987331dfe156cc648c2eb393f74cd2f2c7a932
                spawn(xTarget, 10, BULLETBARRIER, xTarget, 450);
            }
            this.toggle = false;
        } else {
            for (let i = 0; i < 8; i++) {
<<<<<<< HEAD
<<<<<<< HEAD:sawGame/src/javascripts/boss.js
                let xTarget = (i * 25* 1.375) + RINGWIDTH/2 + LEFTWALL;
=======
                let xTarget = i * 25 + 200;
>>>>>>> 63987331dfe156cc648c2eb393f74cd2f2c7a932:src/javascripts/boss.js
=======
                let xTarget = i * 25 + 200;
>>>>>>> 63987331dfe156cc648c2eb393f74cd2f2c7a932
                spawn(xTarget, 10, BULLETBARRIER, xTarget, 450);
            }
            this.toggle = true;
        }
    }

    columnAttack() {
<<<<<<< HEAD
        let hole = Math.floor(Math.random() * 12);
        for (let j = -3; j < 2; j++) {
<<<<<<< HEAD:sawGame/src/javascripts/boss.js
            for (let i = 0; i < 12; i++) {
                let xTarget = (i * 45) + 25 + LEFTWALL;
                if(i != hole){
                    spawn(xTarget, j*35, BULLETBARRIER, xTarget, 450);
                } 
=======
=======
        let hole = Math.floor(Math.random() * 11);
        for (let j = -3; j < 2; j++) {
>>>>>>> 63987331dfe156cc648c2eb393f74cd2f2c7a932
            for (let i = 0; i < 11; i++) {
                let xTarget = i * 35 + 25;
                if (i != hole) {
                    spawn(xTarget, j * 25, BULLETBARRIER, xTarget, 450);
                }
<<<<<<< HEAD
>>>>>>> 63987331dfe156cc648c2eb393f74cd2f2c7a932:src/javascripts/boss.js
=======
>>>>>>> 63987331dfe156cc648c2eb393f74cd2f2c7a932
            }
        }
    }

    zigZagAttack() {
        let dist = 75;
        if (this.toggle) {
            for (let i = 0; i < 8; i++) {
<<<<<<< HEAD
<<<<<<< HEAD:sawGame/src/javascripts/boss.js
                let xTarget = (i * dist) + 75/2 + LEFTWALL;
=======
                let xTarget = i * dist + 75 / 2;
>>>>>>> 63987331dfe156cc648c2eb393f74cd2f2c7a932:src/javascripts/boss.js
=======
                let xTarget = i * dist + 75 / 2;
>>>>>>> 63987331dfe156cc648c2eb393f74cd2f2c7a932
                spawn(xTarget, 10, BULLETBARRIER, xTarget, 450);
            }
            this.toggle = false;
        } else {
            for (let i = 0; i < 8; i++) {
<<<<<<< HEAD
<<<<<<< HEAD:sawGame/src/javascripts/boss.js
                let xTarget = (i * dist) + LEFTWALL;
=======
                let xTarget = i * dist;
>>>>>>> 63987331dfe156cc648c2eb393f74cd2f2c7a932:src/javascripts/boss.js
=======
                let xTarget = i * dist;
>>>>>>> 63987331dfe156cc648c2eb393f74cd2f2c7a932
                spawn(xTarget, 10, BULLETBARRIER, xTarget, 450);
            }
            this.toggle = true;
        }
    }
}
