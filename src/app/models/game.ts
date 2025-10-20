export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playerCards: string[] = [];
    public currentPlayer: number = 0;

    constructor() {

        for (let i = 1; i < 14; i++) {
            this.stack.push('spades_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
        }
        shuffle(this.stack);
    }
}

function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
};