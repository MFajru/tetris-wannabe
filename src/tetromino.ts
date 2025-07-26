import { getRandomElement } from "./utils";

export type TTetromino = {
  x: number;
  y: number;
};

const tShapeCoordinate: TTetromino[] = [
  { x: 0, y: 0 },
  { x: 32, y: 0 },
  { x: 32, y: 32 },
  { x: 64, y: 0 },
];

const sShapeCoordinate: TTetromino[] = [
  { x: 0, y: 32 },
  { x: 32, y: 32 },
  { x: 32, y: 0 },
  { x: 64, y: 0 },
];

const zShapeCoordinate: TTetromino[] = [
  { x: 0, y: 0 },
  { x: 32, y: 0 },
  { x: 32, y: 32 },
  { x: 64, y: 32 },
];

const jShapeCoordinate: TTetromino[] = [
  { x: 0, y: 64 },
  { x: 32, y: 0 },
  { x: 32, y: 32 },
  { x: 32, y: 64 },
];

const lShapeCoordinate: TTetromino[] = [
  { x: 0, y: 0 },
  { x: 0, y: 32 },
  { x: 0, y: 64 },
  { x: 32, y: 64 },
];

const iShapeCoordinate: TTetromino[] = [
  { x: 0, y: 0 },
  { x: 0, y: 32 },
  { x: 0, y: 64 },
  { x: 0, y: 96 },
];

const oShapeCoordinate: TTetromino[] = [
  { x: 0, y: 0 },
  { x: 0, y: 32 },
  { x: 32, y: 0 },
  { x: 32, y: 32 },
];

export const generateOneTetromino = (): TTetromino[] | null => {
  const tetrominoShapeCd: TTetromino[][] = [
    tShapeCoordinate,
    sShapeCoordinate,
    lShapeCoordinate,
    iShapeCoordinate,
    zShapeCoordinate,
    jShapeCoordinate,
    oShapeCoordinate,
  ];

  return getRandomElement(tetrominoShapeCd);
};
