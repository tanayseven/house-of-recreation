// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import styled, { css } from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
`

export const LoginContainer = styled.div`
  width: 80%;
  max-width: 500px;
`

export const CommonInput = css`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`

export const Input = styled.input`
  ${CommonInput}
  cursor: text;
`

export const Select = styled.select`
  ${CommonInput}
  cursor: pointer;
`

export const Button = styled.button`
  ${CommonInput}
  cursor: pointer;
`

export const GameBoardHeader = styled.div`
  text-align: center;
`

export const GameBoardMain = styled.div`
  width: 300px;
  height: 300px;
  margin: 0 auto;
  background-color: white;
  color: black;
  border: 2px solid black;
  border-radius: 10px;

  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
`

export const GameBoardContainer = styled.div`
  flex-direction: column;
`

export const GameTile = styled.button`
  border: 2px solid black;
  border-radius: 2px;
  font-weight: bold;
  font-size: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
