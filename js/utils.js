function distanceBetweenPoints(x1, x2, y1, y2) {
  return Math.floor(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
}

export { distanceBetweenPoints };