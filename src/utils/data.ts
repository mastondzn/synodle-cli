// import fs from 'fs';
//
// import { isSameDayAsToday } from './helpers';
// import type { Answer, UserData } from './types';
//
// let userData: UserData[];
//
// const answersData = JSON.parse(fs.readFileSync('data/answers.json', 'utf8'));
// const nytAnswers = JSON.parse(fs.readFileSync('data/nyt-answers.json', 'utf8'));
// const wordsData = JSON.parse(fs.readFileSync('data/words.json', 'utf8'));
//
// // eslint-disable-next-line no-lone-blocks
// try {
//     userData = JSON.parse(
//         fs.readFileSync('data/users.json', 'utf8'),
//     ) as UserData[];
//
//     if (!userData[0].username && !Array.isArray(userData[0]?.gamesPlayed)) {
//         throw new Error('Malformed user data');
//     }
// } catch (e) {
//     console.log(
//         'No user data file found, creating a new file (data/users.json)',
//     );
//     userData = [];
//     fs.writeFileSync('data/users.json', JSON.stringify(userData, null, 4));
// }
//
// export default class DataHandler {
//     public answers: Answer[];
//     public nytAnswers: string[];
//     public words: string[];
//     public allUsersData: UserData[];
//     public currentUserData: UserData;
//     public wantedUsername: string;
//
//     constructor(wantedUsername: string, log?: boolean) {
//         this.words = JSON.parse(fs.readFileSync('data/words.json', 'utf8'));
//         this.nytAnswers = JSON.parse(
//             fs.readFileSync('data/nyt-answers.json', 'utf8'),
//         );
//         this.answers = JSON.parse(fs.readFileSync('data/answers.json', 'utf8'));
//
//         const usersData = JSON.parse(
//             fs.readFileSync('data/users.json', 'utf8'),
//         ) as UserData[];
//
//         if (!usersData) {
//             if (log)
//                 console.log(
//                     'No user data file found, creating a new file (data/users.json)',
//                 );
//             userData = [];
//             fs.writeFileSync(
//                 'data/users.json',
//                 JSON.stringify(userData, null, 4),
//             );
//         }
//
//         this.
//
//         const userDataFound = this.allUsersData.find(
//             ({ username }) => this.wantedUsername === username,
//         );
//
//         if (!userDataFound) {
//             if (log)
//                 console.log('No user data found! Creating a clean user...');
//             this.addNewUser();
//             const data = this.allUsersData.find(
//                 ({ username }) => this.wantedUsername === username,
//             );
//             if (!data)
//                 throw new Error("Couldn't find user even after we created it");
//
//             this.saveUsersState();
//             this.currentUserData = data;
//         } else {
//             this.currentUserData = userDataFound;
//         }
//     }
//
//     private addNewUser() {
//         this.allUsersData.push({
//             createdAt: new Date().toISOString(),
//             gamesPlayed: {
//                 dailies: [],
//                 randoms: [],
//             },
//             username: this.wantedUsername,
//         });
//     }
//
//     public saveUsersState(): void {
//         fs.writeFileSync(
//             'data/users.json',
//             JSON.stringify(this.allUsersData, null, 4),
//         );
//     }
//
//     public getTodaysAnswer(): string {
//         const answerFound = this.answers.find(({ date }) =>
//             isSameDayAsToday(new Date(date)),
//         );
//
//         if (!answerFound) {
//             throw new Error('No answer found for today');
//         }
//
//         return answerFound.word;
//     }
//
//     public getRandomAnswer(): string {
//         const randomIndex = Math.floor(Math.random() * this.nytAnswers.length);
//         return this.nytAnswers[randomIndex];
//     }
// }
//
