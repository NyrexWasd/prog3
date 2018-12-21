var express = require('express');
var app = express();
var server = require('http').Server(app);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

var Grass = require("./grass.js");
var Cow = require("./cow.js");
var Wolf = require("./wolf.js");
var Men = require("./wolf.js");
var Girl = require("./girl.js");


matrix = [];
GrassArr = [];
CowArr = [];
WolfArr = [];
MenArr = [];
GirlArr = [];
WolfArr = [];

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


for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
        if (matrix[y][x] == 1) {
            GrassArr.push(new Grass(x, y));
        }
        else if (matrix[y][x] == 2) {
            CowArr.push(new Cow(x, y));
        }
        else if (matrix[y][x] == 3) {
            WolfArr.push(new Wolf(x, y));
        }
        else if (matrix[y][x] == 4) {
            MenArr.push(new Men(x, y));
        }
        else if (matrix[y][x] == 5) {
            GirlArr.push(new Girl(x, y));
        }
    }
}

function draw()
{
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



setInterval(draw, 1000);

console.log(matrix);