class Saw{
	constructor(x,y,isBlaster = false, ttl = -1){
		this.x = x;
		this.y = y;
		this.w = 20;
		this.xSpeed = 4.5;
		this.ySpeed = 4.5;
		this.going = false;
		this.gotFar = false;
		this.return = false;
		this.isBlaster = isBlaster;
		this.ttl = ttl;
	}
	update(){
		let hit = false;
		if(this.ttl > 0){
			this.ttl --;
		}
		if(this.x >= 400 - this.w / 2){
			this.xSpeed *= -1;
			this.x =  400 - this.w / 2;
			hit = true;
		}
		if(this.x <= 0 + this.w / 2){
			this.xSpeed *= -1;
			this.x = 0 + this.w / 2;
			hit = true;
		}
		if(this.y >= 400 - this.w / 2){
			this.ySpeed *= -1;
			this.y = 400 - this.w / 2;
			hit = true;
		}
		if(this.y <= 0 + this.w / 2){
			this.ySpeed *= -1;
			this.y = 0 + this.w / 2;
			hit = true;
		}
		this.x += this.xSpeed;
		this.y += this.ySpeed;
		
		if(hit == true && !this.isBlaster){
			this.ySpeed *= 0.60;
			this.xSpeed *= 0.60;
		}
		if(dist(this.x,this.y,player.x,player.y) > 40){
			this.gotFar = true;
		}
		if(dist(this.x,this.y,player.x,player.y) < 40 && this.gotFar){
			this.going = true;
		}else{
			this.going = false;
		}
		
		if(this.going && !this.isBlaster){
			let cringe = goToward(this.x,this.y,player.x,player.y);
			this.xSpeed = cringe.x * 4.5;
			this.ySpeed = cringe.y * 4.5;
		}

		this.going = false;

		if(this.return && !this.isBlaster){
			let cringe = goToward(this.x,this.y,player.x,player.y);
			this.xSpeed = cringe.x * 7;
			this.ySpeed = cringe.y * 7;
			if((dist(this.x,this.y,player.x,player.y) < 40 && this.gotFar) || player.hasSaw == true){
				this.return = false;
			}
		}
	}
	check(x,y){
		if(dist(this.x,this.y,x,y) < 20){
			return true;
		}
	}
	show(){
		
		if(this.isBlaster){
			push();
			fill(200,200,255);
			ellipse(this.x,this.y,20,20);
			pop();
		}else{
			push();
			fill(200,255,200);
			ellipse(this.x,this.y,20,20);
			pop();
		}
	}
	setSpeed(x,y){
		this.xSpeed = x;
		this.ySpeed = y;
	}
}