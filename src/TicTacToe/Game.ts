type XO = '-' | 'X' | 'O';
export class TicTacToe {
    constructor(player1: string, player2: string) {
        this.players[0] = player1;
        this.players[1] = player2;
    }

    cells: Array<Array<XO>> = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
    ];

    players = ['', ''];

    currentPlayerIndex = 0;

    play(row: number, column: number): boolean {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        return false;
    }

    get(row: number, column: number): XO {
        return this.cells[row][column];
    }

    remainingTurns(): number {
        let sum = 0;
        this.cells.forEach((row) =>
            row.forEach((cell) => {
                if (cell == '-') {
                    sum++;
                }
            }),
        );
        return sum;
    }

    currentPlayer(): string {
        return this.players[this.currentPlayerIndex];
    }
}
