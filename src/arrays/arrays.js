export function mapTo(array, property) {
  if (!property) {
    return array.map(num => array.indexOf(num));
  }
  return array.filter(obj => obj[property]).map(obj => obj[property]);
}

export function mapToProfile(inputList) {
  const proto = {
    get isOld() {
      return this.age >= 60;
    },
    get isAnonymous() {
      return !this.name && !this.surname;
    }
  };
  return inputList.map(obj => {
    const newObj = Object.create(proto);
    newObj.name = obj.name ?? null;
    newObj.surname = obj.surname ?? null;
    newObj.fullname = newObj.isAnonymous ? null : `${newObj.name ?? '_'} ${newObj.surname ?? '_'}`;
    newObj.age = obj.age ?? null;
    return newObj;
  });
}

export function filterBy(array, filter) {
  switch (typeof filter) {
    case 'number':
      return array.filter(num => num >= filter);
    case 'string':
      return array.filter(obj => obj.hasOwnProperty(filter));
    case 'object':
      return array.filter(obj => filter.filterCb(obj[filter.property]));
    default:
      return array;
  }
}

export function reduceTo(inputValues, props) {
  switch (typeof props) {
    case 'undefined':
      return inputValues.reduce((prev, curr) => prev + curr);
    case 'string':
      return inputValues.reduce((prev, curr) => prev + curr[props], 0);
    case 'object':
      return props.map(prop => inputValues.reduce((prev, curr) => prev + curr[prop], 0));
    default:
      return inputValues;
  }
}

export function sort(inputValues, props) {
  switch (typeof props) {
    case 'undefined':
      return inputValues.sort((first, second) => first - second);
    case 'string':
      return inputValues.sort((first, second) => first[props] - second[props]);
    case 'object':
      sortByObj(inputValues, props);
    default:
      return inputValues;
  }
}

function sortByObj(inputValues, props) {
  return inputValues.sort((firstObj, secondObj) => {
    let currentProp;
    let ascResult;
    for (let i = 0; i < props.length; i++) {
      switch (typeof props[i]) {
        case 'string':
          currentProp = props[i];
          ascResult = firstObj[currentProp] - secondObj[currentProp];
          if (!ascResult) {
            continue;
          } else return ascResult;
        case 'object':
          currentProp = props[i].field;
          ascResult = firstObj[currentProp] - secondObj[currentProp];
          const isDescOrder = props[i].order === 'desc';
          if (!ascResult) {
            continue;
          } else return isDescOrder ? -ascResult : ascResult;
        default:
          return 0;
      }
    }
  });
}

export function complex(inputList, parameters) {
  for (const parameter of parameters) {
    const operationName = parameter.operation;
    const property = parameter.property;

    switch (operationName) {
      case 'filter':
        inputList = inputList.filter(obj => parameter.callback(obj[property]));
        break;
      case 'map':
        inputList = inputList.map(obj => obj[property]);
        break;
      case 'reduce':
        inputList = inputList.reduce((prev, curr) => prev + curr[property], 0);
        break;
      case 'sort':
        const desc = parameter.order === 'desc';
        inputList.sort((first, second) => (desc ? second - first : first - second));
        break;
    }
  }
  return inputList;
}
