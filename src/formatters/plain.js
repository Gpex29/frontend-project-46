import _ from 'lodash';

const getPlainValue = (value) => {
  if (value === null || value === true || value === false || value === Number(value)) {
    return `${value}`;
  }
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return `'${value}'`;
};

const plain = (map) => {
  const iter = (data, nestedKey) => {
    const result = data.map((obj) => {
      const { key, type } = obj;
      const currentKey = nestedKey ? `${nestedKey}.${key}` : key;
      switch (type) {
        case ('nested'):
          return iter(obj.children, currentKey);
        case ('added'):
          return `Property '${currentKey}' was added with value: ${getPlainValue(obj.value)}`;
        case ('removed'):
          return `Property '${currentKey}' was removed`;
        case ('updated'):
          return `Property '${currentKey}' was updated. From ${getPlainValue(obj.value1)} to ${getPlainValue(obj.value2)}`;
        case ('equal'):
          return null;
        default:
          throw new Error(`Unknown status: '${type}'!`);
      }
    });
    return result.filter(Boolean).join('\n');
  };
  return iter(map, '');
};

export default plain;
