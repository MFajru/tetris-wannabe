export const addScore = (rectStack) => {
    console.log("masuk");
    let multiplier = 0;
    let countObj = {};
    let i = 0;
    let j = i;
    while (i <= rectStack.length - 1) {
        console.log(rectStack[i]);
        if (rectStack[i].y === rectStack[j].y && !countObj[rectStack[i].y]) {
            console.log("while", rectStack[j]);
            countObj[rectStack[i].y] = 1;
            j += 1;
        }
        else if (rectStack[i].y === rectStack[j].y) {
            countObj[rectStack[i].y] += 1;
            j += 1;
        }
        else {
            i = j;
        }
    }
    console.log(countObj);
    for (const key of Object.keys(countObj)) {
        if (countObj[parseInt(key)] === 8) {
            multiplier += 1;
        }
    }
    return 10 * multiplier;
    // console.log("len", rectStack.length);
    // while (i < rectStack.length - 1) {
    //   if (rectStack[i].y === rectStack[j].y) {
    //     count += 1;
    //     j += 1;
    //   } else {
    //     i = j;
    //   }
    // }
    // console.log("count", count);
    // if (count % 8 === 0) {
    //   console.log(10 * (count / 8));
    //   return 10 * (count / 8);
    // }
    // return 0;
};
