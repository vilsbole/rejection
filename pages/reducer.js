import { addQuestion, answerQuestion, deleteQuestion } from "./actions";
import produce from "immer";

const reducer = produce((draft, { type, payload } = {}) => {
  switch (type) {
    case addQuestion.type: {
      draft[payload.id] = payload;
      return;
    }
    case answerQuestion.type: {
      draft[payload.id].status = payload.status;
      return;
    }
    case deleteQuestion.type: {
      delete draft[payload.id];
      return;
    }
    default:
      return;
  }
}, {});

export default reducer;
