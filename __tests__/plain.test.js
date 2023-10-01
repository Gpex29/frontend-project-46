import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { readFileSync } from 'node:fs';
import path from 'path';

const getFixturePath = (filename) => path.resolve(`./__fixtures__/${filename}`);

const jsonBefore = getFixturePath('before.json');
const jsonAfter = getFixturePath('after.json');
const yamlBefore = getFixturePath('before.yaml');
const yamlAfter = getFixturePath('after.yaml');
const result = readFileSync(getFixturePath('plainResult.txt'), 'utf-8');
test('genDiff', () => {
  expect(genDiff(jsonBefore, jsonAfter, 'plain')).toEqual(result);
  expect(genDiff(yamlBefore, yamlAfter, 'plain')).toEqual(result);
});