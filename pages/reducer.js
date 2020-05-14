import { uuid } from "uuidv4";
import { propEq, find, without } from 'ramda'

const reducer = (state = {}, { type, payload } = {}) => {
  switch(type) {
    case addQuestion.type:
      return { ...state, [payload.id]: payload }
    case answerQuestion.type: {
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          status: payload.status
        }
      }
    }
    default:
      return state
  }
}

const addQuestion = ({
  id = uuid(),
  timestamp = Date.now(),
  question = "",
  askee = "",
  status = "Unanswered",
} = {}) => ({
  type: addQuestion.type,
  payload: {
    id,
    timestamp,
    question,
    askee,
    status,
  },
});
addQuestion.type = "rejection/addQuestion";

const answerQuestion = ({ id, status } = {}) => ({
  type: answerQuestion.type,
  payload: {
    id,
    status,
  },
});
answerQuestion.type = "rejection/answer";

export { addQuestion, answerQuestion };


export default reducer
