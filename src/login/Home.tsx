/*
 * Copyright (c) 2021. Tanay PrabhuDesai
 * Please refer to LICENSE.txt file for a complete copyright notice
 *
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { LoginContainer, MainContainer } from '../CustomStyled'

const Home = (): JSX.Element => {
    return (
        <MainContainer>
            <LoginContainer>
                <Link to="/create-game">Create Game</Link>
                <br />
                <Link to="/join-game">Join Game</Link>
            </LoginContainer>
        </MainContainer>
    )
}

export default Home
