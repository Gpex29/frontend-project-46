import isObject from '../helpers/isObject.js';

const isFalsyTruthyNull = (value) => value === null || value === true || value === false;

const plain = (map) => {
  const iter = (data, nestedKey) => {
    const keys = Object.keys(data);
    const result = keys.map((key) => {
      const {
        status, value, oldValue, newValue,
      } = data[key];
      const currentKey = nestedKey ? `${nestedKey}.${key}` : key;
      switch (status) {
        case ('merged'):
          return iter(data[key].children, currentKey);
        case ('added'): {
          if (isObject(value)) {
            return `Property '${currentKey}' was added with value: [complex value]`;
          }
          if (isFalsyTruthyNull(value)) {
            return `Property '${currentKey}' was added with value: ${value}`;
          }
          return `Property '${currentKey}' was added with value: '${value}'`;
        }
        case ('deleted'): {
          if (isObject(value)) {
            return `Property '${currentKey}' was removed`;
          }
          return `Property '${currentKey}' was removed`;
        }
        case ('changed'): {
          if (isObject(oldValue)) {
            return `Property '${currentKey}' was updated. From [complex value] to '${newValue}'`;
          }
          if (isObject(newValue)) {
            return `Property '${currentKey}' was updated. From '${oldValue}' to [complex value]`;
          }
          if (isFalsyTruthyNull(oldValue) && isFalsyTruthyNull(newValue)) {
            return `Property '${currentKey}' was updated. From ${oldValue} to ${newValue}`;
          }
          return `Property '${currentKey}' was updated. From '${oldValue}' to '${newValue}'`;
        }
        case ('unchanged'):
          return '';
        default:
          throw new Error(`Unknown status: '${status}'!`);
      }
    });
    return result.filter(Boolean).join('\n');
  };
  return iter(map, '');
};

export default plain;
