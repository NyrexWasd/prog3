var side = 10;
function setup() {
    frameRate(4);
    createCanvas(50, 50);
    background('#acacac');
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                fill("green");
                rect(y * side, x * side, side, side);
                GrassArr.push(new Grass(x, y));
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(y * side, x * side, side, side);
                CowArr.push(new Cow(x, y));
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

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
           else {
                fill("#acacac");
                rect(y * side, x * side, side, side);
            }
        }
    }
    for (var i in GrassArr) {
        GrassArr[i].bazmanal();
    }
    for (var i in CowArr) {
        CowArr[i].eat();
    }
}



