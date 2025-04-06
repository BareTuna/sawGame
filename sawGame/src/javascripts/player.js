class Player{
	constructor(){
		this.x = 200;
		this.xSpeed = 0;
		this.xAcc = 0.5;
		this.y = 200;
		this.ySpeed = 0;
		this.yAcc = 0.5;
		this.maxSpeed = 3.5;
		this.hasSaw = false;
		this.w = 20;
	}
	show(){
		this.drawLine();
		push();
		if(this.hasSaw){
			fill(255,0,0);
		}else{
			fill(0,0,255);
		}
		ellipse(this.x,this.y,this.w,this.w);
		pop();
		
	}
	update(){
		this.move();
		
		if(Math.abs(this.xSpeed) < 0.3){
			this.xSpeed = 0;
		}
		if(Math.abs(this.ySpeed) < 0.3){
			this.ySpeed = 0;
		}
		
		this.y += this.ySpeed;
		this.x += this.xSpeed;
		
		this.checkWalls();	
	}
	
	checkWalls(){
	if(this.x >= 390){
			this.x -= this.xSpeed;
			this.xSpeed = 0;
		}
		
		if(this.x <= 10){
			this.x -= this.xSpeed;
			this.xSpeed = 0;
		}
		
		if(this.y <= 10){
			this.y -= this.ySpeed;
			this.ySpeed = 0;
		}
		
		if(this.y >= 390){
			this.y -= this.ySpeed;
			this.ySpeed = 0;
		}
	
	}
	
	drawLine(){
		push();
		line(this.x,this.y,mouseX,mouseY);
		pop();
	}

	move(){
		if (keyIsDown(65)) {
			if(this.xSpeed > -this.maxSpeed){
				this.xSpeed -= this.xAcc;
			}
 	 	}else if (keyIsDown(68)) {
   	 	if(this.xSpeed < this.maxSpeed){
				this.xSpeed += this.xAcc;
			}
  		}

  		if (keyIsDown(87)) {
    		if(this.ySpeed > -this.maxSpeed){
				this.ySpeed -= this.yAcc;
			}
  		}

  		if (keyIsDown(83)) {
    		if(this.ySpeed < this.maxSpeed){
				this.ySpeed += this.yAcc;
			}
  		}
	
		if(this.xSpeed > 0){
			this.xSpeed -= 0.2;
		}else{
			this.xSpeed += 0.2;
		}
		
		if(this.ySpeed > 0){
			this.ySpeed -= 0.2;
		}else{
			this.ySpeed += 0.2;
		}
	}

	checkDead(x,y,w){
		if(dist(this.x, this.y, x, y) <= (w/2) + (this.w/2) - 2){
			return true;
		}else{
			return false;
		}
	}
}