import path from 'node:path';

import yamlLoad from '../../lib/yaml-load.js';

export default () => yamlLoad(path.join(import.meta.dirname, 'redirects.yaml')).redirects;
