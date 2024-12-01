import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.yml');

test('stylish', () => {
  const diff = genDiff(filepath1, filepath2).trim();
  const expected = readFile('resultStylish.txt');
  expect(diff).toEqual(expected);
});

test('plain', () => {
  const diff = genDiff(filepath1, filepath2, 'plain').trim();
  const expected = readFile('resultPlain.txt');
  expect(diff).toEqual(expected);
});
