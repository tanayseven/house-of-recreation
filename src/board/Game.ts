export interface Game {
    get(row: number, column: number): string
    canPlay(row: number, column: number): boolean
    play(row: number, column: number): void
}
