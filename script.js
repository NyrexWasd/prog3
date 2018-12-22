var side = 10;
var socket = io();
socket.on("season", sezon);
var backgroundcolor = "#acacac";

function sezon(season) {
    console.log(season);
    if (season == "spring")
        backgroundcolor = "#996633";
    else if (season == "summer")
        backgroundcolor = "#ffff99";
    else if (season == "autumn")
        backgroundcolor = "#ff8000";
    else if (season == "winter")
        backgroundcolor = "#ffffff";
}
function setup() {
    createCanvas(500, 500);
    background("#acacac");
}
function drawMatrix(matrix) {
    background("#acacac");
    for (var y in matrix) {
        for (var x in matrix[y]) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill(backgroundcolor);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            else if (matrix[y][x] == 5) {
                fill("pink");

            }
            rect(x * side, y * side, side, side);
        }
    }
}

socket.on('matrix', drawMatrix);