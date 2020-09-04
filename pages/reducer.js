import { addQuestion, answerQuestion, deleteQuestion } from "./actions";

const reducer = (state = {}, { type, payload } = {}) => {
  switch (type) {
    case addQuestion.type:
      return { ...state, [payload.id]: payload };
    case answerQuestion.type: {
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          status: payload.status,
        },
      };
    }
    case deleteQuestion.type:
      return { ...state, [payload.id]: undefined };
    default:
      return state;
  }
};

export default reducer;
