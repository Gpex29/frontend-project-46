import { test, expect } from '@jest/globals';
import getString from '../src/helpers/getString.js';

const spacer = '    ';
test('makeString', () => {
  expect(getString('key', 'value', spacer)).toEqual('    key: value');
  expect(getString('key', 'value', spacer, '+')).toEqual('  + key: value');
});
