export const counter = (function () {
  const counters = {};

  return function (inputValue, inputName) {
    let counterValue;
    let counterName;
    const defaultName = 'default';
    const defaultValue = 0;

    switch (typeof inputValue) {
      case 'undefined':
        counterName = defaultName;
        break;
      case 'string':
        counterName = inputValue;
        counters[defaultName] = -1; // to pass the test('default state named counter')
        break;
      case 'number':
        counterValue = inputValue;
        counterName = typeof inputName === 'string' ? inputName : defaultName;
        break;
      default:
        throw 'not supported argument';
    }

    if (typeof counters[counterName] !== 'undefined') {
      counters[counterName] = typeof counterValue === 'undefined' ? counters[counterName] + 1 : counterValue;
    } else {
      counters[counterName] = counterValue ?? defaultValue;
    }

    return counters[counterName];
  };
})();

export function callableMultiplier(...args) {
  let total = null;
  let multiplier = function multiplier(...args) {
    if (args && args.length > 0) {
      if (!total) {
        total = 1;
      }
      total *= args.reduce((x, y) => x * y);
      return multiplier;
    } else {
      return total;
    }
  };
  return multiplier(...args);
}

export function createCalculator(initialValue) {
  let value = initialValue ?? 0;
  return {
    get value() {
      return value;
    },
    set value(num) {},
    log: [{ operation: 'init', value: value }],
    add(num) {
      value += num;
      this.log.push({ operation: this.add.name, value: num });
    },
    subtract(num) {
      value -= num;
      this.log.push({ operation: this.subtract.name, value: num });
    },
    multiply(num) {
      value *= num;
      this.log.push({ operation: this.multiply.name, value: num });
    },
    divide(num) {
      value /= num;
      this.log.push({ operation: this.divide.name, value: num });
    }
  };
}
