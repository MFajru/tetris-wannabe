export const getRandomElement = <T>(list: T[]): T | null => {
  if (list.length <= 0) {
    return null;
  }
  const randomIdx = Math.floor(Math.random() * list.length);
  return list[randomIdx];
};
