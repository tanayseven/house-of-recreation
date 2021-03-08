// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

export interface Game {
    get(row: number, column: number): string
    canPlay(row: number, column: number): boolean
    play(row: number, column: number): void
}
