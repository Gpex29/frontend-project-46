import _ from 'lodash';
import isObject from './helpers/isObject.js';

const getDiffTree = (before, after) => {
  const obj = { ...before, ...after };
  const keys = Object.keys(obj);
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.reduce((acc, key) => {
    const newAcc = { ...acc };
    const oldFile = { ...before };
    const newFile = { ...after };
    const oldValue = oldFile[key];
    const newValue = newFile[key];
    if (isObject(oldValue) && isObject(newValue)) {
      newAcc[key] = { status: 'merged', children: getDiffTree(oldValue, newValue) };
    } else if (!Object.hasOwn(oldFile, key)) {
      newAcc[key] = { value: newValue, status: 'added' };
    } else if (!Object.hasOwn(newFile, key)) {
      newAcc[key] = { value: oldFile[key], status: 'deleted' };
    } else if (oldFile[key] !== newValue) {
      newAcc[key] = {
        oldValue, newValue, status: 'changed',
      };
    } else {
      newAcc[key] = { value: oldFile[key], status: 'unchanged' };
    }
    return newAcc;
  }, {});
  return result;
};

export default getDiffTree;
