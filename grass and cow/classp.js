var matrix = [];
var GrassArr = [];
var CowArr = [];

for (var y = 0; y < 6; y++) {
	matrix[y] = [];
	for (var x = 0; x < 6; x++) {
		var rand = (Math.random()) * 100;
		if (rand < 50) {
			matrix[y][x] = 1;
		}
		
		else {
			matrix[y][x] = 2;
		}
	}
}
console.log(matrix);
class Grass {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.color = "green";
		this.multiply = 0;
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
	yntrelVandak(ch) {
		var found = [];
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
	bazmanal() {
		this.multiply++;
		var norVandak = random(this.yntrelVandak(0));
		if (this.multiply >= 4 && norVandak) {
			var norXot = new Grass(norVandak[0], norVandak[1]);
			GrassArr.push(norXot);
			matrix[norVandak[1]][norVandak[0]] = 1;
			this.multiply = 0;
		}
	}
}

class Cow {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.color = "yellow";
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
		var cell = random(this.chooseCell(0));
		if (cell) {
			matrix[this.y][this.x] = 0;
			this.y = cell[1];
			this.x = cell[0];
			matrix[this.y][this.x] = 2;
			this.energy--;
			if (this.energy < 1) {
				this.die();
			}
		}
	}

	spread() {
		var newCell = this.chooseCell(0);
		var newCellRand = random(newCell);
		if (newCellRand) {
			var nwx = newCellRand[1];
			var wy = newCellRand[0];
			matrix[wy][nwx] = 2;
			var newHerb = new Cow(nwx, wy);
			CowArr.push(newHerb);

		}
	}

	eat() {
		var ecell = random(this.chooseCell(1));
		if (ecell) {
			matrix[this.y][this.x] = 0;
			this.y = ecell[1];
			this.x = ecell[0];
			for (var i in GrassArr) {
				if (this.x == GrassArr[i].x && this.y == GrassArr[i].y) {
					GrassArr.splice(i, 1);
				}
			}

			matrix[this.y][this.x] = 2;
			this.s++;
			if (this.s >= 4) {
				this.spread();
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
			}

		}
	}
}


