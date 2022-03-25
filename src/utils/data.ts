import answersData from '../../data/answers.json';
import wordsData from '../../data/words.json';
import { isSameDayAsToday } from './helpers';
import type { Answer } from './types';

export const answers = answersData as Answer[];
export const words = wordsData as string[];

export const getTodaysAnswer = (): string => {
    const answer = answers.find(({ date }) => isSameDayAsToday(new Date(date)));
    if (!answer) {
        throw new Error('No answer found');
    }
    return answer.word;
};

export const getRandomAnswer = (): string => {
    const answer = answers[Math.floor(Math.random() * answers.length)];
    return answer.word;
};
