import { test, expect } from '@jest/globals';
import parse from '../src/helpers/parse.js';
import path from 'path';

const getFixturePath = (filename) => path.resolve(`./__fixtures__/${filename}`);
const file = getFixturePath('before.json');

const result = {
  host: 'hexlet.io', 
  timeout: 50, 
  proxy: '123.234.53.22',
  follow: false
};

test('parse', () => {
  expect(parse(file)).toEqual(result);
});