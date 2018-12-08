var matrix = [];
var GrassArr = [];
var CowArr = [];
var WolfArr = [];
var MenArr = [];
var GirlArr = [];
for (var y = 0; y < 51; y++) {
	matrix[y] = [];
	for (var x = 0; x < 51; x++) {
		var rand = (Math.random()) * 100;
		if (rand < 20) {
			matrix[y][x] = 1;
		}
		else if (rand > 20 && rand < 50) {
			matrix[y][x] = 2;
		}
		else if (rand > 50 && rand < 70) {
			matrix[y][x] = 3;
		}
		else if (rand > 70 && rand < 72) {
			matrix[y][x] = 4;
		}
		else if (rand > 72 && rand < 55) {
			matrix[y][x] = 5;
		}
		else {
			matrix[y][x] = 1;
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
		if (this.multiply >= 3 && norVandak) {
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
		this.multiply = 0;
		this.energy = 10;
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
		this.multiply++;
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
			if (this.s >= 1) {
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







class Wolf {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.color = "red";
		this.energy = 1;
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
		var lcell = random(this.chooseCell(1));
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
			this.die();
		}
	}
	spread() {
		var newCell = this.chooseCell(0);
		var newLCell = this.chooseCell(1);
		var newCellRand = random(newCell);
		var newLCellRand = random(newLCell);
		if (newLCellRand) {
			var nwx = newLCellRand[1];
			var wy = newLCellRand[0];
			matrix[wy][nwx] = 3;
			var newWolf = new Wolf(nwx, wy);
			WolfArr.push(newWolf);
		}
		else if (newCellRand) {
			var nwx = newCellRand[1];
			var wy = newCellRand[0];
			matrix[wy][nwx] = 3;
			var newWolf = new Wolf(nwx, wy);
			WolfArr.push(newWolf);
		}
	}
	eat() {
		var ecell = random(this.chooseCell(2));
		if (ecell) {
			matrix[this.y][this.x] = 0;
			this.y = ecell[1];
			this.x = ecell[0];
			for (var i in CowArr) {
				if (this.x == CowArr[i].x && this.y == CowArr[i].y) {
					CowArr.splice(i, 1);
				}
			}
			matrix[this.y][this.x] = 3;
			this.s++;
			if (this.s >= 5) {
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
		for (var i in WolfArr) {
			if (this.x == WolfArr[i].x && this.y == WolfArr[i].y) {
				WolfArr.splice(i, 1)
			}
		}
	}
}




class Men {
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
		var newCellRand = random(this.chooseCellH(0));
		if (newCellRand) {
			var wy = newCellRand[0];
			var nwx = newCellRand[1];
			var rnd = Math.round(Math.random());
			if (rnd == 1 && newCellRand) {
				matrix[wy][nwx] = 4;
				var newMen = new Men(nwx, wy);
				MenArr.push(newMen);
			}
			else if (rnd == 0 && newCellRand) {
				matrix[wy][nwx] = 5;
				var newGirl = new Girl(nwx, wy);
				GirlArr.push(newGirl);
			}
		}

	}

	//________________________________________________
	move() {
		if (this.ss > 1) {
			var cell = random(this.chooseCellH(0));
			var lcell = random(this.chooseCellH(1));
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
		var ecell = random(this.chooseCell(2));
		if (ecell) {
			matrix[this.y][this.x] = 0;
			this.y = ecell[1];
			this.x = ecell[0];
			for (var i in CowArr) {
				if (this.x == CowArr[i].x && this.y == CowArr[i].y) {
					CowArr.splice(i, 1);
					this.xx++;
					this.multiply--;
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
		}
	}
	die() {
		matrix[this.y][this.x] = 0;
		for (var i in MenArr) {
			if (this.x == MenArr[i].x && this.y == MenArr[i].y) {
				MenArr.splice(i, 1);
			}
		}
	}
}




class Girl {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.color = "pink";
		this.multiply = 0;
		this.xx = 0;
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
		var newCellRand = random(this.chooseCellH(0));
		if (newCellRand) {
			var wy = newCellRand[0];
			var nwx = newCellRand[1];
			var rnd = Math.round(Math.random());
			if (rnd == 1 && newCellRand) {
				matrix[wy][nwx] = 4;
				var newMen = new Men(nwx, wy);
				MenArr.push(newMen);
			}
			else if (rnd == 0 && newCellRand) {
				matrix[wy][nwx] = 5;
				var newGirl = new Girl(nwx, wy);
				GirlArr.push(newGirl);
			}
		}
	}
	move() {
		if (this.ss > 1) {
			var cell = random(this.chooseCellH(0));
			var lcell = random(this.chooseCellH(1));
			if (lcell) {
				matrix[this.y][this.x] = 1;
				this.y = lcell[1];
				this.x = lcell[0];
				matrix[this.y][this.x] = 5;
			}
			else if (cell) {
				matrix[this.y][this.x] = 0;
				this.y = cell[1];
				this.x = cell[0];
				matrix[this.y][this.x] = 5;

			}
		}
	}
	eat() {
		var ecell = random(this.chooseCell(1));
		if (ecell) {
			matrix[this.y][this.x] = 0;
			this.y = ecell[1];
			this.x = ecell[0];
			for (var i in CowArr) {
				if (this.x == CowArr[i].x && this.y == CowArr[i].y) {
					CowArr.splice(i, 1);
					this.xx++;
					this.multiply--;
				}
			}
			matrix[this.y][this.x] = 5;

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
		}
	}
	die() {
		matrix[this.y][this.x] = 0;
		for (var i in GirlArr) {
			if (this.x == GirlArr[i].x && this.y == GirlArr[i].y) {
				GirlArr.splice(i, 1)
			}
		}
	}
}