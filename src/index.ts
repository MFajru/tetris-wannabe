import "./input.css";
import { XMovement } from "./movement";
import { generateOneTetromino } from "./tetromino";
import $ from "jquery";
import { TTetromino } from "./type";
import { addScore } from "./addScore";

const index = () => {
  const canvas = $("#myCanvas")[0] as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  let startPoint = -16;
  let isColliding = false;
  let isEnd = false;
  const fallSpeed = 2;
  const rectSize = 32;
  let x = canvas.width / 2;
  let y = startPoint;
  let isPushed = false;

  let score = 0;
  let rectStack: TTetromino[] = [];
  let tetromino = generateOneTetromino();

  document.onkeydown = (e) => {
    x = XMovement(e, tetromino, x, y, rectStack, rectSize, canvas);
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
      // if (rectStack.length >= 8) {
      const scoreAddition = addScore(rectStack, rectSize);
      score += scoreAddition;
      $("#score").text(score);
      // }
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
