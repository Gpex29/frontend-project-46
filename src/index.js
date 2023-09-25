import parse from './helpers/parse.js';
import createString from './helpers/string.js';

const genDiff = (oldFilePath, newFilePath) => {
  const oldFile = parse(oldFilePath);
  const newFile = parse(newFilePath);

  const obj = { ...oldFile, ...newFile };
  const keys = Object.keys(obj).sort();
  const result = keys.reduce((acc, key) => {
    let newAcc = acc;
    if (!Object.hasOwn(oldFile, key)) {
      newAcc += createString(key, newFile[key], '+');
    } else if (!Object.hasOwn(newFile, key)) {
      newAcc += createString(key, oldFile[key], '-');
    } else if (oldFile[key] !== newFile[key]) {
      newAcc += createString(key, oldFile[key], '-');
      newAcc += createString(key, newFile[key], '+');
    } else {
      newAcc += createString(key, obj[key]);
    }
    return newAcc;
  }, '');
  return `{${result}\n}`;
};

export default genDiff;

/* 1) Настроили с помощью commander js -запускаем bin file
2) Мы должны считать содержимое 2 файлов, которые нам указал пользователь
    а) path/resolve(), process.cwd() + ./file1.yml
    б) Модуль FS, для считывания файлов
    в) path.extname
3) const obj1 = { ...} const obj2 = { ...}
4)
[
    {key: "key1", value: 'value2', status: 'unchanged'},
    {key: "key2", value: 'value2', status: 'deleted'},
]
5) depth = 1
spacer = '    '
spacer.repeat(depth)
 */
