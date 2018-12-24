var LivingCreature = require("./LivingCreature.js");
var Grass = require("./grass.js");
module.exports = class Cow extends LivingCreature {
	constructor(x, y) {
		super(x, y);
		this.energy = 4;
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

	move() {
		var cell = this.yntrelVandak(0)[Math.floor(Math.random() * this.yntrelVandak(0).length)];
		if (cell) {
			matrix[this.y][this.x] = 0;
			this.y = cell[1];
			this.x = cell[0];
			matrix[this.y][this.x] = 2;
			this.energy--;
			if (this.energy < 1) {
				this.die();
				statistics.cow.die.sovac_u_old.newHerb = global.newHerb;
			}
		}
	}

	spread() {
		var newCellRand = this.yntrelVandak(0)[Math.floor(Math.random() * this.yntrelVandak(0).length)];
		this.multiply++;
		if (newCellRand) {
			var nwx = newCellRand[1];
			var wy = newCellRand[0];
			matrix[wy][nwx] = 2;
			global.newHerb = new Cow(nwx, wy);
			CowArr.push(global.newHerb);

		}
	}

	eat() {
		var ecell = this.yntrelVandak(1)[Math.floor(Math.random() * this.yntrelVandak(1).length)];;
		if (ecell) {
			matrix[this.y][this.x] = 0;
			this.y = ecell[1];
			this.x = ecell[0];
			for (var i in GrassArr) {
				if (this.x == GrassArr[i].x && this.y == GrassArr[i].y) {
					GrassArr.splice(i, 1);
					statistics.grass.die.eaten.norXot = global.norXot;
					break;
				}
			}

			matrix[this.y][this.x] = 2;
			this.s++;
			if (this.s >= 4) {
				this.spread();
				statistics.cow.born.newHerb = global.newHerb;
				this.s = 0;
			}
		}
		else {
			this.move();
		}

	}
	die() {
		matrix[this.y][this.x] = 0;
		for (var i in CowArr) {
			if (this.x == CowArr[i].x && this.y == CowArr[i].y) {
				CowArr.splice(i, 1);
				break;
			}

		}
	}
}