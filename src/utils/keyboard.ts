import chalk from 'chalk';
import Collection from '@discordjs/collection';
import type { Color, Letter, SuccessState, LetterData } from './types.js';

export default class Keyboard {
    public letterAndColors: Collection<Letter, LetterData>;

    constructor() {
        const letters = `qwertyuiopasdfghjklzxcvbnm`.split('') as Letter[];
        this.letterAndColors = new Collection();

        for (const letter of letters) {
            this.letterAndColors.set(letter as Letter, {
                letter,
                hasColorSet: false,
            });
        }
    }

    public hasColorSet(letter: Letter): boolean {
        return !!this.letterAndColors.get(letter)?.hasColorSet;
    }

    public getColorOfLetter(letter: Letter): Color | null {
        const data = this.letterAndColors.get(letter);
        return data?.color ? data.color : null;
    }

    public get output(): string {
        return this.letterAndColors
            .map((v, k) => {
                switch (v.color) {
                    case 'green':
                        return chalk.bgGreen(k);
                    case 'yellow':
                        return chalk.bgYellow(k);
                    case 'grey':
                        return chalk.bgGrey(k);
                    default:
                        return k;
                }
            })
            .join(' ')
            .replace(/(?<=p)|(?<=l)/g, '\n')
            .split('\n')
            .map((e, _i, arr) => {
                if (arr.indexOf(e) === 0) return e.trim();
                if (arr.indexOf(e) === 1) return ` ${e.trim()}`;
                return `   ${e.trim()}`;
            })
            .join('\n');
    }

    public setColorOfLetter(
        letter: Letter,
        color: Color,
        overwriteCurrentColor?: boolean,
    ): SuccessState {
        if (letter.length !== 1) {
            return { reason: 'Length of letter is not one.', success: false };
        }

        if (!overwriteCurrentColor && this.hasColorSet(letter)) {
            return {
                reason: 'This letter already has a color set, and the overwriteCurrentColor argument is false.',
                success: false,
            };
        }

        this.letterAndColors.set(letter, {
            hasColorSet: true,
            color,
            letter,
        });

        return { success: true };
    }
}
