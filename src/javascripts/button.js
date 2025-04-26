class Button{
	constructor(x,y,w,h,t,f){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.text = t;
		this.f = f;
	}
	show(){
		push();
		rectMode(CENTER);
		rect(this.x,this.y,this.w,this.h);
		textAlign(CENTER);
		text(this.text,this.x,this.y + 5);
		pop();
	}
	check(mx,my){
		if(mx >= this.x - this.w/2){
			if(mx <= this.x + this.w/2){
				if(my <= this.y + this.h/2){
					if(my >= this.y - this.h/2){
						this.f();
						return true;
					}
				}
			}
		}
		return false;
	}
}