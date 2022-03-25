import { colorOfLetters, letters, generateKeyboard } from './helpers';

import type {
    GuessResults,
    Letter,
    LetterData,
    StateOfLetters,
} from './types.js';

export default class Synodle {
    public answer: string;
    public resultOfGuesses: GuessResults;
    public stateOfLetters: StateOfLetters;

    public constructor(answer: string, guesses?: string[]) {
        if (answer.length !== 5) {
            throw new Error('Answer is not 5 letters');
        }
        this.answer = answer;
        this.resultOfGuesses = [];

        this.stateOfLetters = new Map();
        for (const letter of letters) {
            this.stateOfLetters.set(letter, {
                letter,
                changedColorAt: [],
            });
        }

        if (guesses?.length) {
            this.addInitialGuesses(guesses);
        }
    }

    public getState(): StateOfLetters {
        return this.stateOfLetters;
    }

    public makeKeyboard(): string {
        return generateKeyboard(this.stateOfLetters);
    }

    private addInitialGuesses(guesses: string[]): void {
        for (const guess of guesses) {
            this.addGuess(guess);
        }
    }

    private addGuess(guess: string): void {
        if (guess.length !== 5) {
            throw new Error('Guess is not 5 letters');
        }

        if (this.resultOfGuesses.length + 1 === 6) {
            throw new Error('Too many guesses');
        }

        const colors = colorOfLetters(guess, this.answer);
        this.resultOfGuesses.push({
            guess,
            colors,
        });

        for (let j = 0; j < colors.length; j += 1) {
            const data = this.stateOfLetters.get(
                guess[j] as Letter,
            ) as LetterData;

            data.changedColorAt.push(this.resultOfGuesses.length + 1);

            switch (colors[j]) {
                case 'grey':
                    data.becameGreyAt = this.resultOfGuesses.length;
                    data.color = 'grey';
                    break;

                case 'yellow':
                    // if the color was green, dont change it to yellow
                    if (data?.color === 'green') break;

                    data.becameYellowAt = this.resultOfGuesses.length;
                    data.color = 'yellow';
                    break;

                case 'green':
                    data.becameGreenAt = this.resultOfGuesses.length;
                    data.color = 'green';
                    break;

                default:
                    break;
            }
        }
    }
}
