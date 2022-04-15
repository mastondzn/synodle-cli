// eslint-disable-next-line unicorn/import-style
import type { ChalkInstance } from 'chalk';
import chalk from 'chalk';

import { chalkHelper } from './chalk';
import type {
    Color,
    GuessResults,
    Letter,
    LetterData,
    StateOfLetters,
} from './types';

export const letters = [...'qwertyuiopasdfghjklzxcvbnm'] as Letter[];

export const isValidDate = (date: unknown): boolean =>
    // eslint-disable-next-line no-restricted-globals, unicorn/prefer-number-properties
    date instanceof Date && !isNaN(date as unknown as number);

export const isSameDay = (date1: Date, date2: Date): boolean => {
    if (!isValidDate(date1) || !isValidDate(date2)) {
        throw new TypeError('Invalid date');
    }

    const d1 = new Date(date1.getTime());
    d1.setHours(0, 0, 0, 0);
    const d2 = new Date(date2.getTime());
    d2.setHours(0, 0, 0, 0);
    return d1.getTime() === d2.getTime();
};

export const isSameDayAsToday = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isSameDay(today, date);
};

export const findTodaysAnswer = (
    answers: { word: string; date: string }[],
): string => {
    const answer = answers.find(({ date }) => isSameDayAsToday(new Date(date)));
    if (!answer) {
        throw new Error('No answer found');
    }
    return answer.word;
};

export const colorOfLetters = (guess: string, answer: string): Color[] => {
    if (guess.length !== answer.length && guess.length === 5) {
        throw new Error('Guess is not 5 letters');
    }

    const colors: Color[] = [];
    for (const [index, element] of [...guess].entries()) {
        if (element === answer[index]) {
            colors.push('green');
        } else if (answer.includes(element)) {
            colors.push('yellow');
        } else {
            colors.push('grey');
        }
    }
    return colors;
};

export const joinMultilineStrings = (strings: string[], pad = 1): string => {
    if (strings.length === 0) {
        return '';
    }
    if (strings.length === 1) {
        return strings[0];
    }
    if (strings.every((string) => !string.includes('\n'))) {
        throw new Error(
            'All strings do not contain a newline, use Array.join()',
        );
    }

    const numberOfNewlines = strings[0].split('\n').length;
    const hasConsistentNewlines = !strings.some(
        (string) => string.split('\n').length !== numberOfNewlines,
    );

    if (!hasConsistentNewlines) {
        throw new Error('All strings must have the same number of newlines');
    }

    const lines = strings.map((s) => s.split('\n'));
    const newStrings: string[] = Array.from(
        { length: numberOfNewlines },
        () => '',
    );

    for (let index = 0; index < strings.length; index += 1) {
        for (let index_ = 0; index_ < lines[0].length; index_ += 1) {
            newStrings[index_] = `${newStrings[index_]}${' '.repeat(pad)}${
                lines[index][index_]
            }`;
        }
    }

    return newStrings.map((element) => element.trim()).join('\n');
};

export const generateKeyboard = (stateOfLetters: StateOfLetters): string => {
    const array: string[] = [];

    for (const letter of letters) {
        const data = stateOfLetters.get(letter) as LetterData;
        const color = data?.color;

        if (color)
            array.push(
                chalk.black((chalkHelper.get(color) as ChalkInstance)(letter)),
            );
        else array.push(letter);
    }

    return array
        .join(' ')
        .replace(/(?<=p)|(?<=l)/g, '\n')
        .split('\n')
        .map((element, _index, a) => {
            if (a.indexOf(element) === 0) return `${element.trim()} `;
            if (a.indexOf(element) === 1) return ` ${element.trim()} `;
            return `  ${element.trim()} `;
        })
        .join('\n');
};

export const create2DArray = <T>(
    rows: number,
    columns: number,
    fill: T,
): T[][] => {
    const array = Array.from({ length: rows }, () => {
        const cols = Array.from({ length: columns }, () => fill);
        return cols;
    });
    return array;
};

export const generateTable = (guesses: GuessResults): string => {
    const rows = create2DArray(6, 5, '?');

    for (const [rowPosition, guess] of guesses.entries()) {
        for (
            let columnPosition = 0;
            columnPosition < guess.letters.length;
            columnPosition += 1
        ) {
            const chalkColor = chalkHelper.get(
                guess.colors[columnPosition],
            ) as ChalkInstance;

            const colored = chalk.black(
                chalkColor(guess.letters[columnPosition]),
            );

            rows[rowPosition][columnPosition] = colored;
        }
    }

    const boardString = rows.map((row) => row.join(' ')).join('\n');
    return boardString;
};

export const guessValidator = (value: string) => {
    if (value.length !== 5) {
        return `Guess is not 5 letters (${value.length} letters)`;
    }

    return true;
};
