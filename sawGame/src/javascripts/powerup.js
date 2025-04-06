class Powerup{
    constructor(x,y,type){
        this.x = x;
        this.y = y;
        this.w = 15;
        this.type = type;
    }

    activate(){
		if(this.type == RETURNER){
			saw.return = true;
		}
        if(this.type == FLASH){
            score += enemies.length;
            enemies = [];
        }
        if(this.type == BLASTER){
            for(let i = 0; i < 4; i++){
                blasters.push(new Saw(player.x, player.y, true, 200));
            }
            for(let i = 0; i < blasters.length; i++){
                let cringe = goToward(this.x,this.y, i%2 ? this.x - 50 + random(-10, 10): this.x + 50 + random(-10, 10), i%3 ? this.y - 50 + random(-10, 10): this.y + 50 + random(-10, 10));
			    blasters[i].xSpeed = cringe.x * 4.5;
			    blasters[i].ySpeed = cringe.y * 4.5;
            }
        }
    }

    check(x,y,w){
        if(dist(this.x, this.y, x, y) <= this.w/2 + w/2){
            return true;
        }
    }

    show(x,y){
        if(this.type == RETURNER){
            push();
            fill(0,255,0);
            ellipse(x, y, this.w, this.w);
            pop();
        }

        if(this.type == FLASH){
            push();
            fill(0,0,255);
            rectMode(CENTER);
            rect(x, y, this.w, this.w);
            pop();
        }

        if(this.type == BLASTER){
            push();
            fill(255,0,0);
            rectMode(CENTER);
            rect(x, y, this.w, this.w);
            pop();
        }
    }
}
