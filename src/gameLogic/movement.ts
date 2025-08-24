import { TTetromino } from "../utils/type";

export const XMovement = (
  key: "ArrowLeft" | "ArrowRight",
  tetromino: TTetromino[] | null,
  x: number,
  y: number,
  rectStack: { x: number; y: number }[],
  rectSize: number,
  canvas: HTMLCanvasElement
): number => {
  if (!tetromino) {
    return 0;
  }
  let isBlocked = false;
  let moveDirection = 0;

  if (key === "ArrowLeft") {
    moveDirection = -1;
  } else if (key === "ArrowRight") {
    moveDirection = 1;
  }

  for (const shapeCord of tetromino) {
    const absX = x + shapeCord.x;
    const absY = y + shapeCord.y;

    // calculate x target (where block want to be moved)
    const targetX = absX + moveDirection * rectSize;
    const targetY = absY + moveDirection * rectSize;

    // check if the tetromino is on the edge of canvas
    if (
      (absX <= 0 && moveDirection === -1) ||
      (absX >= canvas.width - rectSize && moveDirection === 1)
    ) {
      isBlocked = true;
      break;
    }

    // check if destination (targetX and y) is blocked by placed rectangle
    for (const placedRect of rectStack) {
      if (targetX === placedRect.x && targetY === placedRect.y) {
        isBlocked = true;
        break;
      }
    }

    if (isBlocked) {
      break;
    }
  }

  if (isBlocked) {
    return x;
  } else {
    return x + moveDirection * rectSize;
  }
};
