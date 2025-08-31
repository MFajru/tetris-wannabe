import "./css/input.css";

import $ from "jquery";
import { IBtnPressed, TTetromino } from "./utils/type";
import { addScore } from "./gameLogic/addScore";
import { fallSpeed, rectSize } from "./utils/const";
import { generateOneTetromino } from "./gameLogic/tetromino";
import { XMovement } from "./gameLogic/movement";
import { createIcons, ArrowBigLeft, ArrowBigRight } from "lucide";

createIcons({
  icons: {
    ArrowBigLeft,
    ArrowBigRight,
  },
});

const index = () => {
  const canvas = $("#myCanvas")[0] as HTMLCanvasElement;

  if (!canvas) {
    console.log("No canvas found on this page. Game logic will not run.");
    return;
  }
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const btnLeft = $("#btnLeft")[0] as HTMLButtonElement;
  const btnRight = $("#btnRight")[0] as HTMLButtonElement;

  let startPoint = -16;
  let isColliding = false;
  let isEnd = false;
  let x = canvas.width / 2;
  let y = startPoint;
  let isPushed = false;

  let score = 0;
  let rectStack: TTetromino[] = [];
  let tetromino = generateOneTetromino();

  btnLeft.addEventListener("click", () => {
    x = XMovement("ArrowLeft", tetromino, x, y, rectStack, rectSize, canvas);
  });
  btnRight.addEventListener("click", () => {
    x = XMovement("ArrowRight", tetromino, x, y, rectStack, rectSize, canvas);
  });

  document.onkeydown = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      x = XMovement(e.key, tetromino, x, y, rectStack, rectSize, canvas);
    }
  };

  const gameLoop = () => {
    if (isPushed) {
      tetromino = generateOneTetromino();
      isPushed = false;
    }
    if (!tetromino) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "gray";
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
    ctx.fillStyle = "green";
    tetromino.forEach((shapeCord) => {
      const absX = x + shapeCord.x;
      const absY = y + shapeCord.y;

      if (absY + rectSize >= canvas.height) {
        isColliding = true;
        return;
      }

      rectStack.forEach((placedRect) => {
        if (absX === placedRect.x && absY + rectSize === placedRect.y) {
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
      isPushed = true;

      const scoreAddition = addScore(rectStack, rectSize);
      score += scoreAddition;
      $("#score").text(score);
    } else {
      y += fallSpeed;
    }

    requestAnimationFrame(gameLoop);
  };

  gameLoop();
};

$(function () {
  index();
});
