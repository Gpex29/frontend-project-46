import { test, expect } from '@jest/globals';
import parse from '../src/helpers/parse.js';
import path from 'path';

const getFixturePath = (filename) => path.resolve(`./__fixtures__/${filename}`);
const filepathJSON = getFixturePath('before.json');
const filepathYaml = getFixturePath('before.yaml');
const filepathYml = getFixturePath('test.yml');

const result = {
  common: {
    setting1: "Value 1",
    setting2: 200,
    setting3: true,
    setting6: {
      key: "value",
      doge: {
        wow: ""
      }
    }
  },
  group1: {
    baz: "bas",
    foo: "bar",
    nest: {
      key: "value"
    }
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45
    }
  }
};

test('parse', () => {
  expect(parse(filepathJSON)).toEqual(result);
  expect(parse(filepathYaml)).toEqual(result);
  expect(parse(filepathYml)).toEqual(result);
});