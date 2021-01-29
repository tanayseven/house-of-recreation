import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
`

const LoginContainer = styled.div`
    width: 80%;
    max-width: 500px;
`
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
                    <fieldset>
                        <input placeholder="Room name" type="text" tabIndex={1} required autoFocus />
                    </fieldset>
                    <fieldset>
                        <input placeholder="User name" type="text" tabIndex={2} required />
                    </fieldset>
                    <fieldset>
                        <select onChange={roomSelect}>
                            <option>Select a game</option>
                            <option value="tic-tac-toe">Tic Tic Toe</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">
                            Create
                        </button>
                    </fieldset>
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
