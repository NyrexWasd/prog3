var side = 10;
function setup() {
    frameRate(4);
    createCanvas(50, 50);
    background('#acacac');
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
           if (matrix[y][x] == 2) {
                fill("yellow");
                rect(y * side, x * side, side, side);
                CowArr.push(new Cow(x, y));
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(y * side, x * side, side, side);
                WolfArr.push(new Wolf(x, y));
            }
            
            else {
                fill("#acacac");
                rect(y * side, x * side, side, side);
            }
        }
    }
}
function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else {
                fill("#acacac");
                rect(y * side, x * side, side, side);
            }

            
        }
    }
    
    for (var i in CowArr) {
        CowArr[i].eat();
    }
    for (var i in WolfArr) {
        WolfArr[i].eat();
    }
   
}



