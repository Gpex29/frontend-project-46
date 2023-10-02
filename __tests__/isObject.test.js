import { test, expect } from '@jest/globals';
import isObject from '../src/helpers/isObject.js';

test('isObject', () => {
  expect(isObject({})).toEqual(true);
  expect(isObject([])).toEqual(false);
  expect(isObject(null)).toEqual(false);
  expect(isObject(true)).toEqual(false);
});
