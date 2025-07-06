const index = () => {
  const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const fallSpeed = 2;
  const moveSpeed = 2;
  const rectSize = 32;
  let x = canvas.width / 2 - rectSize / 2;
  let y = 0;
  let direction = { left: false, right: false };

  ctx.fillStyle = "green";

  let rectStack: { x: number; y: number }[] = [];
  // let fallingRect: { x: number; y: number } | null = null;

  const rectFallAnimate = () => {
    if (
      rectStack[rectStack.length - 1] &&
      rectStack[rectStack.length - 1].y == fallSpeed
    ) {
      // fallingRect = null;
      return;
    }
    moveBlock();
    ctx.clearRect(0, 0, canvas.width, rectSize + y);
    ctx.fillRect(x, y, rectSize, rectSize);
    // fallingRect = { x: x, y: y };
    y += fallSpeed;

    if (
      (rectStack[rectStack.length - 1] &&
        y >= rectStack[rectStack.length - 1].y - rectSize) ||
      y > canvas.height - rectSize
    ) {
      rectStack.push({ x: x, y: y });

      y = 0;
      // fallingRect = null;
      x = canvas.width / 2 - rectSize / 2;
      requestAnimationFrame(rectFallAnimate);
      return;
    }
    requestAnimationFrame(rectFallAnimate);
  };

  const moveBlock = () => {
    if (direction.left && x > 0) {
      x -= moveSpeed;
      return;
    }
    if (direction.right && x < canvas.width - rectSize) {
      x += moveSpeed;
      return;
    }
  };

  document.onkeydown = (e) => {
    if (e.key == "ArrowLeft") {
      console.log("left", x);
      direction.left = true;
    }
    if (e.key == "ArrowRight") {
      console.log("right");
      direction.right = true;
    }
  };
  document.onkeyup = (e) => {
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
