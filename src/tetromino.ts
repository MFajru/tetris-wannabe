export const generateTShape = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rectSize: number,
  isColliding: boolean,
  rectStack: { x: number; y: number }[]
) => {
  // y -= rectSize;
  ctx.fillRect(x + rectSize, y + rectSize, rectSize, rectSize);
  ctx.fillRect(x, y, rectSize, rectSize);
  ctx.fillRect(x + rectSize, y, rectSize, rectSize);
  ctx.fillRect(x + rectSize * 2, y, rectSize, rectSize);
  //   ctx.fillRect(0, 0, 32, 32);
  //   ctx.fillRect(32, 0, 32, 32);
  //   ctx.fillRect(64, 0, 32, 32);
  //   ctx.fillRect(32, 32, 32, 32);
  if (isColliding) {
    console.log("object");
    rectStack.push(
      { x: x + rectSize, y: y + rectSize },
      { x: x, y: y },
      { x: x + rectSize, y: y },
      { x: x + rectSize * 2, y: y }
    );
    console.log(rectStack);
  }
};
