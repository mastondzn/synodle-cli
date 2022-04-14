import meow from 'meow';
import prompts from 'prompts';

import Synodle from './synodle';
import { joinMultilineStrings } from './utils/helpers';

console.clear();

const validator = (value: string) => {
    if (value.length !== 5) {
        return `Guess is not 5 letters (${value.length} letters)`;
    }

    return true;
};

const synodle = new Synodle('tests');

for (let i = 0; i < 6; i += 1) {
    const places = ['first', 'second', 'third', 'fourth', 'sixth'];

    // eslint-disable-next-line no-await-in-loop
    const answer = await prompts({
        message: `Enter your ${places[i]} guess:`,
        name: places[i],
        type: 'text',
        validate: validator,
    });

    synodle.addGuess(answer[places[i]]);
    const kb = synodle.makeKeyboard();
    const table = synodle.makeTable();

    console.log(joinMultilineStrings([table, `\n\n\n${kb}`], 6));
}
