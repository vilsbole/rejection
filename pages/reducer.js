import { propEq, find, without } from 'ramda'

import { addQuestion, answerQuestion } from './actions'

const reducer = (state = [], { type, payload } = {}) => {
  switch(type) {
    case addQuestion.type:
      return [...state, payload ]
    case answerQuestion.type: {
      const question = find(propEq('id', payload.id))(state)
      const prune = without([question], state)
      return [
        ...prune,
        {
          ...question,
          status: payload.status
        }
      ]
    }
    default:
      return state
  }
}

export default reducer
