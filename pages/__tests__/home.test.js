import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component'
import Home from '../index'

const sum = () => {
  return 0
}

describe('Home', async (assert) => {
  const $ = render(<Home />)
  assert({
    given: 'Home component',
    should: 'render the app',
    actual: $('title').html().trim(),
    expected: 'Create Next App'
  })
})
