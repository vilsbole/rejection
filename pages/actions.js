import { uuid } from "uuidv4";

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
addQuestion.type = "rejection/add";

const answerQuestion = ({ id, status } = {}) => ({
  type: answerQuestion.type,
  payload: {
    id,
    status,
  },
});
answerQuestion.type = "rejection/answer";

const deleteQuestion = (id) => ({
  type: deleteQuestion.type,
  payload: {
    id,
  },
});
deleteQuestion.type = "rejection/delete";

export { addQuestion, answerQuestion, deleteQuestion };
