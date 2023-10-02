import isObject from './isObject.js';

const getPlainValue = (value) => {
  if (value === null || value === true || value === false || value === Number(value)) {
    return `${value}`;
  }
  if (isObject(value)) {
    return '[complex value]';
  }
  return `'${value}'`;
};

export default getPlainValue;
