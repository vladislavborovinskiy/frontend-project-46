import { readFileSync } from 'fs';
import path from 'path';
import jsYaml from 'js-yaml';

const parseFile = (filePath) => {
  const extname = path.extname(filePath).toLowerCase();
  const content = readFileSync(filePath, 'utf-8');

  switch (extname) {
    case '.json':
      return JSON.parse(content);
    case '.yml':
    case '.yaml':
      return jsYaml.load(content);
    default:
      throw new Error(`Unsupported file extension: ${extname}`);
  }
};

export default parseFile;
