import { add } from '../src/main.js';

test('add 2+4 to equal 6', () => {
    expect(add(2, 4)).toBe(6);
});
