class Enemy{
	constructor(x,y,i,type,targetX = -1, targetY = -1){
		this.x = x;
		this.y = y;
		this.id = i;
        this.dx = 0;
        this.dy = 0;
		this.w = 20;
		this.type = type;
		this.targetX = targetX;
		this.targetY = targetY;
		if(this.type == BULLET){
			this.speed = 3;
            this.moveTowardBullet(this.targetX, this.targetY);
		}
        if(this.type == CHASER){
            this.speed = 1;
		}

		if(this.type == BULLETBARRIER){
			this.speed = 2;
			this.moveTowardBullet(this.targetX, this.targetY);
		}
		
	}
	show(){
        if(this.type == CHASER || this.type == STANDER){
		    push();
		    rectMode(CENTER);
		    rect(this.x,this.y, this.w, this.w);
		    pop();
        }
        if(this.type == BULLET || this.type == BULLETBARRIER){
            push();
		    ellipse(this.x,this.y, this.w, this.w);
		    pop();
        }
	}
	check(x,y){
		if(dist(this.x,this.y,x,y) < 20 && this.type != BULLET && this.type != BULLETBARRIER){
			kill(this.id);
			return true;
		}else{
			if(this.type == BULLET){
				if(dist(this.x, this.y, 200,200) >= 500){
					kill(this.id);
				}
			}
			return false;
		}

		
	}
	update(x,y){
		if(this.type == CHASER){
			this.moveToward(x,y);
		}
		if(this.type == BULLET || this.type == BULLETBARRIER){
			this.x -= this.dx;
            this.y -= this.dy;
		}
	}


	moveToward(x,y){
		if(scene == SURVIVE){
			let v2 = goToward(x,y,this.x,this.y);
			this.x -= v2.x * this.speed;
			this.y -= v2.y * this.speed;
		}
	}

    moveTowardBullet(x,y){
		let v2 = goToward(x,y,this.x,this.y);
		this.dx = v2.x * this.speed;
		this.dy = v2.y * this.speed;
	}
}