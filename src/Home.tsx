import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, LoginContainer, MainContainer, SelectInput, TextInput } from './CustomStyled'

function Home(): JSX.Element {
    const history = useHistory()

    function roomSelect(event: React.ChangeEvent<HTMLSelectElement>): void {
        const roomUrl = `/${event.target.value}`
        console.log('Changing room to ' + roomUrl)
        history.push(roomUrl)
    }

    return (
        <MainContainer>
            <LoginContainer>
                <form id="contact" action="" method="post">
                    <h3>playindoor.games</h3>
                    <h4>Create a game below</h4>
                    <TextInput placeholder="User name" type="text" tabIndex={1} required />
                    <TextInput placeholder="Room name" type="text" tabIndex={2} required autoFocus />
                    <SelectInput onChange={roomSelect}>
                        <option>Select a game</option>
                        <option value="tic-tac-toe">Tic Tic Toe</option>
                    </SelectInput>
                    <Button name="submit" type="submit" id="contact-submit" data-submit="...Sending">
                        Create
                    </Button>
                    <p className="copyright">
                        Created by{' '}
                        <a href="https://tanayseven.com" target="_blank" rel="noreferrer" title="Colorlib">
                            Tanay PrabhuDesai
                        </a>
                    </p>
                </form>
            </LoginContainer>
        </MainContainer>
    )
}

export default Home
