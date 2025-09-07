import "./css/input.css";

import $ from "jquery";
import { TTetromino } from "./utils/type";
import { addScore } from "./gameLogic/addScore";
import { fallSpeed, rectSize, startPoint } from "./utils/const";
import { generateOneTetromino } from "./gameLogic/tetromino";
import { XMovement } from "./gameLogic/movement";
import { createIcons, ArrowBigLeft, ArrowBigRight } from "lucide";

createIcons({
  icons: {
    ArrowBigLeft,
    ArrowBigRight,
  },
});

const cover = $("#cover");
const btnDiv = $("#btnDiv");
const gameOverTxt = $("#gameOverTxt");
const scoreCoverDiv = $("#scoreCover");

const canvas = $("#myCanvas")[0] as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

let isColliding = false;
let isEnd = false;
let y = startPoint;
let x = canvas.width / 2;
let isPushed = false;
let isPlaying = false;
let score = 0;
let rectStack: TTetromino[] = [];
let tetromino = generateOneTetromino();

const startGame = () => {
  isEnd = false;
  isPlaying = true;
  score = 0;
  rectStack = [];
  x = canvas.width / 2;
  y = startPoint;
  $("#score").text(score);

  cover.addClass("hidden");
  btnDiv.addClass("hidden");
  gameOverTxt.addClass("hidden");
  scoreCoverDiv.addClass("hidden");

  setupControls();
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

  if (isEnd && isPlaying) {
    cover.toggleClass("hidden");
    btnDiv.toggleClass("hidden");
    gameOverTxt.toggleClass("hidden");
    scoreCoverDiv.toggleClass("hidden");
    isPlaying = false;
    return;
  }

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

    const scoreAddition = addScore(rectStack, rectSize, canvas.width);
    score += scoreAddition;
    $("#score").text(score);
  } else {
    y += fallSpeed;
  }

  requestAnimationFrame(gameLoop);
};

const setupControls = () => {
  const btnLeft = $("#btnLeft")[0] as HTMLButtonElement;
  const btnRight = $("#btnRight")[0] as HTMLButtonElement;

  if (isPlaying) {
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
  }
};

const startScreen = () => {
  gameLoop();
  $("#btnPlay").on("click", startGame);
};

$(function () {
  startScreen();
});
