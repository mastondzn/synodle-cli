// eslint-disable-next-line unicorn/import-style
import type { ChalkInstance } from 'chalk';
import chalk from 'chalk';

import type { Color } from './types';

const chalkHelper = new Map<Color, ChalkInstance>([
    ['grey', chalk.bgGray],
    ['yellow', chalk.bgYellowBright],
    ['green', chalk.bgGreenBright],
]);

export { chalkHelper };
