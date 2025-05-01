let player = new Player();
let saw = new Saw(200, 200);
let enemies = [];
let score = 0;
let enemyIdle;
//barriers
const LEFTWALL = 225;
const RIGHTWALL = 775;
const CEILING = 25;
const FLOOR = 575;
const RINGWIDTH = 550;
const RINGHEIGHT = 550;
// scenes
const MENU = 1;
const TIMETRIAL = 2;
const TTOVER = 3;
const LEVELS = 4;
const SURVIVE = 5;
const SURVIVEOVER = 6;
const PAUSE = 7;
//enemy types
const CHASER = 0;
const BULLET = 1;
const STANDER = 2;
const BULLETBARRIER = 3;
const TRACER = 4;
//powerup types
const RETURNER = 0;
const FLASH = 1;
const BLASTER = 2;
const ONEUP = 3;
const RAGE = 4;
const allPowerUps = [RETURNER, FLASH, BLASTER, ONEUP, RAGE];
//perk types
const PRICKLY = allPowerUps.length;
const MOLASSES = allPowerUps.length + 1;
const MATCHALATTE = allPowerUps.length + 2;
const RICOCHET = allPowerUps.length + 3;
const BREATHER = allPowerUps.length + 4;
const TBOUNCE = allPowerUps.length + 5;


const allPerks = [PRICKLY, MOLASSES, MATCHALATTE, BREATHER, TBOUNCE];
//boss types
const COLUMNLORD = 0;
const BULLETSTORM = 1;
const DREVIL = 2;
let scene = MENU;
let letChoose = false;
let menuButtons = [new Button(RINGWIDTH/2 + LEFTWALL, 200, 150, 25, "Time trial", () => {
	scene = TIMETRIAL;
	ttTimer = 0;
	score = 0;
	player.hasSaw = true;
	player.x = RINGWIDTH/2 + LEFTWALL;
	player.y = RINGWIDTH/2 + LEFTWALL;
	for (let i = 0; i < 3; i++) {
		enemies.push(new Enemy(random(20, 380), random(20, 380), i, CHASER));
	}
}), new Button(RINGWIDTH/2 + LEFTWALL, 230, 150, 25, "Levels", () => scene = LEVELS), new Button(RINGWIDTH/2 + LEFTWALL, 260, 150, 25, "Survival", () => {
	scene = SURVIVE
	scene = SURVIVE
	score = 0;
	player.hasSaw = true;
	player.x = RINGWIDTH/2 + LEFTWALL;
	player.y = FLOOR - RINGHEIGHT/2;
	spawnTime = 50;
	breatheTimer = -1;
	enemies = [];
	fieldUpgrades = [];
	heldPowerups = [new Powerup(0, 0, MOLASSES)];
	blasters = [];
	stage = 0;
	player.lives = 3;
	hurtTimer = 0;
	bosses = [];
})];
let ttOverButtons = [new Button(RINGWIDTH/2 + LEFTWALL, 300, 150, 25, "Try Again? (space)", () => scene = TIMETRIAL), new Button(200, 335, 100, 25, "Menu", () => scene = MENU)];
let levelButtons = [new Button(RINGWIDTH/2 + LEFTWALL, 300, 150, 25, "Menu", () => scene = MENU)];
let surviveOverButtons = [new Button(RINGWIDTH/2 + LEFTWALL, 300, 150, 25, "Try Again? (space)", () => {
	scene = SURVIVE
	score = 0;
	player.hasSaw = true;
	player.x = RINGWIDTH/2 + LEFTWALL;
	player.y = FLOOR - RINGHEIGHT/2;
	spawnTime = 50;
	breatheTimer = -1;
	enemies = [];
	fieldUpgrades = [];
	heldPowerups = [new Powerup(0, 0, MOLASSES)];
	blasters = [];
	stage = 0;
	player.lives = 3;
	hurtTimer = 0;
	bosses = [];
}), new Button(RINGWIDTH/2 + LEFTWALL, 335, 100, 25, "Menu", () => scene = MENU)]
const COLUMNSTAGE = 4;
const BULLETSTAGE = 9;
const DREVILSTAGE = 14;
let ttTimer = 0;
let spawnTime = 50;
let breatheTimer = 0;
let stageBreaks = [10, 25, 40, 55, 56, 70, 85, 100, 115, 116, 130, 145, 160, 175, 176, 190, 205, 220];
// let stageBreaks = [0, 3, 40, 55, COLUMNSTAGE, 70, 85, 90, 105, 120, 135, 150, 165, 180];
// let stageBreaks = [0, BULLETSTAGE, 25, 40, 55, 70, 85, 90, 105, COLUMNSTAGE, 120, 135, 150, 165, 180];

let stage = 5;
let heldPowerups = [new Powerup(200, 200, BLASTER)];
let fieldUpgrades = [];
let powerUpTimer;
let blasters = [];
let hurtTimer = 0;
let bosses = [];

// let testBoss = new Boss(COLUMNLORD);
function preload() {
	img = loadImage('/images/whestler.png');
}

function setup() {
	const myCanvas = createCanvas(1000, 600);
	myCanvas.parent('canvasDiv');
	powerUpTimer = random(300, 500);
	noSmooth();
	// 	for(let i = 0; i < 3; i ++){
	// 		enemies.push(new Enemy(random(20,380), random(20,380),i));
	// 	}
}

function draw() {
	background(0);
	rect(225,25,550,550);
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
	} else if (scene == PAUSE){
		pauseDraw();
	}
}

function ttOverDraw() {
	textAlign(CENTER);
	push();
	fill(255, 255, 255);
	strokeWeight(2);
	rectMode(CENTER);
	rect(RINGWIDTH/2 + LEFTWALL, 260, 80, 20);
	fill(0);
	text("Score: " + score, RINGWIDTH/2 + LEFTWALL, 264)
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
	text("Saw Game :D", RINGWIDTH/2 + LEFTWALL, 100);
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
	// HURT TIMER STUFF
	let hurtColor = color(255, 0, 0);
	hurtColor.setAlpha(hurtTimer);
	background(hurtColor);
	hurtTimer -= 10;
	////////////////////
	//How to get to the next stage
	if (score >= stageBreaks[stage] && breatheTimer < 0) {
		if (stage != COLUMNSTAGE || stage != BULLETSTAGE || stage != DREVILSTAGE) {
			breatheTimer = 80;
		}
	}

	////////////////
	//Rules for spawning
	if (ttTimer <= 0) {
		if (score <= stageBreaks[0]) {
			ttTimer += 50;
		} else {
			ttTimer += spawnTime;
		}
		let v2 = goToward(RINGWIDTH/2 + LEFTWALL, RINGHEIGHT/2 + CEILING, random(LEFTWALL+20, RIGHTWALL-20), random(LEFTWALL+20, RIGHTWALL-20));
		v2.mult(300);
		v2.x += RINGWIDTH/2 + LEFTWALL;
		v2.y += RINGHEIGHT/2 + CEILING;
		while (dist(player.x, player.y, v2.x, v2.y) <= 275) {
			v2 = goToward(RINGWIDTH/2 + LEFTWALL, RINGHEIGHT/2 + CEILING, random(LEFTWALL+20, RIGHTWALL-20), random(LEFTWALL+20, RIGHTWALL-20));
			v2.mult(250);
			v2.x += RINGWIDTH/2 + LEFTWALL;
			v2.y += RINGHEIGHT/2 + CEILING;
		}
		let potentialPointCount = 0;
		for(let i = 0; i < enemies.length; i++){
			if(enemies[i].killable){
				potentialPointCount++;
			}
		}
		if (breatheTimer <= 0 && letChoose == false && (potentialPointCount + score < stageBreaks[stage] || stage == COLUMNSTAGE || stage == BULLETSTAGE || stage == DREVILSTAGE)) {
			if (bosses.length <= 0) {
				if (Math.random() > 0.5 && score >= stageBreaks[0]) {
					spawn(v2.x, v2.y, BULLET);
				} else {
					if (stage > COLUMNSTAGE) {
						if (Math.random() > 0.5) { 
							spawn(v2.x, v2.y, TRACER);
						} else {
							spawn(v2.x, v2.y, CHASER);
						}
					} else {
						spawn(v2.x, v2.y, CHASER);
					}
				}
			} else {
				if (bosses[0].type == COLUMNLORD) {
					if (bosses[0].health >= 40) {
						bosses[0].barsAttack();
						ttTimer = 80;
					} else if (bosses[0].health < 40 && bosses[0].health > 20) {
						bosses[0].columnAttack();
						ttTimer = 130;
					} else {
						bosses[0].zigZagAttack();
						ttTimer = 50;
					}
				}else if(bosses[0].type == BULLETSTORM){
					spawn(v2.x, v2.y, BULLET);
					ttTimer = 18;
					bosses[0].health -= 1;
				}else if(bosses[0].type == DREVIL){
					ttTimer = 50;
					bosses[0].theOldCrissCross();
				}
			}
			// testBoss.attack();
			breatheTimer -= 1;
		}
	}
	////////////////////
	//Updates and shows
	//saw
	if (!player.hasSaw) { saw.show(); }
	saw.update();
	// saw checks
	if (saw.check(player.x, player.y)) {
		saw.speed = 0;
		saw.gotFar = false;
		player.hasSaw = true;
		saw.hitOne = false;
		saw.hitCount = 0;
	}
	if (player.hasSaw) {
		saw.x = player.x;
		saw.y = player.y;
	}

	//BLASTER
	for (let i = 0; i < blasters.length; i++) {
		blasters[i].show();
		blasters[i].update();
		if (blasters[i].ttl == 0) {
			blasters.splice(i, 1);
			i = 0;
		}
	}
	//ENEMIES
	for (let i = 0; i < enemies.length; i++) {
		enemies[i].show();
		enemies[i].update(player.x, player.y);
		if (player.checkDead(enemies[i].x, enemies[i].y, enemies[i].w)) {
			if (player.rageTimer > 0) {
				kill(i);
				continue;
			} else {
				if (player.lives <= 0) {
					player.lifeTimer = 0;
					scene = SURVIVEOVER;
				}
				for (let i = 0; i < heldPowerups.length; i++) {
					if (heldPowerups[i].type == PRICKLY) {
						let shoot = new Powerup(-50, -50, BLASTER);
						shoot.activate();
					}
				}
				hurtTimer = 170;
			}
		}
		if (!player.hasSaw || enemies[i].type == BULLET) {
			if (enemies[i].check(saw.x, saw.y) ) {
				for (let i = 0; i < heldPowerups.length; i++) {
					if (heldPowerups[i].type == RICOCHET && saw.hitOne == false && enemies.length >= 1) {
						saw.hitOne = true;
						let closestDist = 500;
						let closestI = 0;
						for (let i = 0; i < enemies.length; i++) {
							if (dist(saw.x, saw.y, enemies[i].x, enemies[i].y) < closestDist && enemies[i].killable) {
								if (enemies[i].x >= LEFTWALL && enemies[i].x <= RIGHTWALL && enemies[i].y >= 0 && enemies[i].y <= RIGHTWALL) {
									closestDist = dist(saw.x, saw.y, enemies[i].x, enemies[i].y);
									closestI = i;
								}
							}
						}
						if (closestDist <= 200) {
							let target = createVector(enemies[closestI].x, enemies[closestI].y);
							target.sub(createVector(saw.x, saw.y));
							target.normalize();
							saw.setSpeed(target.x * 13, target.y * 13);
						}
					}
				}
			}
		}

	}
	//seperate for blasters to avoid bugs
	for (let i = 0; i < enemies.length; i++) {
		for (let j = 0; j < blasters.length; j++) {
			if (enemies[i].check(blasters[j].x, blasters[j].y)) {
				break;
			}
		}
	}
	//BOSS:
	if (bosses.length > 0) {
		bosses[0].show();
	}
	//PLAYER
	player.show();
	player.update();

	//Check the bosses health:
	if (bosses.length > 0) {
		if (bosses[0].health <= 0) {
			bosses = [];
			breatheTimer = 80;
			enemies = [];
		}
	}
	//////////////
	//Powerup draws
	for (let i = 0; i < fieldUpgrades.length; i++) {
		fieldUpgrades[i].show(fieldUpgrades[i].x, fieldUpgrades[i].y);
		fieldUpgrades[i].showDescription();
		if (fieldUpgrades[i].check(player.x, player.y, player.w)) {
			if (fieldUpgrades[i].type == MATCHALATTE) {
				fieldUpgrades[i].activate;
			}
			heldPowerups.push(fieldUpgrades[i]);
			fieldUpgrades = [];
			i = 0;
			//////////NEW STAGE////////////////
			if (letChoose) {
				letChoose = false;
				stage++;
				breatheTimer = -1;
				if (stage == COLUMNSTAGE) {
					bosses.push(new Boss(COLUMNLORD));
				} else if (stage == BULLETSTAGE) {
					bosses.push(new Boss(BULLETSTORM));
				} else if(stage == DREVILSTAGE){
					bosses.push(new Boss(DREVIL));
				}else {
					spawnTime -= 2;
				}
			}
		}
	}
	let modifier = 0;
	for (let i = 0; i < heldPowerups.length; i++) {
		if (heldPowerups[i].isPerk) {
			modifier += heldPowerups[i].w;
		}
		heldPowerups[i].show(i * (heldPowerups[i].w + 5) + 15 + LEFTWALL - modifier, CEILING + 20);
		if (heldPowerups[i].type == ONEUP) {
			heldPowerups[i].activate();
			heldPowerups.splice(i, 1);
			i = 0;
		}
	}



	let nextPowerUpFlash = false;
	for (let i = 0; i < heldPowerups.length; i++) {
		if (!heldPowerups[i].isPerk) {
			if (heldPowerups[i].type == FLASH) {
				nextPowerUpFlash = true;
			}
			break;
		}
	}

	if (nextPowerUpFlash) {
		push();
		noFill();
		ellipse(player.x, player.y, 250, 250);
		pop();
	}
	///////////////////
	//////////////////
	//Score draw: 
	push();
	fill(255, 255, 255);
	strokeWeight(2);
	rect(RIGHTWALL - 100, CEILING + 20, 80, 20);
	fill(0);
	text("Score: " + score, RIGHTWALL - 70, CEILING + 35);
	pop();
	////////////
	//When do i show the breathe timer text
	if (breatheTimer > 0 && enemies.length == 0 && (score >= stageBreaks[stage] || stage == COLUMNSTAGE || stage == BULLETSTAGE || stage == DREVIL)) {
		push();
		text("BREATHE", RINGWIDTH/2 + LEFTWALL, 200);
		pop();
		breatheTimer--;
		letChoose = true;
	}
	//When do i show powerups?
	if (letChoose && breatheTimer == 0) {
		if (fieldUpgrades.length == 0) {
			let randomPowerup = Math.floor(Math.random() * allPowerUps.length);
			fieldUpgrades.push(new Powerup(RINGWIDTH/2 + LEFTWALL - 75, 200, randomPowerup));
			let perkCount = 0;
			for (let i = 0; i < heldPowerups.length; i++) {
				if (heldPowerups[i].isPerk) {
					perkCount++;
				}
			}

			if (perkCount >= allPerks.length || Math.random() < 0.5) {
				fieldUpgrades.push(new Powerup(RINGWIDTH/2 + LEFTWALL + 75, 200, Math.floor(Math.random() * 4)));
			} else {
				let randomPerk = Math.floor(Math.random() * (allPerks.length + 1)) + allPowerUps.length;
				for (let i = 0; i < heldPowerups.length; i++) {
					if (heldPowerups[i].isPerk) {
						if (heldPowerups[i].type == randomPerk) {
							randomPerk = Math.floor(Math.random() * (allPerks.length + 1)) + allPowerUps.length;
							i = 0;
						}
					}
				}
				fieldUpgrades.push(new Powerup(RINGWIDTH/2 + LEFTWALL + 75, 200, randomPerk, true));
			}

			player.x = RINGWIDTH/2 + LEFTWALL;
			player.y = 350;
			player.xSpeed = 0;
			player.ySpeed = 0;
			player.hasSaw = true;

		}
		text("Choose: ", 200, 200);
	}
	///////////////


	//get the timer going for spawn
	ttTimer--;
	///////////



	// powerUpTimer--;
	// if(powerUpTimer <= 0){
	// 	powerUpTimer = random(300, 700);
	// 	fieldUpgrades.push(new Powerup(random(20,380), random(20,380), RETURNER));
	// }

	// if (dist(player.x, player.y, saw.x, saw.y) >= 70) {
	// 	saw.return = true;
	// }
	// console.log(breatheTimer);

	//Rectangles for pretty :)
	push();
	fill(0);
	rect(0,0,(1000-550)/2,600);
	rect(LEFTWALL, FLOOR, RINGWIDTH, 25);
	rect(LEFTWALL, 0, RINGWIDTH, 25);
	rect(RIGHTWALL, 0, (1000-550)/2,600);
	pop();
	
}

function surviveOverDraw() {
	enemies = [];
	push();
	fill(255, 255, 255);
	strokeWeight(2);
	rectMode(CENTER);
	rect(RINGWIDTH/2 + LEFTWALL, 200, 80, 20);
	fill(0);
	text("Score: " + score, RINGWIDTH/2 + LEFTWALL, 206)
	pop();
	for (let i = 0; i < surviveOverButtons.length; i++) {
		surviveOverButtons[i].show();
	}
}

function pauseDraw(){
	text("PAUSED", 200, 200);
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
	if ((enemies[j].type == CHASER || enemies[j].type == STANDER || enemies[j].type == TRACER) && enemies[j].killable) {
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

function spawn(x, y, type, tx = -1, ty = -1) {
	if (type == CHASER) {
		enemies.push(new Enemy(x, y, 0, CHASER));
	} else if (type == BULLET) {
		// let v2 = goToward(player.x, player.y,x,y);
		// //v2.mult(300);
		// v2.x += 200;
		// v2.y += 200;
		enemies.push(new Enemy(x, y, 0, BULLET, player.x, player.y));
	} else if (type == BULLETBARRIER) {
		enemies.push(new Enemy(x, y, 0, BULLETBARRIER, tx, ty));
	} else if (type == TRACER) {
		enemies.push(new Enemy(x, y, 0, TRACER));
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
			for (let i = 0; i < heldPowerups.length; i++) {
				if (!heldPowerups[i].isPerk) {
					heldPowerups[i].activate();
					heldPowerups.splice(i, 1);
					break;
				}
			}
		}
	}
	if(keyCode === 69 && (scene == SURVIVE || scene == PAUSE)){
		
		if(scene == SURVIVE){
			scene = PAUSE;
		}else{
			scene = SURVIVE;
		}
	}
	if(keyCode === 70){
		stage = DREVILSTAGE-1;
		score = stageBreaks[DREVILSTAGE] - 2;
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