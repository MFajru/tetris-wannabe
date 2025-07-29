import { TCount, TTetromino } from "./type";

export const addScore = (rectStack: TTetromino[]): number => {
  let multiplier = 0;
  let countObj: TCount = {};
  let i = 0;
  let j = i + 1;
  const arrIdxToRemoved: number[] = [];
  const tempArr: TTetromino[] = [...rectStack];
  while (i < rectStack.length - 1) {
    if (rectStack[i].y === rectStack[j].y && !countObj[rectStack[i].y]) {
      countObj[rectStack[i].y] = 2;
      j += 1;
    } else if (rectStack[i].y === rectStack[j].y) {
      countObj[rectStack[i].y] += 1;
      j += 1;
    } else {
      i = j;
    }
  }
  for (const key of Object.keys(countObj)) {
    if (countObj[parseInt(key)] === 8) {
      multiplier += 1;
      for (let k = rectStack.length - 1; k >= 0; k--) {
        if (rectStack[k].y === parseInt(key)) {
          rectStack.splice(k, 1);
        }
      }
    }
  }

  return 10 * multiplier;
};
