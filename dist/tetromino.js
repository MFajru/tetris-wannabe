import { getRandomElement } from "./utils";
const tShapeCoordinate = [
    { x: 0, y: 0 },
    { x: 32, y: 0 },
    { x: 32, y: 32 },
    { x: 64, y: 0 },
];
const sShapeCoordinate = [
    { x: 0, y: 32 },
    { x: 32, y: 32 },
    { x: 32, y: 0 },
    { x: 64, y: 0 },
];
const zShapeCoordinate = [
    { x: 0, y: 0 },
    { x: 32, y: 0 },
    { x: 32, y: 32 },
    { x: 64, y: 32 },
];
const jShapeCoordinate = [
    { x: 0, y: 64 },
    { x: 32, y: 0 },
    { x: 32, y: 32 },
    { x: 32, y: 64 },
];
const lShapeCoordinate = [
    { x: 0, y: 0 },
    { x: 0, y: 32 },
    { x: 0, y: 64 },
    { x: 32, y: 64 },
];
const iShapeCoordinate = [
    { x: 0, y: 0 },
    { x: 0, y: 32 },
    { x: 0, y: 64 },
    { x: 0, y: 96 },
];
const oShapeCoordinate = [
    { x: 0, y: 0 },
    { x: 0, y: 32 },
    { x: 32, y: 0 },
    { x: 32, y: 32 },
];
export const generateOneTetromino = () => {
    const tetrominoShapeCd = [
        // tShapeCoordinate,
        // sShapeCoordinate,
        // lShapeCoordinate,
        // iShapeCoordinate,
        // zShapeCoordinate,
        // jShapeCoordinate,
        oShapeCoordinate,
    ];
    return getRandomElement(tetrominoShapeCd);
};
