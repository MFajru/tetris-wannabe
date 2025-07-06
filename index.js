var index = function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var fallSpeed = 2;
    var moveSpeed = 2;
    var rectSize = 32;
    var x = canvas.width / 2 - rectSize / 2;
    var y = 0;
    var direction = { left: false, right: false };
    ctx.fillStyle = "green";
    var rectStack = [];
    // let fallingRect: { x: number; y: number } | null = null;
    var rectFallAnimate = function () {
        if (rectStack[rectStack.length - 1] &&
            rectStack[rectStack.length - 1].y == fallSpeed) {
            // fallingRect = null;
            return;
        }
        moveBlock();
        ctx.clearRect(0, 0, canvas.width, rectSize + y);
        ctx.fillRect(x, y, rectSize, rectSize);
        // fallingRect = { x: x, y: y };
        y += fallSpeed;
        if ((rectStack[rectStack.length - 1] &&
            y >= rectStack[rectStack.length - 1].y - rectSize) ||
            y > canvas.height - rectSize) {
            rectStack.push({ x: x, y: y });
            y = 0;
            // fallingRect = null;
            x = canvas.width / 2 - rectSize / 2;
            requestAnimationFrame(rectFallAnimate);
            return;
        }
        requestAnimationFrame(rectFallAnimate);
    };
    var moveBlock = function () {
        if (direction.left && x > 0) {
            x -= moveSpeed;
            return;
        }
        if (direction.right && x < canvas.width - rectSize) {
            x += moveSpeed;
            return;
        }
    };
    document.onkeydown = function (e) {
        if (e.key == "ArrowLeft") {
            console.log("left", x);
            direction.left = true;
        }
        if (e.key == "ArrowRight") {
            console.log("right");
            direction.right = true;
        }
    };
    document.onkeyup = function (e) {
        if (e.key == "ArrowLeft") {
            direction.left = false;
        }
        if (e.key == "ArrowRight") {
            direction.right = false;
        }
    };
    requestAnimationFrame(rectFallAnimate);
    // if (!fallingRect) {
    //   requestAnimationFrame(rectFallAnimate);
    // }
};
index();
