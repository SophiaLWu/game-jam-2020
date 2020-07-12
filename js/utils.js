function distanceBetweenPoints(x1, y1, x2, y2) {
  return Math.floor(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
}

const Curves = {
  LINEAR: 0,
  EASE_IN: 1,
  EASE_OUT: 2,
  EASE_IN_OUT: 3,
  EASE_OUT_BOUNCE: 4,
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

function easeOutBounce(x) {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
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
      case Curves.EASE_OUT_BOUNCE:
        progress = easeOutBounce(progress);
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