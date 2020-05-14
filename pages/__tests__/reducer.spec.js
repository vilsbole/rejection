import { describe } from 'riteway';
import { map, sortBy, prop } from 'ramda';
import reducer from '../reducer'
import { addQuestion, answerQuestion } from '../actions'

const createState = ({ questions }) => questions;
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
    expected: [],
  });

  assert({
    given: 'a question to add',
    should: 'add the question to state',
    actual: reducer(reducer(), addQuestion(questions[0])),
    expected: createState({ questions: [questions[0]] })
  })

  assert({
    given: "an answer to a question",
    should: "update the question with the correct status",
    actual: sortById(
      reducer(
        createState({ questions }),
        answerQuestion({
          id: questions[0].id,
          status: 'rejected'
        })
      )
    ),
    expected: sortById(
      createState({
        questions: [
          {
            ...questions[0],
            status: 'rejected'
          },
          ...questions.slice(1, questions.length)
        ]
      })
    )
  });
})
