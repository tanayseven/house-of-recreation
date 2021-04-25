// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  const { getByText } = render(<App />)
  expect(getByText(/Create game/i)).toBeInTheDocument()
  expect(getByText(/Join game/i)).toBeInTheDocument()
})
