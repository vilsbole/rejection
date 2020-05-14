import { describe } from 'riteway';
import { map, sortBy, prop } from 'ramda';
import reducer, {addQuestion, answerQuestion } from './reducer'

const createState = ({ questions }) => questions.reduce((acc, q) => ({ [q.id]: q }), {});
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
const sortById = sortBy(prop('id'))
const questions = map(s => addQuestion(s).payload, seed)

describe('Rejection Reducer', async (assert) => {
  assert({
    given: "no arguments",
    should: "return valid initial state",
    actual: reducer(),
    expected: {},
  });

  assert({
    given: 'a question to add',
    should: 'add the question to state',
    actual: reducer(reducer(), addQuestion(questions[0])),
    expected: createState({ questions: [questions[0]] })
  })

  {
    const id = 1;
    const timestamp = Date.now();

    const updatedQuestion = addQuestion({
      id,
      timestamp,
      question: "May I have another baggel?",
      askee: "Barista",
      status: "Accepted"
    }).payload

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
})
