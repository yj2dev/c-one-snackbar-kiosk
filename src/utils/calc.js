export const sumPrice = (arr) => {
  if (arr.length > 0) {
    return arr.reduce((prev, cur) => prev + cur.price * cur.cnt, 0);
  }

  return null;
};

export const sumCnt = (arr) => {
  if (arr.length > 0) {
    return arr.reduce((prev, cur) => prev + cur.cnt, 0);
  }

  return null;
};
