import { TCount, TTetromino } from "../utils/type";

export const addScore = (
  rectStack: TTetromino[],
  rectSize: number,
  canvasWidth: number
): number => {
  let multiplier = 0;
  let countObj: TCount = {};

  for (const rect of rectStack) {
    if (countObj[rect.y]) {
      countObj[rect.y] += 1;
    } else {
      countObj[rect.y] = 1;
    }
  }

  for (const key of Object.keys(countObj)) {
    if (countObj[parseInt(key)] === rectSize / canvasWidth) {
      multiplier += 1;
      for (let k = rectStack.length - 1; k >= 0; k--) {
        if (rectStack[k].y === parseInt(key)) {
          rectStack.splice(k, 1);
        } else if (rectStack[k].y < parseInt(key)) {
          rectStack[k].y += rectSize;
        }
      }
    }
  }
  console.log(countObj);

  return 10 * multiplier;
};
