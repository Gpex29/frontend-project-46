import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { readFileSync } from 'node:fs';
import path from 'path';

const getFixturePath = (filename) => path.resolve(`./__fixtures__/${filename}`);

const jsonBefore = getFixturePath('before.json');
const jsonAfter = getFixturePath('after.json');
const yamlBefore = getFixturePath('before.yaml');
const yamlAfter = getFixturePath('after.yaml');
const jsonHexlet1 = getFixturePath('file1.json');
const jsonHexlet2 = getFixturePath('file2.json');
const yamlHexlet1 = getFixturePath('file1.yml');
const yamlHexlet2 = getFixturePath('file2.yml');
const stylishResult = readFileSync(getFixturePath('stylishResult.txt'), 'utf-8');
const plainResult = readFileSync(getFixturePath('plainResult.txt'), 'utf-8');
const jsonResult = readFileSync(getFixturePath('jsonResult.txt'), 'utf-8');
const hexletResultStylish = readFileSync(getFixturePath('hexletResultStylish.txt'), 'utf-8');
const hexletResultPlain = readFileSync(getFixturePath('hexletResultPlain.txt'), 'utf-8');
test('genDiff', () => {
  expect(genDiff(jsonBefore, jsonAfter)).toEqual(stylishResult);
  expect(genDiff(yamlBefore, yamlAfter)).toEqual(stylishResult);
  expect(genDiff(jsonBefore, jsonAfter, 'plain')).toEqual(plainResult);
  expect(genDiff(yamlBefore, yamlAfter, 'plain')).toEqual(plainResult);
  expect(genDiff(jsonBefore, jsonAfter, 'json')).toEqual(jsonResult);
  expect(genDiff(yamlBefore, yamlAfter, 'json')).toEqual(jsonResult);
  expect(genDiff(jsonHexlet1, jsonHexlet2)).toEqual(hexletResultStylish);
  expect(genDiff(yamlHexlet1, yamlHexlet2, 'plain')).toEqual(hexletResultPlain);
});