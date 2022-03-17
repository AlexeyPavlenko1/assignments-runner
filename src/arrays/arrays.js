export function mapTo(array, property = null) {
  if (property === null) {
    return array.map(x => array.indexOf(x));
  }
  return array.filter(x => x.hasOwnProperty(property)).map(x => x[property]);
}

export function mapToProfile(inputList) {
  const proto = {
    get isOld() {
      return this.age >= 60;
    },
    get isAnonymous() {
      return this.name === null && this.surname === null;
    }
  };
  return [...inputList].map(obj => {
    let newObj = Object.create(proto);
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

export function reduceTo(inputValues, props = undefined) {
  switch (typeof props) {
    case 'undefined':
      return inputValues.reduce((x, y) => x + y);
    case 'string':
      return inputValues.reduce((x, o2) => x + o2[props], 0);
    case 'object':
      let initial = [];
      props.forEach(() => initial.push(0));
      return inputValues.reduce((previous, o) => {
        props.forEach(prop => (previous[props.indexOf(prop)] += o[prop]));
        return previous;
      }, initial);
    default:
      return inputValues;
  }
}

export function sort(inputValues, props = undefined) {
  switch (typeof props) {
    case 'undefined':
      return inputValues.sort((a, b) => a - b);
    case 'string':
      return inputValues.sort((o1, o2) => o1[props] - o2[props]);
    case 'object':
      return inputValues.sort((o1, o2) => {
        for (let i = 0; i < props.length; i++) {
          switch (typeof props[i]) {
            case 'string':
              if (o1[props[i]] === o2[props[i]]) {
                continue;
              }
              return o1[props[i]] - o2[props[i]];
            case 'object':
              let descOrder = props[i].order === 'desc';
              if (o1[props[i].field] === o2[props[i].field]) {
                continue;
              }
              return descOrder ? o2[props[i].field] - o1[props[i].field] : o1[props[i].field] - o2[props[i].field];
            default:
              return 0;
          }
        }
      });
    default:
      return inputValues;
  }
}

export function complex(inputList, parameters) {
  for (const parameter of parameters) {
    let operationName = parameter.operation;
    let property = parameter.property;

    switch (operationName) {
      case 'filter':
        inputList = inputList.filter(o => parameter.callback(o[property]));
        break;
      case 'map':
        inputList = inputList.map(o => o[property]);
        break;
      case 'reduce':
        inputList = inputList.reduce((x, o2) => x + o2[property], 0);
        break;
      case 'sort':
        let desc = parameter.order === 'desc';
        inputList.sort((a, b) => (desc ? b - a : a - b));
        break;
      default:
        break;
    }
  }
  return inputList;
}
