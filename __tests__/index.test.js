import { readFileSync } from 'node:fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.resolve(`./__fixtures__/${filename}`);

const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');
const yaml1 = getFixturePath('file1.yaml');
const yaml2 = getFixturePath('file2.yaml');
const stylishResult = readFileSync(getFixturePath('stylishResult.txt'), 'utf-8');
const plainResult = readFileSync(getFixturePath('plainResult.txt'), 'utf-8');
const jsonResult = readFileSync(getFixturePath('jsonResult.txt'), 'utf-8');

test.each([
  [json1, json2, stylishResult],
  [yaml1, yaml2, stylishResult],
])('genDiff(stylish)', (a, b, expected) => {
  expect(genDiff(a, b)).toBe(expected);
});

test.each([
  [json1, json2, 'plain', plainResult],
  [yaml1, yaml2, 'plain', plainResult],
])('genDiff(plain)', (a, b, c, expected) => {
  expect(genDiff(a, b, c)).toBe(expected);
});

test.each([
  [json1, json2, 'json', jsonResult],
  [yaml1, yaml2, 'json', jsonResult],
])('genDiff(json)', (a, b, c, expected) => {
  expect(genDiff(a, b, c)).toBe(expected);
});
