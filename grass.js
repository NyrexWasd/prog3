class Grass extends LivingCreature{
	constructor(x, y) {
        super(x,y);
		this.x = x;
		this.y = y;
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