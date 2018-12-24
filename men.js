var Grass = require("./grass.js");
var Cow = require("./cow.js");
var Wolf = require("./wolf.js");
var Girl = require("./girl.js");
module.exports = class Men {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.color = "blue";
		this.multiply = 0;
		this.xx = 0;
		this.ss = 0;
	}
	stanalNorKordinatner() {
		this.directions = [
			[this.x - 2, this.y - 2],
			[this.x - 1, this.y - 2],
			[this.x, this.y - 2],
			[this.x + 1, this.y - 2],
			[this.x + 2, this.y - 2],
			[this.x - 2, this.y - 1],
			[this.x + 2, this.y - 1],
			[this.x - 2, this.y],
			[this.x + 2, this.y],
			[this.x - 2, this.y + 1],
			[this.x + 2, this.y + 1],
			[this.x - 2, this.y + 2],
			[this.x - 1, this.y + 2],
			[this.x, this.y + 2],
			[this.x + 1, this.y + 2],
			[this.x + 2, this.y + 2]
		];
	}


	chooseCell(ch) {
		var found = [];
		this.stanalNorKordinatner()
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == ch) {
					found.push(this.directions[i]);
				}
			}
		}
		return found;
	}
	HandipmanKordinatner() {
		this.directionss = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1]
		];
	}
	chooseCellH(hc) {
		var foundd = [];
		this.HandipmanKordinatner()
		for (var i in this.directionss) {
			var x = this.directionss[i][0];
			var y = this.directionss[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == hc) {
					foundd.push(this.directionss[i]);
				}
			}
		}
		return foundd;
	}
	spread() {
		var srnd;
		var newCellRand = this.chooseCellH(0)[Math.floor(Math.random() * this.chooseCellH(0).length)];
		if (newCellRand) {
			var wy = newCellRand[0];
			var nwx = newCellRand[1];
			var rnd = Math.round(Math.random());
			if (rnd == 1 && newCellRand) {
				matrix[wy][nwx] = 4;
				global.newMen = new Men(nwx, wy);
				MenArr.push(global.newMen);
				statistics.men.born.auto.newMen = global.newMen;
			}
			else if (rnd == 0 && newCellRand) {
				matrix[wy][nwx] = 5;
				global.newGirl = new Girl(nwx, wy);
				GirlArr.push(global.newGirl);
				statistics.girl.born.auto.newGirl = newGirl;
			}
		}

	}

	//________________________________________________
	move() {
		if (this.ss > 1) {
			var cell = this.chooseCellH(0)[Math.floor(Math.random() * this.chooseCellH(0).length)];
			var lcell = this.chooseCellH(1)[Math.floor(Math.random() * this.chooseCellH(1).length)];
			if (lcell) {
				matrix[this.y][this.x] = 1;
				this.y = lcell[1];
				this.x = lcell[0];
				matrix[this.y][this.x] = 4;
			}
			else if (cell) {
				matrix[this.y][this.x] = 0;
				this.y = cell[1];
				this.x = cell[0];
				matrix[this.y][this.x] = 4;

			}
		}

	}
	eat() {
		this.ss++;
		var ecell = this.chooseCell(2)[Math.floor(Math.random() * this.chooseCell(2).length)];;
		if (ecell) {
			matrix[this.y][this.x] = 0;
			this.y = ecell[1];
			this.x = ecell[0];
			for (var i in CowArr) {
				if (this.x == CowArr[i].x && this.y == CowArr[i].y) {
					CowArr.splice(i, 1);
					this.xx++;
					this.multiply--;
					statistics.cow.die.eaten.newHerb = global.newHerb;
					break;
				}
			}
			matrix[this.y][this.x] = 4;

		}
		else {
			this.move();
		}
		this.multiply++;

		if (this.xx == 2) {
			this.spread();
		}

		if (this.multiply > 14) {
			this.die();
			statistics.men.die.sovac_u_old.newMen = global.newMen;
		}
	}
	die() {
		matrix[this.y][this.x] = 0;
		for (var i in MenArr) {
			if (this.x == MenArr[i].x && this.y == MenArr[i].y) {
				MenArr.splice(i, 1);
				break;
			}
		}
	}
}


