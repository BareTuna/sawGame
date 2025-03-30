
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
const STANDER = 2;
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
	spawnTime = 50;
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
	push();
	fill(255,255,255);
	strokeWeight(2);
	rectMode(CENTER);
	rect(200, 260, 80, 20);
	fill(0);
	text("Score: " + score, 190, 264)
	pop();
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
	
	for(let i = 0; i < enemies.length; i ++){
		enemies[i].show();
		if(!player.hasSaw){
			enemies[i].check(saw.x,saw.y);
		}
	}

	push();
	noFill();
	rect(10,10,100,20);
	fill(255,0,0)
	// rect(10,10,Math.round(ttTimer / 60.0) * (100 / Math.round(1141 / 60.0)),20);
	rect(10,10,ttTimer * (100 / 1141),20);
	fill(255,255,255);
	strokeWeight(2);
	rect(322, 10, 80, 20);
	fill(0);
	text("Score: " + score, 350, 25)
	pop(); 

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
		if(Math.random() > 0.5){
			v2.mult(300);
			spawn(v2.x + 200, v2.y + 200, BULLET);
		}else{
			v2.mult(225);
			spawn(v2.x + 200, v2.y + 200, CHASER);
		}
	}
	saw.show();
	saw.update();
	player.show();
	player.update();
	for(let i = 0; i < enemies.length; i ++){
		enemies[i].show();
		enemies[i].update(player.x, player.y);
		if(player.checkDead(enemies[i].x, enemies[i].y, enemies[i].w)){
			scene = SURVIVEOVER;
		}
		if(!player.hasSaw){
			if(enemies[i].type == CHASER && enemies[i].check(saw.x,saw.y)){
				spawnTime -= 0.2;
			}
		}
	}
	push();
	fill(255,255,255);
	strokeWeight(2);
	rect(322, 10, 80, 20);
	fill(0);
	text("Score: " + score, 350, 25);
	pop();
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
	push();
	fill(255,255,255);
	strokeWeight(2);
	rectMode(CENTER);
	rect(200, 260, 80, 20);
	fill(0);
	text("Score: " + score, 190, 264)
	pop();
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

	console.log(spawnTime);
}
function kill(j){
	enemies.splice(j,1);
	if(scene == TIMETRIAL) {
		spawn(random(20,380), random(20,380), STANDER);
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
	}else{
		enemies.push(new Enemy(x,y,0,STANDER));
	}
	for(let i = 0; i < enemies.length; i ++){
	    enemies[i].id = i;
	}
}


function keyPressed() {
  if (keyCode === 32) { //space
    if(scene == TTOVER){
		scene = TIMETRIAL;
	}
	if(scene == SURVIVEOVER){
		surviveOverButtons[0].f();
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