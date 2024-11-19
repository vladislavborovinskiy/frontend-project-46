#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .version('0.0.1', '-V, --version', 'output the version number')
  .usage('[options] <filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action(() => {
    const { format } = program.opts();
    const [filepath1, filepath2] = program.args;
    const diff = genDiff(filepath1, filepath2, format);
    console.log(diff);
  });

program.parse(process.argv);
