import styled, { css } from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
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

export const TextInput = styled.input`
    ${CommonInput}
`

export const SelectInput = styled.select`
    ${CommonInput}
`

export const Button = styled.button`
    ${CommonInput}
`
