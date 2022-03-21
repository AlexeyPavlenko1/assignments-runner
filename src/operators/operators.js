export function add(a, b) {
  return validateAB(a, b) ? a + b : null;
}

export function subtract(a, b) {
  return validateAB(a, b) ? a - b : null;
}

export function complex([a, b], [c, d]) {
  if (d === 0 || hasSomeNullish(a, b, c, d)) {
    return null;
  }
  const base = a * b;
  const exp = c / d;
  return Math.pow(base, exp);
}

function hasSomeNullish(...args) {
  return args.some(arg => !arg);
}

function validateAB(a, b) {
  const nulls = a === null && b === null;
  const numAndNan = (isNaN(a) && !isNaN(b)) || (isNaN(b) && !isNaN(a));
  const ArrAndNum = Array.isArray(a) && typeof b === 'number';
  const numAndNull = typeof a === 'number' && b === null;
  const numAndUndefined = typeof a === 'number' && b === undefined;
  const arrayAndString = (typeof a === 'string' && Array.isArray(b)) || (typeof b === 'string' && Array.isArray(a));
  const numAndString =
    (typeof a === 'number' && typeof b === 'string') || (typeof b === 'number' && typeof a === 'string');
  const differentInfinities =
    (a === Number.NEGATIVE_INFINITY && b === Number.POSITIVE_INFINITY) ||
    (b === Number.NEGATIVE_INFINITY && a === Number.POSITIVE_INFINITY);

  const invalidArgs = [
    nulls,
    numAndNan,
    ArrAndNum,
    numAndString,
    numAndNull,
    numAndUndefined,
    arrayAndString,
    differentInfinities
  ];

  return invalidArgs.every(invalidArg => !invalidArg);
}
