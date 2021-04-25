/*
 * Copyright (c) 2021. Tanay PrabhuDesai
 * Please refer to LICENSE.txt file for a complete copyright notice
 *
 */

import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, LoginContainer, MainContainer } from '../CustomStyled'
import { LoginFooter, LoginHeader } from './Components'

const Home = (): JSX.Element => {
    const history = useHistory()
    const goto = (path: string): void => {
        history.push(path)
    }
    return (
        <MainContainer>
            <LoginContainer>
                <LoginHeader />
                <Button onClick={(): void => goto('/create-game')}>Create Game</Button>
                <br />
                <Button onClick={(): void => goto('/join-game')}>Join Game</Button>
                <LoginFooter />
            </LoginContainer>
        </MainContainer>
    )
}

export default Home
