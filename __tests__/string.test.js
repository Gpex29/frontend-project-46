import { test, expect } from '@jest/globals';
import string from '../src/helpers/string.js';

test('makeString', () => {
  expect(string('key', 'value')).toEqual('\n    key: value');
  expect(string('key', 'value', '+')).toEqual('\n  + key: value');
});
