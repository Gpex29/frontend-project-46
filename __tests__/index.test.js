import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { readFileSync } from 'node:fs';
import path from 'path';

const getFixturePath = (filename) => path.resolve(`./__fixtures__/${filename}`);

const jsonBefore = getFixturePath('before.json');
const jsonAfter = getFixturePath('after.json');
const result = readFileSync(getFixturePath('result.txt'), 'utf-8');
test('genDiff', () => {
  expect(genDiff(jsonBefore, jsonAfter)).toEqual(result);
});