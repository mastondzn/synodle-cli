import { DataHandler } from './utils/data';
import {
    colorOfLetters,
    generateKeyboard,
    generateTable,
    letters,
} from './utils/helpers';
import type {
    GameState,
    GuessResults,
    Letter,
    LetterData,
    StateOfLetters,
} from './utils/types';

interface ISynodleSettings {
    username: string;
    answer?: string;
    gameType?: 'daily' | 'random';
}

export class Synodle {
    public answer: string;
    public gameState: GameState;
    public resultOfGuesses: GuessResults;
    public stateOfLetters: StateOfLetters;
    public data: DataHandler;

    public constructor(settings: ISynodleSettings) {
        this.data = new DataHandler(settings.username);

        if (settings.answer && settings.gameType) {
            throw new Error('Cannot set both answer and gameType');
        }

        if (settings.gameType === 'daily') {
            this.answer = this.data.getTodaysAnswer();
        } else if (settings.gameType === 'random') {
            this.answer = this.data.getRandomAnswer();
        } else if (settings.answer) {
            if (settings.answer.length !== 5) {
                throw new Error('Answer is not 5 letters');
            }
            this.answer = settings.answer;
        } else {
            throw new Error('No answer or gameType set');
        }

        this.resultOfGuesses = [];

        this.stateOfLetters = new Map();
        for (const letter of letters) {
            this.stateOfLetters.set(letter, {
                changedColorAt: [],
                letter,
            });
        }
    }

    public isSolved(): boolean {
        return this.answer === this.resultOfGuesses.at(-1)?.guess;
    }

    public getState(): StateOfLetters {
        return this.stateOfLetters;
    }

    public makeKeyboard(): string {
        return generateKeyboard(this.stateOfLetters);
    }

    public makeTable(): string {
        return generateTable(this.resultOfGuesses);
    }

    public addGuess(guess: string): void {
        if (guess.length !== 5) {
            throw new Error('Guess is not 5 letters');
        }

        if (this.resultOfGuesses.length + 1 === 6) {
            throw new Error('Too many guesses');
        }

        const colors = colorOfLetters(guess, this.answer);
        this.resultOfGuesses.push({
            colors,
            guess,
            guessedAt: new Date().toISOString(),
            letters: [...guess] as Letter[],
        });

        for (const [index, color] of colors.entries()) {
            const data = this.stateOfLetters.get(
                guess[index] as Letter,
            ) as LetterData;

            data.changedColorAt.push(this.resultOfGuesses.length + 1);

            switch (color) {
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

    isWinningGame(): boolean {
        return this.resultOfGuesses.at(-1)?.guess === this.answer;
    }
}
