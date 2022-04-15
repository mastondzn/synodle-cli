import os from 'node:os';
import prompts from 'prompts';

import { Synodle } from './synodle';
import { guessValidator, joinMultilineStrings } from './utils/helpers';

const { username } = os.userInfo();

const synodle = new Synodle({ gameType: 'daily', username });

for (let index = 0; index < 6; index += 1) {
    const places = ['first', 'second', 'third', 'fourth', 'sixth'];

    // eslint-disable-next-line no-await-in-loop
    const answer = await prompts({
        message: `Enter your ${places[index]} guess:`,
        name: places[index],
        type: 'text',
        validate: guessValidator,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    synodle.addGuess(answer[places[index]]);
    const kb = synodle.makeKeyboard();
    const table = synodle.makeTable();

    const isWinning = synodle.isWinningGame();
    if (isWinning) {
        console.log(`You won!`);
        break;
    }

    console.log(joinMultilineStrings([table, `\n\n\n${kb}`], 6));
}
