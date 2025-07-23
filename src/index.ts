import "./input.css";
import { generateOneTetromino } from "./tetromino";

const index = () => {
  const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  let startPoint = -16;
  let isBlocked = false;
  let isColliding = false;
  let isEnd = false;
  const fallSpeed = 2;
  const rectSize = 32;
  let x = canvas.width / 2;
  let y = startPoint;

  let rectStack: { x: number; y: number }[] = [];

  document.onkeydown = (e) => {
    XMovement(e);
  };

  const gameLoop = () => {
    const tetromino = generateOneTetromino();
    if (!tetromino) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "gray";
    // draw stackedrect
    rectStack.forEach((placedBlock) => {
      ctx.fillRect(placedBlock.x, placedBlock.y, rectSize, rectSize);

      if (x == placedBlock.x && placedBlock.y < rectSize) {
        isEnd = true;
        return;
      }
    });

    if (isEnd) {
      return;
    }
    // new collision code
    ctx.fillStyle = "green";
    tetromino.forEach((ShapeCd) => {
      const absX = x + ShapeCd.x;
      const absY = y + ShapeCd.y;

      if (absY + rectSize >= canvas.height) {
        isColliding = true;
        return;
      }

      rectStack.forEach((placedBlock) => {
        if (absX == placedBlock.x && absY + rectSize >= placedBlock.y) {
          isColliding = true;
          return;
        }
      });

      if (isColliding) {
        return;
      }
      ctx.fillRect(absX, absY, rectSize, rectSize);
    });

    if (isColliding) {
      tetromino.forEach((shapeCd) => {
        rectStack.push({ x: x + shapeCd.x, y: y + shapeCd.y });
      });
      x = canvas.width / 2;
      y = startPoint;
      isColliding = false;
    } else {
      y += fallSpeed;
    }

    isBlocked = false;
    requestAnimationFrame(gameLoop);
  };

  const XMovement = (e: KeyboardEvent) => {
    const tetromino = generateOneTetromino();
    if (!tetromino) {
      return;
    }
    if (e.key == "ArrowLeft") {
      if (x + tetromino[0].x <= 0) {
        isBlocked = true;
        return;
      }
      tetromino.forEach((shapeCd) => {
        rectStack.forEach((placedBlock) => {
          if (
            placedBlock.x == x + shapeCd.x - rectSize &&
            placedBlock.y - (y + shapeCd.y) < rectSize
          ) {
            isBlocked = true;
            return;
          }
        });
      });

      if (!isBlocked) {
        x -= rectSize;
      }
    }
    if (e.key == "ArrowRight") {
      if (tetromino[tetromino.length - 1].x + x >= canvas.width - rectSize) {
        isBlocked = true;
      }
      tetromino.forEach((tShapedCd) => {
        rectStack.forEach((placedBlock) => {
          if (
            placedBlock.x == x + tShapedCd.x + rectSize &&
            placedBlock.y - (y + tShapedCd.y) < rectSize
          ) {
            isBlocked = true;
            return;
          }
        });
      });

      if (!isBlocked) {
        x += rectSize;
      }
    }
  };

  gameLoop();
};

index();
