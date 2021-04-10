/*
 * Copyright (c) 2021. Tanay PrabhuDesai
 * Please refer to LICENSE.txt file for a complete copyright notice
 *
 */
type BugoutOpts = {
    announce?: string[]
}

type CustomFunctionArgs = void
type CustomFunction = () => void
type Events = 'seen' | 'server' | 'connections' | 'message' | 'ping' | 'left' | 'timeout' | 'rpc' | 'rpc-response'

class Bugout {
    constructor(identifier: string, opts: BugoutOpts)
    address(): string
    register(callName: string, func: CustomFunction, docString: string): void
    rpc(address: string, callName: string, args: CustomFunctionArgs, callback: () => void)
    send(address: string, message: string): void
    send(message: string): void
    heartbeat(milliseconds: number): void
    destroy(callback?: () => void): void
    on(eventName: string, callback: (address: any, message: any) => void) // implement this with generic for every event type
}

declare module 'bugout' {
    export default Bugout
}
