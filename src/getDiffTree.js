import _ from 'lodash';

const getDiffTree = (content1, content2) => {
  const keys = _.union(_.keys(content1), _.keys(content2));
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.map((key) => {
    if (_.isPlainObject(content1[key]) && _.isPlainObject(content2[key])) {
      return { key, type: 'nested', children: getDiffTree(content1[key], content2[key]) };
    } if (!Object.hasOwn(content1, key)) {
      return { key, value: content2[key], type: 'added' };
    } if (!Object.hasOwn(content2, key)) {
      return { key, value: content1[key], type: 'removed' };
    } if (!_.isEqual(content1[key], content2[key])) {
      return {
        key, value1: content1[key], value2: content2[key], type: 'updated',
      };
    }
    return { key, value: content1[key], type: 'equal' };
  });
  return result;
};

export default getDiffTree;
