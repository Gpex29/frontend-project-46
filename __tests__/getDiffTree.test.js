import { test, expect } from '@jest/globals';
import getDiffTree from '../src/getDiffTree.js';

const before = {
  string: 'value',
  object: {
    null: 'null',
    value: 'string',
  },
};
const after = {
  string: 'asr',
  object: {
    null: 'null',
  },
  string2: 'da',
};
const result = {
  string: {
    oldValue: 'value',
    newValue: 'asr',
    status: 'changed',
  },
  object: {
    status: 'merged',
    children: {
      null: { value: 'null', status: 'unchanged' },
      value: { value: 'string', status: 'deleted' },
    },
  },
  string2: { value: 'da', status: 'added' },
};
test('getDiffTree', () => {
  expect(getDiffTree(before, after)).toEqual(result);
});
