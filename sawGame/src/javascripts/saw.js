class Saw{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.w = 20;
		this.xSpeed = 4;
		this.ySpeed = 4;
		this.going = false;
		this.gotFar = false;
	}
	update(){
		let hit = false;
	
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
		
		if(hit == true){
			this.ySpeed *= 0.50;
			this.xSpeed *= 0.50;
		}
		if(dist(this.x,this.y,player.x,player.y) > 40){
			this.gotFar = true;
		}
		if(dist(this.x,this.y,player.x,player.y) < 40 && this.gotFar){
			this.going = true;
		}else{
			this.going = false;
		}
		
		if(this.going){
			let cringe = goToward(this.x,this.y,player.x,player.y);
			this.xSpeed = cringe.x * 3;
			this.ySpeed = cringe.y * 3;
		}
		this.going = false;
	}
	check(x,y){
		if(dist(this.x,this.y,x,y) < 20){
			return true;
		}
	}
	show(){
		push();
		fill(200,200,255);
		ellipse(this.x,this.y,20,20);
		
		pop();
	}
	setSpeed(x,y){
		this.xSpeed = x;
		this.ySpeed = y;
	}
}