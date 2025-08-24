export type TTetromino = {
  x: number;
  y: number;
};

export type TCount = {
  [key: number]: number;
};

export interface IBtnPressed {
  left: boolean;
  right: boolean;
}
