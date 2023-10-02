import getPlainValue from '../helpers/getPlainValue.js';

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
        case ('added'):
          return `Property '${currentKey}' was added with value: ${getPlainValue(value)}`;
        case ('deleted'):
          return `Property '${currentKey}' was removed`;
        case ('changed'):
          return `Property '${currentKey}' was updated. From ${getPlainValue(oldValue)} to ${getPlainValue(newValue)}`;
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
