/*
  Copyright 2023 the JSDoc Authors.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import path from 'node:path';

import { execa } from 'execa';
import { task } from 'hereby';

const BIN_DIR = 'node_modules/.bin';

const sourceGlob = ['**/*.js'];

function bin(name) {
  return path.join(BIN_DIR, name);
}

export const dependencyEngines = task({
  name: 'dependency-engines',
  run: async () => {
    await execa(bin('installed-check'), ['--no-include-workspace-root'], {
      stdout: 'inherit',
      stderr: 'inherit',
    });
  },
});

export const dependencyLicenses = task({
  name: 'dependency-licenses',
  run: async () => {
    await execa(bin('licensee'), ['--errors-only']);
  },
});

export const dependencies = task({
  name: 'dependencies',
  dependencies: [dependencyEngines, dependencyLicenses],
});

export const format = task({
  name: 'format',
  run: async () => {
    await execa(bin('prettier'), ['--write', './']);
  },
});

export const licenseHeaders = task({
  name: 'license-headers',
  run: async () => {
    await execa(bin('license-check-and-add'), ['check', '-f', '.license-check.json']);
  },
});

export const licenseCheck = task({
  name: 'license-check',
  dependencies: [dependencyLicenses, licenseHeaders],
});

export const lint = task({
  name: 'lint',
  run: async () => {
    await execa(bin('eslint'), [...sourceGlob], {
      stdout: 'inherit',
      stderr: 'inherit',
    });
  },
});

export default lint;
