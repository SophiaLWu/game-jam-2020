function distanceBetweenPoints(x1, y1, x2, y2) {
  return Math.floor(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
}

const Curves = {
  LINEAR: 0,
  EASE_IN: 1,
  EASE_OUT: 2,
  EASE_IN_OUT: 3,
};

function easeIn(x) {
  return 1 - Math.cos((x * Math.PI) / 2);
}

function easeOut(x) {
  return Math.sin((x * Math.PI) / 2);
}

function easeInOut(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

/**
 * A more efficient, less accurate distance.
 */
function manhattanDistance(x1, y1, x2, y2) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

function getTween(startValue, endValue, duration, curve, onComplete) {
  const startTime = new Date().getTime();
  const endTime = startTime + duration;
  return function() {
    const now = new Date().getTime();
    let progress = Math.min(1, Math.max(0, (now - startTime) / duration));
    if (progress >= 1) {
      onComplete && onComplete();
    }
    switch (curve) {
      case Curves.EASE_IN:
        progress = easeIn(progress);
        break;
      case Curves.EASE_OUT:
        progress = easeOut(progress);
        break;
      case Curves.EASE_IN_OUT:
        progress = easeInOut(progress);
        break;
    }
    // Linear is the default/implied
    return startValue + (progress * (endValue - startValue));
  }
}

export {
  distanceBetweenPoints,
  manhattanDistance,
  Curves,
  getTween,
};