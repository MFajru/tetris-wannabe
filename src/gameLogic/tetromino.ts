import { TTetromino } from "../utils/type";
import { getRandomElement } from "../utils/utils";
import { rectSize } from "../utils/const";

const tShapeCoordinate: TTetromino[] = [
  { x: 0, y: 0 },
  { x: rectSize, y: 0 },
  { x: rectSize, y: rectSize },
  { x: rectSize * 2, y: 0 },
];

const sShapeCoordinate: TTetromino[] = [
  { x: 0, y: rectSize },
  { x: rectSize, y: rectSize },
  { x: rectSize, y: 0 },
  { x: rectSize * 2, y: 0 },
];

const zShapeCoordinate: TTetromino[] = [
  { x: 0, y: 0 },
  { x: rectSize, y: 0 },
  { x: rectSize, y: rectSize },
  { x: rectSize * 2, y: rectSize },
];

const jShapeCoordinate: TTetromino[] = [
  { x: 0, y: rectSize * 2 },
  { x: rectSize, y: 0 },
  { x: rectSize, y: rectSize },
  { x: rectSize, y: rectSize * 2 },
];

const lShapeCoordinate: TTetromino[] = [
  { x: 0, y: 0 },
  { x: 0, y: rectSize },
  { x: 0, y: rectSize * 2 },
  { x: rectSize, y: rectSize * 2 },
];

const iShapeCoordinate: TTetromino[] = [
  { x: 0, y: 0 },
  { x: 0, y: rectSize },
  { x: 0, y: rectSize * 2 },
  { x: 0, y: rectSize * 3 },
];

const oShapeCoordinate: TTetromino[] = [
  { x: 0, y: 0 },
  { x: 0, y: rectSize },
  { x: rectSize, y: 0 },
  { x: rectSize, y: rectSize },
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
