// var side = 10;
// function setup() {
//     frameRate(20);
//     createCanvas(500, 500);
//     background('black');
//     matrix = [];
//     GrassArr = [];
//     CowArr = [];
//     WolfArr = [];
//     MenArr = [];
//     GirlArr = [];
//     for (var y = 0; y < 51; y++) {
//         matrix[y] = [];
//         for (var x = 0; x < 51; x++) {
//             var rand = (Math.random()) * 100;
//             if (rand < 20) {
//                 matrix[y][x] = 1;
//             }
//             else if (rand > 20 && rand < 50) {
//                 matrix[y][x] = 2;
//             }
//             else if (rand > 50 && rand < 70) {
//                 matrix[y][x] = 3;
//             }
//             else if (rand > 70 && rand < 72) {
//                 matrix[y][x] = 4;
//             }
//             else if (rand > 72 && rand < 55) {
//                 matrix[y][x] = 5;
//             }
//             else {
//                 matrix[y][x] = 1;
//             }
//         }
//     }
//     console.log(matrix);
//     for (var y = 0; y < matrix.length; ++y) {
//         for (var x = 0; x < matrix[y].length; ++x) {
//             if (matrix[y][x] == 1) {
//                 fill("green");
//                 rect(y * side, x * side, side, side);
//                 GrassArr.push(new Grass(x, y));
//             }
//             else if (matrix[y][x] == 2) {
//                 fill("yellow");
//                 rect(y * side, x * side, side, side);
//                 CowArr.push(new Cow(x, y));
//             }
//             else if (matrix[y][x] == 3) {
//                 fill("red");
//                 rect(y * side, x * side, side, side);
//                 WolfArr.push(new Wolf(x, y));
//             }
//             else if (matrix[y][x] == 4) {
//                 fill("blue");
//                 rect(y * side, x * side, side, side);
//                 MenArr.push(new Men(x, y));
//             }
//             else if (matrix[y][x] == 5) {
//                 fill("pink");
//                 rect(y * side, x * side, side, side);
//                 GirlArr.push(new Girl(x, y));
//             }
//             else {
//                 fill("black");
//                 rect(y * side, x * side, side, side);
//             }
//         }
//     }
// }
// function draw() {
//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {

//             if (matrix[y][x] == 1) {
//                 fill("green");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 0) {
//                 fill("black");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 2) {
//                 fill("yellow");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 3) {
//                 fill("red");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 4) {
//                 fill("blue");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 5) {
//                 fill("pink");
//                 rect(x * side, y * side, side, side);
//             }
//         }
//     }
//     for (var i in GrassArr) {
//         GrassArr[i].bazmanal();
//     }
//     for (var i in CowArr) {
//         CowArr[i].eat();
//     }
//     for (var i in WolfArr) {
//         WolfArr[i].eat();
//     }
//     for (var i in MenArr) {
//         MenArr[i].eat();
//     }
//     for (var i in GirlArr) {
//         GirlArr[i].eat();
//     }
// }
var side = 10;
var socket = io();
function setup() {
    createCanvas(500, 500);
    background("#acacac");
    // frameRate(20);
}
function drawMatrix(matrix) {
    background("#acacac");
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
}

socket.on('matrix', drawMatrix);



