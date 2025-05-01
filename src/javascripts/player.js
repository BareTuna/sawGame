class Player {
    constructor() {
    const LEFTWALL = 225;
    const RIGHTWALL = 775;
    const CEILING = 25;
    const FLOOR = 575;
    const RINGWIDTH = 550;
    const RINGHEIGHT = 550;
    this.x = RINGWIDTH/2 + LEFTWALL;
    this.xSpeed = 0;
    this.xAcc = 0.5;
    this.y = RINGHEIGHT/2 + CEILING;
    this.ySpeed = 0;
    this.yAcc = 0.5;
    this.setMaxSpeed = 4.25;
    this.maxSpeed = 0;
    this.hasSaw = false;
    this.w = 20 * 1.375;
    this.lives = 20;
    this.lifeTimer = 0;
    this.rageTimer = 0;
}
show() {
    this.drawLine();
    let lighter = 0;
    if (this.lifeTimer > 0) {
        lighter = 150;
    }
    push();
    if (this.hasSaw) {
        fill(255, lighter, lighter);
    } else {
        fill(lighter, lighter, 255);
    }
    if(this.rageTimer > 0){
        fill(255,255,0);
        if(this.rageTimer < 75){
            if(Math.floor(this.rageTimer / 10) % 2 != 0){
                fill(255,0,0);
            }
        }
    }
    ellipse(this.x, this.y, this.w, this.w);
    //imageMode(CENTER);
    //image(img, this.x, this.y-15, this.w + 30, this.w + 30);
    pop();

    for (let i = 0; i < this.lives; i++) {
        push();
        fill(255, 0, 0);
        ellipse(LEFTWALL + 15 + i * 15, CEILING + 40, this.w / 2, this.w / 2);
        pop();
    }

}
update() {

    this.move();

    if (Math.abs(this.xSpeed) < 0.3) {
        this.xSpeed = 0;
    }
    if (Math.abs(this.ySpeed) < 0.3) {
        this.ySpeed = 0;
    }

    this.y += this.ySpeed;
    this.x += this.xSpeed;

    this.checkWalls();

    if (this.lifeTimer > 0) {
        this.lifeTimer--;
    }
    if(this.rageTimer > 0){
        this.rageTimer --;
        this.maxSpeed = this.setMaxSpeed + 3;
    }else if(this.maxSpeed != this.setMaxSpeed){
        this.maxSpeed = this.setMaxSpeed;
    }

    
}

checkWalls() {
    if (this.x >= RIGHTWALL - this.w/2) {
        this.x -= this.xSpeed;
        this.xSpeed = 0;
    }

    if (this.x <= LEFTWALL + this.w/2) {
        this.x -= this.xSpeed;
        this.xSpeed = 0;
    }

    if (this.y <= (stage == COLUMNSTAGE ? (100 * 1.375) + CEILING : CEILING) + this.w/2) {
        this.y -= this.ySpeed;
        this.ySpeed = 0;
    }

    if (this.y >= FLOOR - this.w/2) {
        this.y -= this.ySpeed;
        this.ySpeed = 0;
    }
}

drawLine() {
    push();
    line(this.x, this.y, mouseX, mouseY);
    pop();
}

move() {
    if (keyIsDown(65)) {
        if (this.xSpeed > -this.maxSpeed) {
            this.xSpeed -= this.xAcc;
        }
    }
    
    if (keyIsDown(68)) {
        if (this.xSpeed < this.maxSpeed) {
            this.xSpeed += this.xAcc;
        }
    }

    if (keyIsDown(87)) {
        if (this.ySpeed > -this.maxSpeed) {
            this.ySpeed -= this.yAcc;
        }
    }

    if (keyIsDown(83)) {
        if (this.ySpeed < this.maxSpeed) {
            this.ySpeed += this.yAcc;
        }
    }

    let friction = 0.2;

    if (this.xSpeed > 0) {
        this.xSpeed -= friction;
    } else {
        this.xSpeed += friction;
    }

    if (this.ySpeed > 0) {
        this.ySpeed -= friction;
    } else {
        this.ySpeed += friction;
    }
}

checkDead(x, y, w) {
    if(this.rageTimer > 0 && dist(this.x, this.y, x, y) <= (w / 2) + (this.w / 2) - 2){
        return true;
    }
    if (dist(this.x, this.y, x, y) <= (w / 2) + (this.w / 2) - 2 && this.lifeTimer == 0) {
        this.lives--;
        this.lifeTimer = 150;
        
        for (let i = 0; i < heldPowerups.length; i++) {
            if (heldPowerups[i].type == BREATHER) {
                this.lifeTimer += 75;
            }
        }

        return true;
    } else {
        return false;
    }
}
}