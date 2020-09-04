import { describe } from "riteway";
import { map } from "ramda";
import reducer from "./reducer";
import { addQuestion, answerQuestion, deleteQuestion } from "./actions";

const createState = ({ questions }) =>
  questions.reduce((acc, q) => ({ ...acc, [q.id]: q }), {});
const createQuestion = ({ ...props } = {}) => addQuestion(props).payload;

const seed = [
  {
    question: "May I have another baggel?",
    askee: "Barista",
  },
  {
    question: "May I have another car?",
    askee: "Paul",
  },
  {
    question: "May I have your watch?",
    askee: "John",
  },
  {
    question: "May I have your trophy?",
    askee: "Rick",
  },
];

// For each seed call the actionCreator and return a list of payloads
const questions = map((s) => addQuestion(s).payload, seed);

describe("Rejection Reducer", async (assert) => {
  assert({
    given: "no arguments",
    should: "return valid initial state",
    actual: reducer(),
    expected: {},
  });

  assert({
    given: "a question to add",
    should: "add the question to state",
    actual: reducer(reducer(), addQuestion(questions[0])),
    expected: createState({ questions: [questions[0]] }),
  });

  {
    const id = 1;
    const timestamp = Date.now();

    const updatedQuestion = addQuestion({
      id,
      timestamp,
      question: "May I have another baggel?",
      askee: "Barista",
      status: "Accepted",
    }).payload;

    const initialState = reducer(
      reducer(),
      addQuestion({
        id,
        timestamp,
        question: "May I have another baggel?",
        askee: "Barista",
      })
    );

    assert({
      given: "an answer to a question",
      should: "update the question with the correct status",
      actual: reducer(
        initialState,
        answerQuestion({
          id,
          status: "Accepted",
        })
      ),
      expected: createState({
        questions: [updatedQuestion],
      }),
    });
  }

  {
    const state = createState({
      questions: [createQuestion({ id: "foo" }), ...questions],
    });
    const { foo, ...expected } = state;

    assert({
      given: "a list of questions",
      should: "delete by id",
      actual: reducer(state, deleteQuestion("foo")),
      expected,
    });
  }
});
