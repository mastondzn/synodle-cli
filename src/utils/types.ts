export type Letter =
    | 'q'
    | 'w'
    | 'e'
    | 'r'
    | 't'
    | 'y'
    | 'u'
    | 'i'
    | 'o'
    | 'p'
    | 'a'
    | 's'
    | 'd'
    | 'f'
    | 'g'
    | 'h'
    | 'j'
    | 'k'
    | 'l'
    | 'z'
    | 'x'
    | 'c'
    | 'v'
    | 'b'
    | 'n'
    | 'm';

export type Color = 'grey' | 'green' | 'yellow';

export interface LetterData {
    letter: Letter;
    color?: Color;
    becameGreyAt?: number;
    becameYellowAt?: number;
    becameGreenAt?: number;
    changedColorAt: number[];
}

export interface GuessResult {
    guess: string;
    guessedAt: string;
    colors: Color[];
    letters: Letter[];
}

export type GuessResults = GuessResult[];

export type StateOfLetters = Map<Letter, LetterData>;
export type StateOfLettersAsArray = Record<Letter, LetterData>[];

export interface Answer {
    word: string;
    date: string;
}

export interface UserData {
    createdAt: string;
    username: string;
    gamesPlayed: GamesPlayed;
}

export type GamesPlayed = GameState[];

export interface GameState {
    type: 'daily' | 'random';
    isFinished: boolean;
    wasSolved: boolean;
    startedAt: string;
    finishedAt?: string;
    guesses: GuessResult[];
    stateOfLetters: StateOfLettersAsArray;
    answer: string;
}
