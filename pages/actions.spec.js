import { describe } from "riteway";
import { addQuestion, answerQuestion } from "./actions";

describe("addQuestion", async (assert) => {
  const item = {
    id: 1,
    timestamp: Date.now(),
    question: "where are you",
    status: "Unanswered",
    askee: "Bjorn Lomborg ",
  };

  // Question: How to test that the initial values of id and timestamp are defined?
  assert({
    given: "a question item",
    should: "returns a valid action",
    actual: addQuestion(item),
    expected: {
      type: addQuestion.type,
      payload: { ...item },
    },
  });
});

describe("answerQuestion", async (assert) => {
  const item = {
    id: 1,
  };

  // Question: How to test that the initial values of id and timestamp are defined?
  assert({
    given: "an id and a status",
    should: "returns a valid action",
    actual: answerQuestion({ id: item.id, status: "Answered" }),
    expected: {
      type: answerQuestion.type,
      payload: { id: item.id, status: "Answered" },
    },
  });
});
