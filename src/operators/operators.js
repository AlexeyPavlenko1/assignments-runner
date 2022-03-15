export function add(a, b) {
  if (
    (a === Number.NEGATIVE_INFINITY && b === Number.POSITIVE_INFINITY) ||
    (b === Number.NEGATIVE_INFINITY && a === Number.POSITIVE_INFINITY)
  ) {
    return null;
  }
  if ((a === '' && b === 0) || (a === 0, b === '')) {
    return null;
  }
  if ((typeof a === 'string' && Array.isArray(b)) || (typeof b === 'string' && Array.isArray(a))) {
    return null;
  }
  if ((isNaN(a) && !isNaN(b)) || (isNaN(b) && !isNaN(a))) {
    return null;
  }
  if (a === null && b === null) {
    return null;
  }
  return a + b;
}

export function subtract(a, b) {
  if (Array.isArray(a) && typeof b === 'number') {
    return null;
  }
  if (typeof a === 'number' && b === '') {
    return null;
  }
  if (typeof a === 'number' && b === null) {
    return null;
  }
  if (typeof a === 'number' && b === undefined) {
    return null;
  }
  return a - b;
}

export function complex([a, b], [c, d]) {
  if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || a === null || b === null || c === null || d === null || d === 0) {
    return null;
  }
  const base = a * b;
  const exp = c / d;

  return Math.pow(base, exp);
}
