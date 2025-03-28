class Enemy{
	constructor(x,y,i,type,targetX = -1, targetY = -1){
		this.x = x;
		this.y = y;
		this.id = i;
		this.w = 20;
		this.type = type;
		this.targetX = targetX;
		this.targetY = targetY;
		if(this.type == BULLET){
			this.speed = 5;
		}else if(this.type == CHASER){
			this.speed = 1;
		}
		
	}
	show(){
		push();
		rectMode(CENTER);
		rect(this.x,this.y, this.w, this.w);
		pop();
	}
	check(x,y){
		if(dist(this.x,this.y,x,y) < 20){
			kill(this.id);
			return true;
		}else{
			return false;
		}
	}
	update(x,y){
		if(this.type == CHASER){
			this.moveToward(x,y);
		}
		if(this.type == BULLET){
			this.moveToward(this.targetX, this.targetY)
		}
	}


	moveToward(x,y){
		if(scene == SURVIVE){
			let v2 = goToward(x,y,this.x,this.y);
			this.x -= v2.x * this.speed;
			this.y -= v2.y * this.speed;
		}
	}
}
class Player{
	constructor(){
		this.x = 200;
		this.xSpeed = 0;
		this.xAcc = 0.5;
		this.y = 200;
		this.ySpeed = 0;
		this.yAcc = 0.5;
		this.maxSpeed = 4;
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
let player = new Player();
let saw = new Saw(200,200);
let enemies = [];
let score = 0;
let enemyIdle;
const MENU = 1;
const TIMETRIAL = 2;
const TTOVER = 3;
const LEVELS = 4;
const SURVIVE = 5;
const SURVIVEOVER = 6;
//enemy types
const CHASER = 0;
const BULLET = 1;
let scene = MENU;
let menuButtons = [new Button(200,200,150,25,"Time trial",() => {
	scene = TIMETRIAL
	for(let i = 0; i < 3; i ++){
		enemies.push(new Enemy(random(20,380), random(20,380),i, CHASER));
	}
}), new Button(200,230,150,25,"Levels",() => scene = LEVELS), new Button(200,260,150,25,"Survival",() => {
	scene = SURVIVE
	enemies = [];
})];
let ttOverButtons = [new Button(200,300,150,25,"Try Again? (space)",() => scene = TIMETRIAL), new Button(200,335,100,25,"Menu", () => scene = MENU)];
let levelButtons = [new Button(200,300,150,25,"Menu", () => scene = MENU)];
let surviveOverButtons = [new Button(200,300,150,25,"Try Again? (space)",() => {
	scene = SURVIVE
	score = 0;
	player.hasSaw = true;
	player.x = 200;
	player.y = 200;
}), new Button(200,335,100,25,"Menu", () => scene = MENU)]
let ttTimer = 0;
let spawnTime = 50;
function preload(){
	//enemyIdle = loadImage('enemy idle.gif');
}
function setup() {
	createCanvas(400, 400);
	noSmooth();
// 	for(let i = 0; i < 3; i ++){
// 		enemies.push(new Enemy(random(20,380), random(20,380),i));
// 	}
}

function draw() {
	background(220);
	if(scene == MENU){
		menuDraw();
	}else if(scene == TIMETRIAL){
		timeTrialDraw();
	}else if(scene == TTOVER){
		ttOverDraw();
	}else if(scene == LEVELS){
		levelsDraw();
	}else if(scene == SURVIVE){
		surviveDraw();
	}else if(scene == SURVIVEOVER){
		surviveOverDraw();
	}
}


function ttOverDraw(){
	textAlign(CENTER);
	text("NICE TRY KID", 200,200);
	text(score, 200,220);
	for(let i = 0; i < ttOverButtons.length; i++){
		ttOverButtons[i].show();
	}
}

function levelsDraw(){
	for(let i = 0; i < 5; i++){
		for(let j = 0; j < 4; j++){
			rect(i*70 + 25,j*80 + 25,60,60);
		}
	}
	for(let i = 0; i < levelButtons.length; i++){
		levelButtons[i].show();
	}
}
function menuDraw(){
	textAlign(CENTER);
	score = 0;
	text("Saw Game :D",200,100);
	for(let i = 0; i < menuButtons.length; i++){
		menuButtons[i].show();
	}
}
function timeTrialDraw(){
	if(ttTimer == 0){
		ttTimer = 1141
		score = 0;
	}
	saw.show();
	saw.update();
	player.show();
	player.update();
	text(score, 200,200);
	text(Math.round(ttTimer / 60.0), 200, 220);
	for(let i = 0; i < enemies.length; i ++){
		enemies[i].show();
		if(!player.hasSaw){
			enemies[i].check(saw.x,saw.y);
		}
	}
	if(saw.check(player.x, player.y)){
		saw.speed = 0;
		saw.gotFar = false;
		player.hasSaw = true;
	}
	if(player.hasSaw){
		saw.x = player.x;
		saw.y = player.y;
	}
	ttTimer --;
	if(ttTimer == 1){
		ttTimer = 0;
		player.x = 200;
		player.y = 200;
		saw.x = 200;
		saw.y = 200;
		scene = TTOVER;
	}
}

function surviveDraw(){
	if(ttTimer <= 0){
		ttTimer += spawnTime;
		let v2 = goToward(200,200,random(20,380),random(20,380));
		v2.mult(300);
		spawn(v2.x + 200, v2.y + 200, CHASER)
	}
	saw.show();
	saw.update();
	player.show();
	player.update();
	text(score, 200, 200);
	for(let i = 0; i < enemies.length; i ++){
		enemies[i].show();
		enemies[i].update(player.x, player.y);
		if(player.checkDead(enemies[i].x, enemies[i].y, enemies[i].w)){
			scene = SURVIVEOVER;
		}
		if(!player.hasSaw){
			if(enemies[i].check(saw.x,saw.y)){
				score++;
			}
		}
	}
	if(saw.check(player.x, player.y)){
		saw.speed = 0;
		saw.gotFar = false;
		player.hasSaw = true;
	}
	if(player.hasSaw){
		saw.x = player.x;
		saw.y = player.y;
	}
	ttTimer--;
}

function surviveOverDraw(){
	enemies = [];
	textAlign(CENTER);
	text("NICE TRY", 200,200);
	text(score, 200,220);
	for(let i = 0; i < surviveOverButtons.length; i++){
		surviveOverButtons[i].show();
	}
}

function mousePressed(){
	if(player.hasSaw && (scene == TIMETRIAL || scene == SURVIVE)){
		player.hasSaw = false;
		mouse = createVector(mouseX,mouseY);
  	    mouse.sub(createVector(player.x, player.y));
  	    mouse.normalize();
		saw.setSpeed(mouse.x * 10, mouse.y * 10);
		saw.x += mouse.x * 22;
		saw.y += mouse.y * 22;
	}
	if(scene == MENU){
		for(let i = 0; i < menuButtons.length; i++){
			menuButtons[i].check(mouseX,mouseY);
		}
	}else if(scene == TTOVER){
		for(let i = 0; i < ttOverButtons.length; i++){
			ttOverButtons[i].check(mouseX,mouseY);
		}
	}else if(scene == LEVELS){
		for(let i = 0; i < levelButtons.length; i++){
			levelButtons[i].check(mouseX,mouseY);
		}
	}else if(scene == SURVIVEOVER){
		for(let i = 0; i < surviveOverButtons.length; i++){
			surviveOverButtons[i].check(mouseX,mouseY);
		}
	}
}
function kill(j){
	enemies.splice(j,1);
	if(scene == TIMETRIAL) {
		spawn(random(20,380), random(20,380));
	}
	for(let i = 0; i < enemies.length; i ++){
	    enemies[i].id = i;
	}
	score++;
}

function spawn(x,y,type){
	if(type == CHASER){
		enemies.push(new Enemy(x,y,0,CHASER));
	}else if(type == BULLET){
		let v2 = goToward(player.x, player.y,x,y);
		//v2.mult(300);
		v2.x += 200;
		v2.y += 200;
		enemies.push(new Enemy(x,y,0,BULLET,player.x, player.y));
	}
	for(let i = 0; i < enemies.length; i ++){
	    enemies[i].id = i;
	}
}


function keyPressed() {
  if (keyCode === 32) {
    if(scene == TTOVER){
		scene = TIMETRIAL;
	}
	if(scene == SURVIVEOVER){
		scene = SURVIVE;
		score = 0;
		player.hasSaw = true;
		player.x = 200;
		player.y = 200;
	}
  }
}
function goToward(x1,y1,x2,y2){
	let v1 = createVector(x1,y1);
	let v2 = createVector(x2,y2);
	v2.sub(v1);
	v2.normalize();
	v2.mult(1.25);
	return v2;
}