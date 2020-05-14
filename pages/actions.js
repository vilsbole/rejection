import { uuid } from 'uuidv4'

const addQuestion = ({
  id = uuid(),
  timestamp = Date.now(),
  question = '',
  askee = '',
  status = 'Unanswered'
} = {}) => ({
  type: addQuestion.type,
  payload: {
    id,
    timestamp,
    question,
    askee,
    status
  }
});
addQuestion.type = 'rejection/addQuestion';

const answerQuestion = ({
  id,
  status,
} = {}) => ({
  type: answerQuestion.type,
  payload: {
    id,
    status
  }
})
answerQuestion.type = 'rejection/answer'

export {
  addQuestion,
  answerQuestion
}
