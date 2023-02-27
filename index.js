let bg1_xPos = 0;
let bg2_xPos = 1600;

let state = 1; // Game state
let counter = 0; // Do counter += 1/60;
let distance_timer = 0;
let distance_position = 555;
let live_count = 3;
let time_position = 265;
let star_catch_start = false;
let success = false;
let game_played_1 = false;
let counter_1 = 0;

function preload() {
	bg = loadImage("background/background_new2.png"); // Background
	man_1 = loadImage("pixel/man_1.png"); // Player
	man_2 = loadImage("pixel/man_2.png");
	man_3 = loadImage("pixel/man_3.png");
	doll_back = loadImage("pixel/doll_back.png"); // Doll
	doll_front = loadImage("pixel/doll_front.png");
	gun = loadImage("pixel/gun.png"); // Fail
	gun_fire = loadImage("pixel/gun_fire.png");
	died = loadImage("result/you_died.png");
	fail = loadImage("result/fail.png");
	time_bar = loadImage("progress/time_bar.png"); // Time bar
	distance_bar = loadImage("progress/distance_bar.png"); // Distance bar
	heart = loadImage("progress/heart.png"); // Lives
	squid = loadImage("squid/squid.png"); // Squid for bar
	girl_behind = loadImage("star_catch/girl_behind.png"); // Star catch
	star_catch_bar = loadImage("star_catch/star_catch_bar.png");
	star = loadImage("star_catch/star.png");
	passed = loadImage("star_catch/passed.png");
	man_happy = loadImage("dalgona/man_happy.png");
	dalgona = loadImage("dalgona/dalgona.png");
	man_sad = loadImage("dalgona/man_sad.png");
	song = loadSound("sound/song.mp3");

}

function setup() {
	createCanvas(800,600);
	// Resize images
	bg.resize(1600, 600);
	man_1.resize(281, 400);
	man_2.resize(181, 400);
	man_3.resize(333, 400);
	doll_back.resize(183, 300);
	doll_front.resize(183, 300);
	died.resize(800, 100);
	star_catch_bar.resize(400, 30);
	star.resize(53, 50);
	girl_behind.resize(450, 450);
	man_happy.resize(800, 600);
	dalgona.resize(800, 600);
	man_sad.resize(800, 600);
	// Create objects
	player = new Player();
	doll = new Doll();
	starCatch = new star_catch();

}

function draw() {
	if (state == 1) {
		bg_draw();
		keyDown();
		player.display();
		doll.moveAndDisplay();
		console.log(counter);
		timeBar();
		timeSquid();
		distanceBar();
		distanceSquid();
		live();
		if (game_played_1 == false && distance_position > 500 && distance_position < 520) {
			game_played_1 = true;
			star_catch_start = true;
		}
		if (star_catch_start != true) {
			player.move();
			checkEnd();
		}
		else {
			starCatch.display();
			starCatch.check_sucess();
		}
		if (success == true) { // Display success
			success_display();
		}

	}
	if (state == 2) {
		state2();
	}
	if (state == 3) {
		state3();
	}
}

function bg_draw() {
	image(bg, bg1_xPos, 0);
	image(bg, bg2_xPos, 0);
	if (bg1_xPos <= -1600) {
		bg1_xPos = bg2_xPos + 1600;
	}
	if (bg2_xPos <= -1600) {
		bg2_xPos = bg1_xPos + 1600;
	}
}

function keyPressed() {
	if (keyCode === 71 ) {
		star_catch_start = true;
	}
}

function keyDown() {
	if (star_catch_start != true) {
		if (keyIsDown(68)) {
			bg1_xPos -= 2.5;
			bg2_xPos -= 2.5;
		}
	}
}

function checkEnd() {
	if (doll.image == doll_back && keyIsDown(68) ) {
		state = 2;
	}
}

function timeBar() {
	image(time_bar, 30, 20);
}

function timeSquid() {
	y = 20;
	time_position -= 1/15;
	if (time_position < 31) { // 31~265
		live_count = 1;
		state = 2;
	}
	image(squid, time_position, y);
}

function distanceBar() {
	image(distance_bar, 320, 20);
}

function distanceSquid() {
	y = 20;
	if (distance_position < 322) { // 322~555
		state = 3;
	}
	image(squid, distance_position, y);
}

function live() {
	if (live_count == 3) {
		image(heart, 30, 60);
		image(heart, 70, 60);
		image(heart, 110, 60);
	}
	if (live_count == 2) {
		image(heart, 30, 60);
		image(heart, 70, 60);
	}
	if (live_count == 1) {
		image(heart, 30, 60);
	}
}

function state2() {
	counter += 1/60;
	if (counter > 1) {
		image(gun, 0, 0);
	}

	if (counter > 2) {
		image(gun_fire, 0, 0);
		if (live_count > 1) {
			imageMode(CENTER);
			image(died, width/2, height/2);
			imageMode(CORNER);
		}
		if (live_count == 1) {
			imageMode(CENTER);
			image(fail, width/2, height/2);
			imageMode(CORNER);
			time_position = 265;
			distance_position = 555;
		}

		textSize(30);
		textAlign(CENTER, CENTER);
		fill(200);
		text("Press 'R' to play again", width/2, 2* height/3);
		if (keyIsDown(82) ) {
			if (live_count == 1) {
				live_count = 3; // RESET LIVE

			}
			else {
				live_count--;
			}
			counter = 0;
			state = 1;
		}
	}
}

function state3() {
	counter += 1/60;
	if (counter > 1) {
		image(man_happy, 0 ,0);
	}
	if (counter > 2) {
		image(dalgona, 0 ,0);
	}
	if (counter > 3) {
		image(man_sad, 0 ,0);
	}
	if (counter > 4) {
		reset_game();
		counter = 0;
		state = 1;
	}
}

function reset_game() {
	distance_position = 555;
	live_count = 3;
	time_position = 265;
}

function success_display() {
	imageMode(CENTER);
	counter += 1/60;
	image(passed, width/2, height/2);
	if (counter > 4) {
		star_catch_start = false;
		success = false;
		counter = 0;
	}
	imageMode(CORNER);
}

class Player {

	constructor() {
		this.currentPos = 1;
		this.image = man_1;
	}

	move() {
		if (keyIsDown(68) && (frameCount % 15 == 0) ) {
			this.currentPos++;
			distance_position -= 3; // squid speed
		}
		if (this.currentPos > 4) {
			this.currentPos = 1;
		}
		if (this.currentPos == 1) {
			this.image = man_1;
		}
		if (this.currentPos == 2) {
			this.image = man_2;
		}
		if (this.currentPos == 3) {
			this.image = man_3;
		}
		if (this.currentPos == 4) {
			this.image = man_2;
		}
	}

	display() {
		imageMode(CENTER);
		image(this.image, width/5, height/1.7);
		imageMode(CORNER);
	}
}

class Doll {

	constructor() {
		this.image = doll_back;
	}

	moveAndDisplay() {
		counter_1 += 1/60;
		if (counter_1 < 3) {
			if (this.image == doll_front) {
				this.image = doll_back;
			}
		}
		else {
			if (this.image == doll_back) {
				this.image = doll_front;
				if (!song.isPlaying() ){
					song.play();
				}
			}
		}
		if (counter_1 > 8.2){
			counter_1 = 0;
		}

	image(this.image, width - 183, 0);
	}
}

class star_catch {

	constructor() {
		this.star_position = width/2;
		this.star_direction = 1;
	}

	display() {
		imageMode(CENTER);
		image(girl_behind, width/2, height/2);
		image(star_catch_bar, width/2, height/1.25);
		if (success != true) {
			this.star_position += random(4, 6) * this.star_direction; // Star speed
			if (this.star_position > 595) {
				this.star_position--;
				this.star_direction = (this.star_direction) * -1 ;
			}
			if (this.star_position < 200) {
				this.star_position++;
				this.star_direction = (this.star_direction) * -1 ;
			}
		}

		image(star, this.star_position, height/1.25 - 3);
		imageMode(CORNER);
	}

	check_sucess() {
		imageMode(CENTER);
		if (keyIsDown(32) && ((this.star_position < 362) || (this.star_position > 438)) ) {
			star_catch_start = false;
			state = 2;
		}
		if (keyIsDown(32) && ((this.star_position >= 362) && (this.star_position <= 438)) ) {
			success = true;
		}
		imageMode(CORNER);
	}
}
