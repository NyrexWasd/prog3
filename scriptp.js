var side = 10;
function setup() {
    frameRate(20);
    createCanvas(500, 500);
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
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(y * side, x * side, side, side);
                WolfArr.push(new Wolf(x, y));
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(y * side, x * side, side, side);
                MenArr.push(new Men(x, y));
            }
            else if (matrix[y][x] == 5) {
                fill("pink");
                rect(y * side, x * side, side, side);
                GirlArr.push(new Girl(x, y));
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
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("pink");
                rect(x * side, y * side, side, side);
            }
        }
    }
    for (var i in GrassArr) {
        GrassArr[i].bazmanal();
    }
    for (var i in CowArr) {
        CowArr[i].eat();
    }
    for (var i in WolfArr) {
        WolfArr[i].eat();
    }
    for (var i in MenArr) {
        MenArr[i].eat();
    }
    for (var i in GirlArr) {
        GirlArr[i].eat();
    }
}



