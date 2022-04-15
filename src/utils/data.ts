import fs from 'node:fs';

import { isSameDayAsToday } from './helpers';
import type { Answer, UserData } from './types';

let userData: UserData[];

// eslint-disable-next-line no-lone-blocks
try {
    userData = JSON.parse(
        fs.readFileSync('data/users.json').toString(),
    ) as UserData[];
    if (!userData[0].username && !Array.isArray(userData[0]?.gamesPlayed)) {
        throw new Error('Malformed user data');
    }
} catch {
    console.log(
        'No user data file found, creating a new file (data/users.json)',
    );
    userData = [];
    fs.writeFileSync('data/users.json', JSON.stringify(userData, undefined, 4));
}
export class DataHandler {
    answers: Answer[];
    nytAnswers: string[];
    words: string[];
    allUsersData: UserData[];
    currentUserData: UserData;
    wantedUsername: string;

    constructor(wantedUsername: string) {
        this.wantedUsername = wantedUsername;

        const words = JSON.parse(
            fs.readFileSync('data/words.json').toString(),
        ) as string[] | undefined;
        if (!words?.[0]) {
            throw new Error('Unable to find words or malformed file');
        }
        this.words = words;

        const nytAnswers = JSON.parse(
            fs.readFileSync('data/nyt-answers.json').toString(),
        ) as string[] | undefined;
        if (!nytAnswers?.[0]) {
            throw new Error('Unable to find nyt answers or malformed file');
        }
        this.nytAnswers = nytAnswers;

        const answers = JSON.parse(
            fs.readFileSync('data/answers.json').toString(),
        ) as Answer[] | undefined;
        if (!answers?.[0]?.word) {
            throw new Error('Unable to find answers or malformed file');
        }
        this.answers = answers;

        const usersData = JSON.parse(
            fs.readFileSync('data/users.json').toString(),
        ) as UserData[] | undefined;
        if (!Array.isArray(usersData)) {
            console.log(
                'No user data file found, creating a new file (data/users.json)',
            );
            userData = [];
            fs.writeFileSync(
                'data/users.json',
                JSON.stringify(userData, undefined, 4),
            );
        } else {
            this.allUsersData = usersData;
        }

        const userDataFound = this.allUsersData.find(
            ({ username }) => this.wantedUsername === username,
        );
        if (!userDataFound) {
            console.log('No user data found! Creating a clean user...');

            this.addNewUser();

            const data = this.allUsersData.find(
                ({ username }) => this.wantedUsername === username,
            );
            if (!data) {
                throw new Error("Couldn't find user even after we created it");
            }

            this.saveUsersState();
            this.currentUserData = data;
        } else {
            this.currentUserData = userDataFound;
        }
    }

    addNewUser() {
        this.allUsersData.push({
            createdAt: new Date().toISOString(),
            gamesPlayed: [],
            username: this.wantedUsername,
        });
    }

    saveUsersState(): void {
        fs.writeFileSync(
            'data/users.json',
            JSON.stringify(this.allUsersData, undefined, 4),
        );
    }

    getTodaysAnswer(): string {
        const answerFound = this.answers.find(({ date }) =>
            isSameDayAsToday(new Date(date)),
        );
        if (!answerFound) {
            throw new Error('No answer found for today');
        }
        return answerFound.word;
    }

    getRandomAnswer(): string {
        const randomIndex = Math.floor(Math.random() * this.nytAnswers.length);
        return this.nytAnswers[randomIndex];
    }
}
