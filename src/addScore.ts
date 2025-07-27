import { TTetromino } from "./type";

export const addScore = (rectStack: TTetromino[]): number => {
  let count = 2;
  let i = 0;
  let j = i + 1;
  console.log("len", rectStack.length);
  while (i < rectStack.length - 1) {
    if (rectStack[i].y === rectStack[j].y) {
      count += 1;
      j += 1;
    } else {
       i = j;
    }
  }
  console.log("count", count);
  if (count % 8 === 0) {
    console.log(10 * (count / 8));
    return 10 * (count / 8);
  }
  return 0;
};
