var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);
var fs = require('fs');
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
statistics = {
    "grass": {
        "born": {},
        "die": {
            "click": {},
            "eaten": {/*+*/ },
        },
    },
    "cow": {
        "born": {/*+*/ },
        "die": {
            "click": {},
            "eaten": {/*+*/ },
            "sovac_u_old": {/*+*/ },
        },
    },
    "wolf": {
        "born": {/*+*/ },
        "die": {
            "click": {},
            "eaten": {},
            "sovac_u_old": {/*+*/ },
        },
    },
    "men": {
        "born": {
            "click": {},
            "auto": {/*+-*/ },
        },
        "die": {
            "click": {},
            "eaten": {},
            "sovac_u_old": {/*+*/ },
        }
    },
    "girl": {
        "born": {
            "click": {},
            "auto": {/*+-*/ },
        },
        "die": {
            "click": {},
            "eaten": {},
            "sovac_u_old": {},
        },
    },
}
var tact = 0;
var Grass = require("./grass.js");
var Cow = require("./cow.js");
var Wolf = require("./wolf.js");
var Men = require("./men.js");
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



io.on('connection', function (socket) {
    socket.on("eventCordinat", function (c) {
        x = c[0];
        y = c[1];
        if (matrix[y][x] == 2) {
            for (var i in CowArr) {
                if (this.x == CowArr[i].x && this.y == CowArr[i].y) {
                    CowArr.splice(i, 1);
                    break;
                }
            }
        }

        else if (matrix[y][x] == 1) {
            for (var i in GrassArr) {
                if (GrassArr[i].x == this.x && GrassArr[i].y == this.y) {
                    GrassArr.splice(i, 1);
                }
            }
        }

        else if (matrix[y][x] == 4) {
            for (var i in MenArr) {
                if (this.x == MenArr[i].x && this.y == MenArr[i].y) {
                    MenArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (matrix[y][x] == 3) {
            for (var i in WolfArr) {
                if (this.x == WolfArr[i].x && this.y == WolfArr[i].y) {
                    WolfArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (matrix[y][x] == 4) {
            for (var i in GirlArr) {
                if (this.x == GirlArr[i].x && this.y == GirlArr[i].y) {
                    GirlArr.splice(i, 1);
                    break;
                }
            }
        }
        if (Math.random() > 0.5) {
            var avelacnelid = 4;
            var avelacnel = MenArr;
            var avelacnelclass = Men;
        }
        else {
            var avelacnelid = 5;
            var avelacnel = GirlArr;
            var avelacnelclass = Girl;
        }

        matrix[y][x] = avelacnelid;
        avelacnel.push(new avelacnelclass(x * 1, y * 1, avelacnelid /*2 er, xiii????*/));
    });
});




var season;

function spring() {
    season = "spring";
}

function summer() {
    season = "summer";
}

function autumn() {
    season = "autumn";
}

function winter() {
    season = "winter";
}
function draw() {
    if (tact % 20 >= 0 && tact % 20 < 5)
        spring();
    else if (tact % 20 >= 5 && tact % 20 < 10)
        summer();
    else if (tact % 20 >= 10 && tact % 20 < 15)
        autumn();
    else if (tact % 20 >= 15 && tact % 20 < 20)
        winter();
    for (var i in GrassArr) {
        if (tact % 20 >= 0 && tact % 20 < 15) {
            GrassArr[i].bazmanal();
        }
    }
    for (var i in CowArr) {
        if (tact % 20 >= 0 && tact % 20 < 15) {
            CowArr[i].eat();
        }
    }
    for (var i in WolfArr) {
        if (tact % 20 >= 5 && tact % 20 < 20) {
            WolfArr[i].eat();
        }
    }
    for (var i in MenArr) {
        MenArr[i].eat();
    }
    for (var i in GirlArr) {
        GirlArr[i].eat();
    }
    io.sockets.emit("season", season);
    io.sockets.emit("matrix", matrix);
    tact++;
    var dictstring = JSON.stringify(statistics);
    fs.writeFile("obj.json", dictstring);
}
setInterval(draw, 500);