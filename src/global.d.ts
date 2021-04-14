/*
 * Copyright (c) 2021. Tanay PrabhuDesai
 * Please refer to LICENSE.txt file for a complete copyright notice
 *
 */
type BugoutOpts = {
    announce?: string[]
}

type SeenCallBack = (address: string) => void
type ServerCallback = (address: string) => void
type ConnectionsCallback = (count: number) => void
type MessageCallback = (address: string, message: Record<string, unknown>, packet: Record<string, unknown>) => void
type PingCallback = (address: string) => void
type LeftCallback = (address: string) => void
type TimeoutCallback = (address: string) => void
type RPCCallback = (address: string, callback: (...any) => void) => void
type RPCResponseCallBack = (address: string, none: string, response: Record<string, unknown>) => void

type EventCallbacks =
    | SeenCallBack
    | ServerCallback
    | ConnectionsCallback
    | MessageCallback
    | PingCallback
    | LeftCallback
    | TimeoutCallback
    | RPCCallback
    | RPCResponseCallBack

class Bugout {
    constructor(identifier: string, opts?: BugoutOpts)
    address(): string
    register(callName: string, func: CustomFunction, docString: string): void
    rpc(address: string, callName: string, args: CustomFunctionArgs, callback: Function) //eslint-disable-line
    send(address: string, message: string): void
    send(message: string): void
    heartbeat(milliseconds: number): void
    destroy(callback?: () => void): void
    on<CallbackType extends EventCallbacks>(eventName: string, callback: CallbackType) // implement this with generic for every event type
}

declare module 'bugout' {
    export default Bugout
    export {
        Bugout,
        BugoutOpts,
        SeenCallBack,
        ServerCallback,
        ConnectionsCallback,
        MessageCallback,
        PingCallback,
        LeftCallback,
        TimeoutCallback,
        RPCCallback,
        RPCResponseCallBack,
    }
}
