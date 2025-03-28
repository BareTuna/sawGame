class Level{
	constructor(boxes, barriers, enemies){
		this.boxes = boxes;
		this.barriers = barriers;
		this.enemies = enemies;
	}
	
	show(){
		for(i = 0; i < this.enemies.length; i++){
			enemies[i].show();
			enemies[i].check(mouseX,mouseY);
			//emenies[i].check();
		}
		for(i = 0; i < this.boxes.length; i++){
		}
		for(i = 0; i < this.barriers.length; i++){
		}
	}
}