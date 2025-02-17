#!/usr/bin/env node --no-warnings=ExperimentalWarning --loader ts-node/esm --experimental-specifier-resolution=node

import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { updateIcon } from '../update';

const program = new Command();

const CONFIG_FILE_NAME = 'icons-config.json';

program.command('update').action(() => {
  // 读取配置
  fs.readFile(path.resolve(process.cwd(), `./${CONFIG_FILE_NAME}`), { encoding: 'utf8' }, (error, configSource) => {
    if (error) {
      console.error(error);
      return;
    }

    const config = JSON.parse(configSource);

    updateIcon(config);
  });
});

program.parse();
