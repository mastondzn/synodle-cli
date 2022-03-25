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
    colors: Color[];
}

export type GuessResults = GuessResult[];

export type StateOfLetters = Map<Letter, LetterData>;

export interface Answer {
    word: string;
    date: string;
}
