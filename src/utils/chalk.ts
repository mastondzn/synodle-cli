import type { ChalkInstance } from 'chalk';
import chalk from 'chalk';
import type { Color } from './types';

const chalkHelper = new Map<Color, ChalkInstance>([
    ['grey', chalk.bgGrey],
    ['yellow', chalk.bgYellow],
    ['green', chalk.bgGreen],
]);

export default chalkHelper;
