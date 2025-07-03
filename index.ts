const index = () => {
  const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;

  if (canvas == null) {
    return;
  }

  const ctx = canvas.getContext("2d");

  if (ctx == null) {
    return;
  }

  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    ctx.rect(i * 64, 448, 64, 64);
  }

  ctx.stroke();
};

index();
