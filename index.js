var index = function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var startPoint = -16;
    var isBlocked = false;
    var isColliding = false;
    var isEnd = false;
    var fallSpeed = 4;
    var rectSize = 32;
    var x = canvas.width / 2;
    var y = startPoint;
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
                isColliding = true;
                return;
            }
        });
        if (isEnd) {
            return;
        }
        if (y >= canvas.height - rectSize) {
            isColliding = true;
        }
        if (isColliding) {
            rectStack.push({ x: x, y: y });
            x = canvas.width / 2;
            y = startPoint;
            isColliding = false;
        }
        else {
            y += fallSpeed;
        }
        ctx.fillStyle = "green";
        ctx.fillRect(x, y, rectSize, rectSize);
        isBlocked = false;
        requestAnimationFrame(gameLoop);
    };
    document.onkeydown = function (e) {
        if (e.key == "ArrowLeft") {
            if (x <= 0) {
                isBlocked = true;
                return;
            }
            rectStack.forEach(function (placedBlock) {
                if (placedBlock.x == x - rectSize && placedBlock.y - y < rectSize) {
                    isBlocked = true;
                    return;
                }
            });
            if (!isBlocked) {
                x -= rectSize;
            }
        }
        if (e.key == "ArrowRight") {
            if (x >= canvas.width - rectSize) {
                isBlocked = true;
            }
            rectStack.forEach(function (placedBlock) {
                if (placedBlock.x == x + rectSize && placedBlock.y - y < rectSize) {
                    isBlocked = true;
                    return;
                }
            });
            if (!isBlocked) {
                x += rectSize;
            }
        }
    };
    gameLoop();
};
index();
