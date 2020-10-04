import React, { Component } from 'react';
import Communication from './Communication';

class Codewords extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    componentDidMount(): void {
        this.setState({ communication: new Communication(this.props.roomName, 'Lalu') });
    }
    render(): JSX.Element {
        return (
            <div>
                <h1>House of Recreation</h1>
            </div>
        );
    }
}

interface State {
    communication: Communication;
}

interface Props {
    roomName: string;
}

export default Codewords;
