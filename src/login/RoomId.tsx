/*
 * Copyright (c) 2021. Tanay PrabhuDesai
 * Please refer to LICENSE.txt file for a complete copyright notice
 *
 */

import React from 'react'
import { CopyButton, Input, Label } from '../CustomStyled'
import styled from 'styled-components'

const ShortContainer = styled.div`
  display: flex;
  align-items: center;
`
export const RoomId = ({ id }: { id: string }): JSX.Element => {
  const roomIdRef = React.createRef<HTMLInputElement>()
  return (
    <ShortContainer>
      <Label width="70px">Room ID:</Label>
      <Input ref={roomIdRef} value={id} readOnly width="200px" />
      <CopyButton
        onClick={(): void => {
          roomIdRef.current?.select()
          document.execCommand('copy')
        }}
      />
    </ShortContainer>
  )
}
