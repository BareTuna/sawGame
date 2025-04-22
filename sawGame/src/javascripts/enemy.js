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
		this.killable = false;
		this.patternDelta = 1;
		let nextX;
		let nextY;
		this.xPattern = [createVector(30, 30), createVector(370, 370), createVector(30, 370), createVector(370, 30)];
		this.spiralPattern = [createVector(30, 370), createVector(30, 30), createVector(370, 30),createVector(370, 370), createVector(80, 370), createVector(80, 80), createVector(320, 80), createVector(320, 320), createVector(130, 320), createVector(130, 130), createVector(270, 130), createVector(270, 270), createVector(180, 270), createVector(180, 180), createVector(220, 180), createVector(220, 220)];
		this.sweepPattern = [];
		this.rotatedSweepPattern = []
		nextX = 30;
		nextY = 370;
		for(let i = 0; i < 24; i++){
			this.sweepPattern.push(createVector(nextX, nextY));
			if(i % 2 != 0){
				nextX += 30;
			}
			if(i % 2 == 0){
				if(nextY == 370){
					nextY = 30;
				}else{
					nextY = 370;
				}
			}
		}
		nextX = 30;
		nextY = 30;
		for(let i = 0; i < 24; i++){
			this.rotatedSweepPattern.push(createVector(nextX, nextY));
			if(i % 2 != 0){
				nextY += 30;
			}
			if(i % 2 == 0){
				if(nextX == 370){
					nextX = 30;
				}else{
					nextX = 370;
				}
			}
		}
		this.allPatterns = [this.xPattern, this.sweepPattern, this.rotatedSweepPattern, this.spiralPattern];
		this.thisPattern = Math.floor(Math.random() * this.allPatterns.length);
		this.currentPatternSpot = 0;
		if(this.type == BULLET){
			this.speed = 3;
            this.moveTowardBullet(this.targetX, this.targetY);
		}
        if(this.type == CHASER){
            this.speed = 1;
			this.killable = true;
		}

		if(this.type == BULLETBARRIER){
			this.speed = 2;
			this.moveTowardBullet(this.targetX, this.targetY);
		}

		if(this.type == TRACER){
			this.speed = 3;
			this.killable = true;
			if(this.thisPattern == 0){
				this.x = -10;
				this.y = -10;
			}else if(this.thisPattern == 1){
				this.x = -10;
				this.y = 410;
			}else if(this.thisPattern == 2){
				this.x = -10;
				this.y = -10
			}else{
				this.x = -10;
				this.y = 410;
			}
			
		}

		for(let i = 0; i < heldPowerups.length; i++){
			if(heldPowerups[i].type == MOLASSES){
				this.speed *= 0.8;
			}
		}
		
	}
	show(){
        if(this.type == CHASER || this.type == STANDER || this.type == TRACER){
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
		if(this.type == TRACER){
			// console.log(this.xPattern[this.currentPatternSpot].x, this.xPattern[this.currentPatternSpot].y);
			// console.log(this.currentPatternSpot);
			if(dist(this.x, this.y, this.allPatterns[this.thisPattern][this.currentPatternSpot].x, this.allPatterns[this.thisPattern][this.currentPatternSpot].y) <= 5){
				this.currentPatternSpot += this.patternDelta;
				if(this.currentPatternSpot > this.allPatterns[this.thisPattern].length-1 || this.currentPatternSpot < 0){
					this.patternDelta *= -1;
					this.currentPatternSpot += this.patternDelta;
				}
			}
			this.moveToward(this.allPatterns[this.thisPattern][this.currentPatternSpot].x, this.allPatterns[this.thisPattern][this.currentPatternSpot].y);
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