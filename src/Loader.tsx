import React from 'react'
import styled from 'styled-components'
import { MainContainer } from './CustomStyled'

const Overlay = styled.div`
  cursor: wait;
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
  z-index: 2;
`

const LoadingText = styled.p`
  font-size: 40px;
`

const PacmanContainer = styled.div`
  position: relative;
  > div:nth-child(1) {
    width: 0;
    height: 0;
    border: 30px solid black;
    border-right: 30px solid transparent;
    border-radius: 30px;
    position: relative;
    margin: auto;
    animation: rotate-half-up 0.5s 0s infinite;
  }
  > div:nth-child(2) {
    width: 0;
    height: 0;
    border: 30px solid black;
    border-right: 30px solid transparent;
    border-radius: 30px;
    position: relative;
    margin: -60px auto auto;
    animation: rotate-half-down 0.5s 0s infinite;
  }
  > div:nth-child(3),
  > div:nth-child(4),
  > div:nth-child(5) {
    background-color: black;
    border-radius: 100%;
    width: 10px;
    height: 10px;
    position: absolute;
    top: 30px;
    left: 100px;
  }
  > div:nth-child(3) {
    animation: pills 1s -0.66s infinite linear;
  }
  > div:nth-child(4) {
    animation: pills 1s -0.33s infinite linear;
  }
  > div:nth-child(5) {
    animation: pills 1s 0s infinite linear;
  }
  @keyframes rotate-half-up {
    0% {
      transform: rotate(270deg);
    }
    50% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(270deg);
    }
  }
  @keyframes rotate-half-down {
    0% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(90deg);
    }
  }
  @keyframes pills {
    75% {
      opacity: 0.7;
    }
    100% {
      transform: translate(-60px, 0);
    }
  }
`

const PacmanAnimation = (): JSX.Element => (
  <PacmanContainer>
    <div />
    <div />
    <div />
    <div />
    <div />
  </PacmanContainer>
)

type Props = {
  children?: React.ReactNode
}

const Loader = ({ children }: Props): JSX.Element => {
  return (
    <Overlay>
      <MainContainer>
        <LoadingText>Loading</LoadingText>
        <br />
        <PacmanAnimation />
        {children}
      </MainContainer>
    </Overlay>
  )
}

export default Loader
