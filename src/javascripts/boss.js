class Boss {
    constructor(type) {
        this.type = type;
        this.toggle = false;
        this.health = 60;
        this.x = 0;
        this.y = 0;
        if (this.type == BULLETSTORM) {
            this.health = 130;
        }
        if (this.type == DREVIL) {
            this.health = 100;
            this.x = RINGWIDTH/2 + LEFTWALL;
            this.y = 0;
        }
        this.radiateOffset = 0;
        this.radiateBreak = 50;
    }
    show() {
        if (this.type == COLUMNLORD) {
            push();
            rect(LEFTWALL, CEILING, RINGWIDTH, 100 * 1.375);
            fill(255,50,50);
            rect(LEFTWALL,CEILING,(RINGWIDTH/60) * this.health, 100 * 1.375);
            pop();
        }
        if(this.type == BULLETSTORM){
            if(this.health >= 120){
                text("Survive!", RINGWIDTH/2, RINGWIDTH/2);
            }
        }
        if(this.type == DREVIL){
            
            push();
            fill(255);
            ellipse(this.x,this.y,150,150);
            rectMode(CENTER);
            rect(this.x,this.y + 85, 100, 10);
            fill(255,0,0);
            rect(this.x,this.y + 85, this.health, 10);
            pop();
        }
    }
    check() {

    }

    attack() {
        if (this.type === COLUMNLORD) {
            this.zigZagAttack();
        }
    }

    barsAttack() {
        if (this.toggle) {
            for (let i = 0; i < 8; i++) {
                let xTarget = (i * 25 * 1.375) + 20 + LEFTWALL;
                spawn(xTarget, 10, BULLETBARRIER, xTarget, 450);
            }
            this.toggle = false;
        } else {
            for (let i = 0; i < 8; i++) {
                let xTarget = (i * 25* 1.375) + RINGWIDTH/2 + LEFTWALL;
                spawn(xTarget, 10, BULLETBARRIER, xTarget, 450);
            }
            this.toggle = true;
        }
    }

    columnAttack() {
        let hole = Math.floor(Math.random() * 12);
        for (let j = -3; j < 2; j++) {
            for (let i = 0; i < 12; i++) {
                let xTarget = (i * 45) + 25 + LEFTWALL;
                if(i != hole){
                    spawn(xTarget, j*35, BULLETBARRIER, xTarget, 450);
                } 
            }
        }
    }

    zigZagAttack() {
        let dist = 75;

        if (this.toggle) {
            for (let i = 0; i < 8; i++) {
                let xTarget = (i * dist) + 75/2 + LEFTWALL;
                spawn(xTarget, 10, BULLETBARRIER, xTarget, 450);
            }
            this.toggle = false;

        } else {
            for (let i = 0; i < 8; i++) {
                let xTarget = (i * dist) + LEFTWALL;
                spawn(xTarget, 10, BULLETBARRIER, xTarget, 450);
            }
            this.toggle = true;

        }
    }

    radiateAttack(){
        push();
        angleMode(DEGREES);
        let amountOfProngs = 12
        if(bosses.length > 0){
            if(this.radiateOffset <= this.radiateBreak || this.radiateOffset >= this.radiateBreak + 50){
                for(let i = 0; i < 360; i += 360/amountOfProngs){
                    let targetX = bosses[0].x + (800 * cos(i + (sin(this.radiateOffset) * 50)));  
                    let targetY = bosses[0].y + (800 * sin(i + (sin(this.radiateOffset) * 50)));
                    
                    spawn(bosses[0].x, bosses[0].y, BULLETBARRIER, targetX, targetY);
                }
            }
            if(this.radiateOffset >= this.radiateBreak + 50){
                this.radiateBreak += 150;
            }

            this.radiateOffset += 5;
        }
        pop();
    }


    theOldCrissCross(){
        spawn(0,0,TRACER,550,550);
        for(let i = 0; i < enemies.length; i++){
            enemies[i].thisPattern = [createVector(400,400), createVector(2000,2000)];
            enemies[i].killable = false;
            
        }
        for(let i = 0; i < enemies.length; i++){
            if(dist(LEFTWALL + RINGWIDTH/2, CEILING + RINGHEIGHT/2, enemies[i].x, enemies[i].y) >= 800){
                kill(enemies[i].id);
            }
        }


    }
}
