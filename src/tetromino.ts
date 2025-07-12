export const generateTShape = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rectSize: number
) => {
  ctx.fillRect(x, y, rectSize, rectSize);
  ctx.fillRect(x + rectSize, y, rectSize, rectSize);
  ctx.fillRect(x + rectSize * 2, y, rectSize, rectSize);
  ctx.fillRect(x + rectSize, y + rectSize, rectSize, rectSize);
  //   ctx.fillRect(0, 0, 32, 32);
  //   ctx.fillRect(32, 0, 32, 32);
  //   ctx.fillRect(64, 0, 32, 32);
  //   ctx.fillRect(32, 32, 32, 32);
};
