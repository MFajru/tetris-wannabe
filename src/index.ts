import { generateTShape } from "./tetromino";
import "./input.css";

const index = () => {
  const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const tShapeCoordinate = [
    { x: 0, y: 0 },
    { x: 32, y: 0 },
    { x: 32, y: 32 },
    { x: 64, y: 0 },
  ];

  const sShapeCoordinate = [
    { x: 0, y: 32 },
    { x: 32, y: 32 },
    { x: 32, y: 0 },
    { x: 64, y: 0 },
  ];

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
    tShapeCoordinate.forEach((tShapeCd) => {
      const absX = x + tShapeCd.x;
      const absY = y + tShapeCd.y;

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
      tShapeCoordinate.forEach((t) => {
        rectStack.push({ x: x + t.x, y: y + t.y });
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
    if (e.key == "ArrowLeft") {
      if (x + tShapeCoordinate[0].x <= 0) {
        isBlocked = true;
        return;
      }
      tShapeCoordinate.forEach((tShapeCd) => {
        rectStack.forEach((placedBlock) => {
          if (
            placedBlock.x == x + tShapeCd.x - rectSize &&
            placedBlock.y - (y + tShapeCd.y) < rectSize
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
      if (
        tShapeCoordinate[tShapeCoordinate.length - 1].x + x >=
        canvas.width - rectSize
      ) {
        isBlocked = true;
      }
      tShapeCoordinate.forEach((tShapedCd) => {
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
