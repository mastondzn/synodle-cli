import type { ChalkInstance } from 'chalk';
import type { Color, StateOfLetters, LetterData, Letter } from './types';

import chalkHelper from './chalk';

export const letters = 'qwertyuiopasdfghjklzxcvbnm'.split('') as Letter[];

export const isValidDate = (date: Date): boolean =>
    // eslint-disable-next-line no-restricted-globals
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
    for (let i = 0; i < guess.length; i += 1) {
        if (guess[i] === answer[i]) {
            colors.push('green');
        } else if (answer.includes(guess[i])) {
            colors.push('yellow');
        } else {
            colors.push('grey');
        }
    }
    return colors;
};

export const joinMultilineStrings = (strings: string[]): string => {
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
    const everyStringHasSameNumberOfNewlines = !strings.some(
        (string) => string.split('\n').length !== numberOfNewlines,
    );

    if (!everyStringHasSameNumberOfNewlines) {
        throw new Error('All strings must have the same number of newlines');
    }

    const lines = strings.map((s) => s.split('\n'));
    const newStrings: string[] = Array(numberOfNewlines).fill('');

    for (let j = 0; j < strings.length; j += 1) {
        for (let i = 0; i < lines[0].length; i += 1) {
            newStrings[i] = newStrings[i].concat(` ${lines[j][i]}`);
        }
    }

    return newStrings.join('\n');
};

export const generateKeyboard = (stateOfLetters: StateOfLetters): string => {
    const arr: string[] = [];

    for (const letter of letters) {
        const data = stateOfLetters.get(letter) as LetterData;
        const color = data?.color;

        if (color) arr.push((chalkHelper.get(color) as ChalkInstance)(letter));
        else arr.push(letter);
    }

    return arr
        .join(' ')
        .replace(/(?<=p)|(?<=l)/g, '\n')
        .split('\n')
        .map((e, _i, a) => {
            if (a.indexOf(e) === 0) return e.trim();
            if (a.indexOf(e) === 1) return ` ${e.trim()}`;
            return `   ${e.trim()}`;
        })
        .join('\n');
};
