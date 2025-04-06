
let player = new Player();
let saw = new Saw(200, 200);
let enemies = [];
let score = 0;
let enemyIdle;
// scenes
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
//powerup types
const RETURNER = 0;
const FLASH = 1;
const BLASTER = 2;
let scene = MENU;
let letChoose = false;
let menuButtons = [new Button(200, 200, 150, 25, "Time trial", () => {
	scene = TIMETRIAL;
	ttTimer = 0;
	score = 0;
	player.hasSaw = true;
	player.x = 200;
	player.y = 200;
	for (let i = 0; i < 3; i++) {
		enemies.push(new Enemy(random(20, 380), random(20, 380), i, CHASER));
	}
}), new Button(200, 230, 150, 25, "Levels", () => scene = LEVELS), new Button(200, 260, 150, 25, "Survival", () => {
	scene = SURVIVE
	scene = SURVIVE
	score = 0;
	player.hasSaw = true;
	player.x = 200;
	player.y = 200;
	spawnTime = 50;
	breatheTimer = -1;
	enemies = [];
	fieldPowerups = [];
	heldPowerups = [];
	stage = 0;
})];
let ttOverButtons = [new Button(200, 300, 150, 25, "Try Again? (space)", () => scene = TIMETRIAL), new Button(200, 335, 100, 25, "Menu", () => scene = MENU)];
let levelButtons = [new Button(200, 300, 150, 25, "Menu", () => scene = MENU)];
let surviveOverButtons = [new Button(200, 300, 150, 25, "Try Again? (space)", () => {
	scene = SURVIVE
	score = 0;
	player.hasSaw = true;
	player.x = 200;
	player.y = 200;
	spawnTime = 50;
	breatheTimer = -1;
	enemies = [];
	fieldPowerups = [];
	heldPowerups = [];
	stage = 0;
}), new Button(200, 335, 100, 25, "Menu", () => scene = MENU)]
let ttTimer = 0;
let spawnTime = 50;
let breatheTimer = 0;
let stageBreaks = [10, 25, 40, 55, 70, 85];
let stage = 0;
let heldPowerups = [new Powerup(200,200,BLASTER)];
let fieldPowerups = [];
let powerUpTimer;
let blasters = [];
function preload() {
	//enemyIdle = loadImage('enemy idle.gif');
}
function setup() {
	createCanvas(400, 400);
	powerUpTimer = random(300, 500);
	noSmooth();
	// 	for(let i = 0; i < 3; i ++){
	// 		enemies.push(new Enemy(random(20,380), random(20,380),i));
	// 	}
}

function draw() {
	background(220);
	if (scene == MENU) {
		menuDraw();
	} else if (scene == TIMETRIAL) {
		timeTrialDraw();
	} else if (scene == TTOVER) {
		ttOverDraw();
	} else if (scene == LEVELS) {
		levelsDraw();
	} else if (scene == SURVIVE) {
		surviveDraw();
	} else if (scene == SURVIVEOVER) {
		surviveOverDraw();
	}
}


function ttOverDraw() {
	textAlign(CENTER);
	push();
	fill(255, 255, 255);
	strokeWeight(2);
	rectMode(CENTER);
	rect(200, 260, 80, 20);
	fill(0);
	text("Score: " + score, 190, 264)
	pop();
	for (let i = 0; i < ttOverButtons.length; i++) {
		ttOverButtons[i].show();
	}
}

function levelsDraw() {
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 4; j++) {
			rect(i * 70 + 25, j * 80 + 25, 60, 60);
		}
	}
	for (let i = 0; i < levelButtons.length; i++) {
		levelButtons[i].show();
	}
}
function menuDraw() {
	textAlign(CENTER);
	score = 0;
	text("Saw Game :D", 200, 100);
	for (let i = 0; i < menuButtons.length; i++) {
		menuButtons[i].show();
	}
}
function timeTrialDraw() {
	if (ttTimer == 0) {
		ttTimer = 1141
		score = 0;
	}
	saw.show();
	saw.update();
	player.show();
	player.update();

	for (let i = 0; i < enemies.length; i++) {
		enemies[i].show();
		if (!player.hasSaw) {
			enemies[i].check(saw.x, saw.y);
		}
	}

	push();
	noFill();
	rect(10, 10, 100, 20);
	fill(255, 0, 0)
	// rect(10,10,Math.round(ttTimer / 60.0) * (100 / Math.round(1141 / 60.0)),20);
	rect(10, 10, ttTimer * (100 / 1141), 20);
	fill(255, 255, 255);
	strokeWeight(2);
	rect(322, 10, 80, 20);
	fill(0);
	text("Score: " + score, 350, 25)
	pop();

	if (saw.check(player.x, player.y)) {
		saw.speed = 0;
		saw.gotFar = false;
		player.hasSaw = true;
	}
	if (player.hasSaw) {
		saw.x = player.x;
		saw.y = player.y;
	}
	ttTimer--;
	if (ttTimer == 1) {
		ttTimer = 0;
		player.x = 200;
		player.y = 200;
		saw.x = 200;
		saw.y = 200;
		scene = TTOVER;
	}

}

function surviveDraw() {
	if (ttTimer <= 0) {
		if(score <= stageBreaks[0]){
			ttTimer += 75;
		}else{
			ttTimer += spawnTime;
		}
		let v2 = goToward(200, 200, random(20, 380), random(20, 380));
		v2.mult(225);
		v2.x += 200;
		v2.y += 200;
		while (dist(player.x, player.y, v2.x, v2.y) <= 250) {
			v2 = goToward(200, 200, random(20, 380), random(20, 380));
			v2.mult(225);
			v2.x += 200;
			v2.y += 200;
		}
		if (breatheTimer <= 0 && letChoose == false) {
			let whichEnemy = Math.random();
			if (Math.random() > 0.5 && score >= stageBreaks[0]) {
				spawn(v2.x, v2.y, BULLET);
			} else {
				spawn(v2.x, v2.y, CHASER);
			}
			breatheTimer -= 1;
		}	
	}
	saw.show();
	saw.update();
	for(let i = 0; i < blasters.length; i++){
		blasters[i].show();
		blasters[i].update();
		if(blasters[i].ttl == 0){
			blasters.splice(i, 1);
			i = 0;
		}
	}
	player.show();
	player.update();
	for (let i = 0; i < enemies.length; i++) {
		enemies[i].show();
		enemies[i].update(player.x, player.y);
		if (player.checkDead(enemies[i].x, enemies[i].y, enemies[i].w)) {
			scene = SURVIVEOVER;
		}
		for(let j = 0; j < blasters.length; j++){
			if(enemies[i].check(blasters[j].x, blasters[j].y)){
				i = 0;
			}
		}
		if (!player.hasSaw) {
			// if (enemies[i].type == CHASER && enemies[i].check(saw.x, saw.y)) {
			// }
			enemies[i].check(saw.x, saw.y);
		}
		
	}
	for(let i = 0; i < fieldPowerups.length; i++){
		fieldPowerups[i].show(fieldPowerups[i].x, fieldPowerups[i].y);
		if(fieldPowerups[i].check(player.x, player.y, player.w)){
			heldPowerups.push(fieldPowerups[i]);
			fieldPowerups = [];
			// fieldPowerups.splice(i, 1);
			i = 0;
			letChoose = false;
		}
	}
	for(let i = 0; i < heldPowerups.length; i++){
		heldPowerups[i].show(i * (heldPowerups[i].w + 5) +15, 15);
	}
	if (score >= stageBreaks[stage] && score != 0 && breatheTimer < 0) {
		breatheTimer = 50;
		spawnTime -= 5;
		stage ++;
	}
	push();
	fill(255, 255, 255);
	strokeWeight(2);
	rect(322, 10, 80, 20);
	fill(0);
	text("Score: " + score, 350, 25);
	pop();
	
	if(breatheTimer > 0 && enemies.length == 0){
		push();
		text("BREATHE", 200, 200);
		pop();
		breatheTimer--;
		letChoose = true;
	}

	if(letChoose && breatheTimer == 0){
		if(fieldPowerups == 0){
			// let randomPowerup = Math.floor(Math.random() * 1);
			fieldPowerups.push(new Powerup(125,200,Math.floor(Math.random() * 3)));
			fieldPowerups.push(new Powerup(275,200,Math.floor(Math.random() * 3)));
			player.x = 200;
			player.y = 350;
			player.xSpeed = 0;
			player.ySpeed = 0;
			player.hasSaw = true;

		}
		text("Choose: ", 200, 200);
	}

	if (saw.check(player.x, player.y)) {
		saw.speed = 0;
		saw.gotFar = false;
		player.hasSaw = true;
	}
	if (player.hasSaw) {
		saw.x = player.x;
		saw.y = player.y;
	}
	// if (dist(player.x, player.y, saw.x, saw.y) >= 70) {
	// 	saw.return = true;
	// }
	ttTimer--;
	powerUpTimer--;

	// if(powerUpTimer <= 0){
	// 	powerUpTimer = random(300, 700);
	// 	fieldPowerups.push(new Powerup(random(20,380), random(20,380), RETURNER));
	// }
}

function surviveOverDraw() {
	enemies = [];
	push();
	fill(255, 255, 255);
	strokeWeight(2);
	rectMode(CENTER);
	rect(200, 260, 80, 20);
	fill(0);
	text("Score: " + score, 190, 264)
	pop();
	for (let i = 0; i < surviveOverButtons.length; i++) {
		surviveOverButtons[i].show();
	}
}

function mousePressed() {
	if (player.hasSaw && (scene == TIMETRIAL || scene == SURVIVE)) {
		player.hasSaw = false;
		mouse = createVector(mouseX, mouseY);
		mouse.sub(createVector(player.x, player.y));
		mouse.normalize();
		saw.setSpeed(mouse.x * 13, mouse.y * 13);
		saw.x += mouse.x * 22;
		saw.y += mouse.y * 22;
	}
	if (scene == MENU) {
		for (let i = 0; i < menuButtons.length; i++) {
			menuButtons[i].check(mouseX, mouseY);
		}
	} else if (scene == TTOVER) {
		for (let i = 0; i < ttOverButtons.length; i++) {
			ttOverButtons[i].check(mouseX, mouseY);
		}
	} else if (scene == LEVELS) {
		for (let i = 0; i < levelButtons.length; i++) {
			levelButtons[i].check(mouseX, mouseY);
		}
	} else if (scene == SURVIVEOVER) {
		for (let i = 0; i < surviveOverButtons.length; i++) {
			surviveOverButtons[i].check(mouseX, mouseY);
		}
	}

}
function kill(j) {
	if(enemies[j].type == CHASER || enemies[j].type == STANDER){
		score++;
	}
	enemies.splice(j, 1);
	if (scene == TIMETRIAL) {
		spawn(random(20, 380), random(20, 380), STANDER);
	}
	for (let i = 0; i < enemies.length; i++) {
		enemies[i].id = i;
	}
}

function spawn(x, y, type) {
	if (type == CHASER) {
		enemies.push(new Enemy(x, y, 0, CHASER));
	} else if (type == BULLET) {
		// let v2 = goToward(player.x, player.y,x,y);
		// //v2.mult(300);
		// v2.x += 200;
		// v2.y += 200;
		enemies.push(new Enemy(x, y, 0, BULLET, player.x, player.y));
	} else {
		enemies.push(new Enemy(x, y, 0, STANDER));
	}
	for (let i = 0; i < enemies.length; i++) {
		enemies[i].id = i;
	}
}


function keyPressed() {
	if (keyCode === 32) { //space
		if (scene == TTOVER) {
			scene = TIMETRIAL;
		}
		if (scene == SURVIVEOVER) {
			surviveOverButtons[0].f();
		}
		if (scene == SURVIVE) {
			if(heldPowerups.length > 0){
				heldPowerups[0].activate();
				heldPowerups.splice(0,1);
			}
		}
	}
}

function goToward(x1, y1, x2, y2) {
	let v1 = createVector(x1, y1);
	let v2 = createVector(x2, y2);
	v2.sub(v1);
	v2.normalize();
	v2.mult(1.25);
	return v2;
}