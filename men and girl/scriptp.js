var side = 10;
function setup() {
    frameRate();
    createCanvas(50, 50);
    background('#acacac');
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 4) {
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
if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("pink");
                rect(x * side, y * side, side, side);
            }
            else {
                fill("#acacac");
                rect(y * side, x * side, side, side);
            }
        }
    }
    
    for (var i in MenArr) {
        MenArr[i].eat();
    }
    for (var i in GirlArr) {
        GirlArr[i].eat();
    }
}



