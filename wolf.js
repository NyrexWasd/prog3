var Grass = require("./grass.js");
var Cow = require("./cow.js");
module.exports = class Wolf {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.color = "red";
		this.energy = 2;
		this.s = 0;
	}
	stanalNorKordinatner() {
		this.directions = [
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
	move() {
		var cell = this.chooseCell(0)[Math.floor(Math.random() * this.chooseCell(0).length)];
		var lcell = this.chooseCell(1)[Math.floor(Math.random() * this.chooseCell(1).length)];
		if (lcell) {
			matrix[this.y][this.x] = 1;
			this.y = lcell[1];
			this.x = lcell[0];
			matrix[this.y][this.x] = 3;
		}
		else if (cell) {
			matrix[this.y][this.x] = 1;
			this.y = cell[1];
			this.x = cell[0];
			matrix[this.y][this.x] = 3;
		}
		this.energy--;
		if (this.energy < 1) {
			statistics.wolf.die.sovac_u_old.newWolf = global.newWolf;
			this.die();
		}
	}
	spread() {
		var newCellRand = this.chooseCell(0)[Math.floor(Math.random() * this.chooseCell(0).length)];
		var newLCellRand = this.chooseCell(1)[Math.floor(Math.random() * this.chooseCell(1).length)];
		if (newLCellRand) {
			var nwx = newLCellRand[1];
			var wy = newLCellRand[0];
			matrix[wy][nwx] = 3;
			global.newWolf = new Wolf(nwx, wy);
			WolfArr.push(global.newWolf);
		}
		else if (newCellRand) {
			var nwx = newCellRand[1];
			var wy = newCellRand[0];
			matrix[wy][nwx] = 3;
			global.newWolf = new Wolf(nwx, wy);
			WolfArr.push(global.newWolf);
		}
	}
	eat() {
		var ecell = this.chooseCell(2)[Math.floor(Math.random() * this.chooseCell(2).length)];
		if (ecell) {
			matrix[this.y][this.x] = 0;
			this.y = ecell[1];
			this.x = ecell[0];
			for (var i in CowArr) {
				if (this.x == CowArr[i].x && this.y == CowArr[i].y) {
					CowArr.splice(i, 1);
					break;
				}
			}
			matrix[this.y][this.x] = 3;
			this.s++;
			if (this.s >= 5) {
				this.spread();
				this.s = 0;
				statistics.wolf.born.newWolf = global.newWolf;
			}
		}
		else {
			this.move();
		}
	}
	die() {
		matrix[this.y][this.x] = 0;
		for (var i in WolfArr) {
			if (this.x == WolfArr[i].x && this.y == WolfArr[i].y) {
				WolfArr.splice(i, 1);
				break;
			}
		}
	}
}

