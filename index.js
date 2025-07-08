var index = function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var isColliding = false;
    var isEnd = false;
    var fallSpeed = 4;
    var rectSize = 32;
    var x = canvas.width / 2;
    var y = 0;
    var highestBlock = { x: canvas.width, y: canvas.height };
    var rectStack = [];
    var gameLoop = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "gray";
        rectStack.forEach(function (placedBlock) {
            ctx.fillRect(placedBlock.x, placedBlock.y, rectSize, rectSize);
            if (x == placedBlock.x && placedBlock.y < rectSize) {
                isEnd = true;
                return;
            }
            if (x == placedBlock.x && y + rectSize >= placedBlock.y) {
                console.log(x, placedBlock.x);
                isColliding = true;
                return;
            }
        });
        if (isEnd) {
            return;
        }
        ctx.fillStyle = "green";
        if (y >= canvas.height - rectSize) {
            isColliding = true;
        }
        if (isColliding) {
            rectStack.push({ x: x, y: y });
            x = canvas.width / 2;
            y = 0;
            isColliding = false;
        }
        else {
            y += fallSpeed;
        }
        if (rectStack[rectStack.length - 1] &&
            rectStack[rectStack.length - 1].y <= highestBlock.y) {
            highestBlock.x = rectStack[rectStack.length - 1].x;
            highestBlock.y = rectStack[rectStack.length - 1].y;
        }
        ctx.fillRect(x, y, rectSize, rectSize);
        requestAnimationFrame(gameLoop);
    };
    document.onkeydown = function (e) {
        console.log(highestBlock);
        if (e.key == "ArrowLeft" && x > 0) {
            x -= rectSize;
        }
        if (e.key == "ArrowRight" && x < canvas.width - rectSize) {
            x += rectSize;
        }
    };
    gameLoop();
};
index();
