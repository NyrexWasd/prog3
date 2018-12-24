var LivingCreature=require("./LivingCreature.js");
module.exports=class Grass extends LivingCreature{
	constructor(x, y) {
        super(x,y);
	}
	bazmanal() {
		this.multiply++;
		var norVandak = this.yntrelVandak(0)[Math.floor(Math.random() * this.yntrelVandak(0).length)];
		if (this.multiply >= 3 && norVandak) {
			global.norXot = new Grass(norVandak[0], norVandak[1]);
			GrassArr.push(norXot);
			matrix[norVandak[1]][norVandak[0]] = 1;
			this.multiply = 0;
			statistics.grass.born.norXot=global.norXot;
        }
    }
}