type XO = '-' | 'X' | 'O'
export class TicTacToe {
    constructor(player1: string, player2: string) {
        this.players[0] = player1
        this.players[1] = player2
    }

    cells: Array<Array<XO>> = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
    ]

    players = ['', '']

    currentPlayerIndex = 0

    playerSigns: Array<XO> = ['X', 'O']

    canPlay(row: number, column: number): boolean {
        return this.cells[row][column] == '-'
    }

    play(row: number, column: number): void {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length
        if (this.canPlay(row, column)) this.cells[row][column] = this.playerSigns[this.currentPlayerIndex]
    }

    get(row: number, column: number): XO {
        return this.cells[row][column]
    }

    remainingTurns(): number {
        let sum = 0
        this.cells.forEach((row) =>
            row.forEach((cell) => {
                if (cell == '-') {
                    sum++
                }
            }),
        )
        return sum
    }

    currentPlayer(): string {
        return this.players[this.currentPlayerIndex]
    }
}
