import { generateTShape } from "./tetromino";
import "./input.css";

const index = () => {
  const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const tShapeCoordinate = [
    { x: 0, y: 0 },
    { x: 32, y: 0 },
    { x: 64, y: 0 },
    { x: 32, y: 32 },
  ];

  let startPoint = -16;
  let isBlocked = false;
  let isColliding = false;
  let isEnd = false;
  const fallSpeed = 4;
  const rectSize = 32;
  let x = canvas.width / 2;
  let y = startPoint;

  let rectStack: { x: number; y: number }[] = [
    { x: 0, y: 0 },
    { x: 32, y: 0 },
    { x: 64, y: 0 },
    { x: 32, y: 32 },
  ];

  document.onkeydown = (e) => {
    XMovement(e);
  };

  const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "gray";
    // draw stackedrect
    rectStack.forEach((placedBlock) => {
      console.log("object");
      ctx.fillRect(placedBlock.x, placedBlock.y, rectSize, rectSize);
    });
    // new collision code
    tShapeCoordinate.forEach((tShapeCd) => {
      const absX = x + tShapeCd.x;
      const absY = y + tShapeCd.y;

      rectStack.forEach((placedBlock) => {
        if (absX == placedBlock.x && absY + rectSize >= placedBlock.y) {
          isColliding = true;
          return;
        }
        if (absY > canvas.height) {
          isColliding = true;
          return;
        }
      });
      if (isColliding) {
        return;
      }
      // ctx.fillRect(x + tShapeCd.x, y + tShapeCd.y, rectSize, rectSize);
    });
    // old collision code
    // rectStack.forEach((placedBlock) => {
    //   ctx.fillRect(placedBlock.x, placedBlock.y, rectSize, rectSize);

    //   if (x == placedBlock.x && placedBlock.y < rectSize) {
    //     isEnd = true;
    //     return;
    //   }
    //   if (x == placedBlock.x && y + rectSize >= placedBlock.y) {
    //     isColliding = true;
    //     return;
    //   }
    // });

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
    } else {
      y += fallSpeed;
    }

    ctx.fillStyle = "green";
    // ctx.fillRect(x, y, rectSize, rectSize);
    isBlocked = false;

    requestAnimationFrame(gameLoop);
  };

  const XMovement = (e: KeyboardEvent) => {
    if (e.key == "ArrowLeft") {
      if (x <= 0) {
        isBlocked = true;
        return;
      }
      rectStack.forEach((placedBlock) => {
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
      rectStack.forEach((placedBlock) => {
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
