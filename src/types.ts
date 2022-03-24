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

export type SuccessState =
    | { success: true }
    | { success: false; reason: string };

export interface LetterData {
    letter: Letter;
    color?: Color | null;
    hasColorSet: boolean;
}
