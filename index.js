var index = function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var fallSpeed = 2;
    var moveSpeed = 2;
    var rectSize = 32;
    var x = canvas.width / 2;
    var y = 0;
    var direction = { left: false, right: false };
    ctx.fillStyle = "green";
    var rectStack = [];
    var rectFallAnimate = function () {
        if (rectStack[rectStack.length - 1] &&
            rectStack[rectStack.length - 1].y == fallSpeed) {
            return;
        }
        // moveBlock();
        // ctx.clearRect(0, 0, canvas.width, rectSize + y);
        ctx.fillRect(x, y, rectSize, rectSize);
        y += fallSpeed;
        // if (
        //   (rectStack[rectStack.length - 1] &&
        //     x != rectStack[rectStack.length - 1].x - rectSize &&
        //     y >= rectStack[rectStack.length - 1].y - rectSize) ||
        //   y > canvas.height - rectSize
        // ) {
        //   rectStack.push({ x: x, y: y });
        //   y = 0;
        //   // fallingRect = null;
        //   x = canvas.width / 2 - rectSize / 2;
        //   requestAnimationFrame(rectFallAnimate);
        //   return;
        // }
        if (y > canvas.height - rectSize) {
            rectStack.push({ x: x, y: y });
            y = 0;
            x = canvas.width / 2;
            requestAnimationFrame(rectFallAnimate);
            return;
        }
        requestAnimationFrame(rectFallAnimate);
    };
    var moveBlock = function () {
        if (direction.left && x > 0) {
            x -= rectSize;
            return;
        }
        if (direction.right && x < canvas.width - rectSize) {
            x += rectSize;
            return;
        }
    };
    document.onkeydown = function (e) {
        if (e.key == "ArrowLeft" && x > 0) {
            x -= rectSize;
        }
        if (e.key == "ArrowRight" && x < canvas.width - rectSize) {
            x += rectSize;
        }
    };
    // document.onkeyup = (e) => {
    //   if (e.key == "ArrowLeft") {
    //     direction.left = false;
    //   }
    //   if (e.key == "ArrowRight") {
    //     direction.right = false;
    //   }
    // };
    requestAnimationFrame(rectFallAnimate);
};
index();
