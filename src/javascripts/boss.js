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
            rect(0, 0, 400, 100);
            fill(255, 50, 50);
            rect(0, 0, (400 / 60) * this.health, 100);
            pop();
        }
        if (this.type == BULLETSTORM) {
            if (this.health >= 120) {
                text("Survive!", 200, 200);
            }
        }
        if (this.type == DREVIL) {
            push();
            fill(255);
            ellipse(200, 0, 150, 150);
            rectMode(CENTER);
            rect(200, 85, 100, 10);
            fill(255, 0, 0);
            rect(200, 85, this.health, 10);
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
                let xTarget = i * 25 + 20;
                spawn(xTarget, 10, BULLETBARRIER, xTarget, 450);
            }
            this.toggle = false;
        } else {
            for (let i = 0; i < 8; i++) {
                let xTarget = i * 25 + 200;
                spawn(xTarget, 10, BULLETBARRIER, xTarget, 450);
            }
            this.toggle = true;
        }
    }

    columnAttack() {
        let hole = Math.floor(Math.random() * 11);
        for (let j = -3; j < 2; j++) {
            for (let i = 0; i < 11; i++) {
                let xTarget = i * 35 + 25;
                if (i != hole) {
                    spawn(xTarget, j * 25, BULLETBARRIER, xTarget, 450);
                }
            }
        }
    }

    zigZagAttack() {
        let dist = 75;
        if (this.toggle) {
            for (let i = 0; i < 8; i++) {
                let xTarget = i * dist + 75 / 2;
                spawn(xTarget, 10, BULLETBARRIER, xTarget, 450);
            }
            this.toggle = false;
        } else {
            for (let i = 0; i < 8; i++) {
                let xTarget = i * dist;
                spawn(xTarget, 10, BULLETBARRIER, xTarget, 450);
            }
            this.toggle = true;
        }
    }
}
