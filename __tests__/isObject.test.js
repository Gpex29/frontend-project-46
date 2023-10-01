import { test, expect } from '@jest/globals';
import isObject from '../src/helpers/isObject.js';

const spacer = '    ';
test('makeString', () => {
  expect(isObject({})).toEqual(true);
  expect(isObject([])).toEqual(false);
  expect(isObject(null)).toEqual(false);
});