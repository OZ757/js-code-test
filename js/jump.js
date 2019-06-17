function jump() {
	// create a div to contain canvas
	let createDiv = document.createElement('div');
	createDiv.classList.add('foo');
	document.body.appendChild(createDiv);

	// Player canvas container
	let c = document.createElement('canvas');
	c.width = 640;
	c.height = 300;
	document.querySelector('.foo').appendChild(c);
	let ctx = c.getContext('2d');

	// Player control of role
	let img = new Image();
	img.src = 'img/lamp.gif';
	let roleY = 160;
	let roleX = 270;
	img.onload = function () {
		ctx.drawImage(img,roleX,roleY);
	};

	// Enemy role
	let enemyImg = new Image();
	enemyImg.src = 'img/cloud.png';
	let enemyX = 0;
	let enemyY = 200;
	let enemyMove = 4;

	// jump range
	let move = 0;
	let moveRole = function () {
		if (roleY < 40) {
			move = 4;
		}
		roleY = roleY + move;
		if (roleY > 160) {
			move = 0;
		}
	}

	// enemy repeatedly appear
	let enemyRepeat = function () {
		let rand = Math.floor(Math.random() * 2);
		if (rand == 1) {
			enemyX = -105;
			enemyMove = 4;
		} else {
			enemyX = 640;
			enemyMove = -4;
		}
	}

	// game over effect 
	let gameover = 0;
	let checkHit = function () {
		let sx1 = roleX;
		let sx2 = roleX + 48;
		let ex1 = enemyX;
		let ex2 = enemyX + 107;
		let foot = roleY + 50;
		if (sx1 < ex2 && ex1 < sx2) {
			if (foot > 200) {
				gameover = 1;
			}
		}
	}

	// jump and enemy effect
	let loop = function () {
		// jump range function
		moveRole();

		// enemy range
		if (enemyMove == 0) {
			enemyRepeat();
		}
		enemyX = enemyX + enemyMove;
		if  (enemyX < -105 || enemyX > 640) {
			enemyMove = 0;
		}

		// client redraw
		ctx.clearRect(0, 0, 640, 360);
		ctx.drawImage(img, roleX, roleY);
		ctx.drawImage(enemyImg, enemyX, enemyY);

		// check hit
		checkHit();
		if (gameover == 1) {
			ctx.font = '32px Microsoft-YaHei'
			ctx.strokeStyle = '#111';
			ctx.fillText('GAME OVER', 200 ,100);
		} else {
		window.requestAnimationFrame(loop);
		}		
	};

	// player role jump
	let moveStart = function () {
		if (move == 0) {
			move = -4;
		}
	}
	c.addEventListener('click', moveStart);
	loop();
}
document.addEventListener('DOMContentLoaded', jump);
