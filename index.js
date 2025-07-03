var index = function () {
    var canvas = document.getElementById("myCanvas");
    if (canvas == null) {
        return;
    }
    var ctx = canvas.getContext("2d");
    if (ctx == null) {
        return;
    }
    ctx.beginPath();
    for (var i = 0; i < 4; i++) {
        ctx.rect(i * 64, 448, 64, 64);
    }
    ctx.stroke();
};
index();
