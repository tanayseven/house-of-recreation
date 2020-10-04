const Bugout = require('bugout'); // eslint-disable-line

const BASE_IDENTIFIER = 'com.house-of-rec.rooms.';

export default class Communication {
    bugout: any;
    peers: Array<any> = [];
    roomName: string;

    constructor(roomName: string, selfName: string) {
        this.bugout = Bugout(`${BASE_IDENTIFIER}${roomName}`);
        this.roomName = roomName;
        this.bugout.on('message', function (address: any, message: any) {
            console.log(`Message from ${address} is ${JSON.parse(message)}`);
        });
        this.bugout.on('seen', function (address: any) {
            console.log(`Just seen this address ${address} join`);
        });
        this.bugout.send({ message: `Hi, It's ${selfName} I've just connected` });
    }
}
