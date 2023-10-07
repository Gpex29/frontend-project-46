import _ from 'lodash';

const getDiffTree = (file1, file2) => {
  const keys = _.union(_.keys(file1), _.keys(file2));
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.map((key) => {
    const value1 = { ...file1 }[key];
    const value2 = { ...file2 }[key];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', children: getDiffTree(value1, value2) };
    } if (!Object.hasOwn(file1, key)) {
      return { key, value: value2, type: 'added' };
    } if (!Object.hasOwn(file2, key)) {
      return { key, value: value1, type: 'removed' };
    } if (!_.isEqual(value1, value2)) {
      return {
        key, value1, value2, type: 'updated',
      };
    }
    return { key, value: value1, type: 'equal' };
  });
  return result;
};

export default getDiffTree;
