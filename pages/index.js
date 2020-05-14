import React, { useReducer } from 'react'
import Head from 'next/head'
import { addQuestion, answerQuestion } from './actions'
import reducer from './reducer'

const createDispatch = (dispatch, action) => args => {
  dispatch(action(args))
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, reducer())
  const createQuestion = createDispatch(dispatch, addQuestion)
  const updateQuestion = createDispatch(dispatch, answerQuestion)


  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.target);
    const question = form.get("question");
    const askee = form.get("askee");
    createQuestion({ question, askee })
    e.target.reset()
  }

  const handleAnswer = (question, status) => {
    updateQuestion({ id: question.id, status })
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Rejection App</h1>
        <div className="description">You got to loose to win!</div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input name="question" type="text" placeholder="Question" />
            <input name="askee" type="text" placeholder="Askee" />
            <button className="button" type="submit">
              Add
            </button>
          </form>
        </div>
        <div style={{ width: '100%', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid'}}>

          {state.map((q, idx) => (
            <div className="card" key={idx}>
              <div style={{ marginBottom: '0.5rem' }}>
                {q.question} <br />
                {q.askee} <br />
                {q.status}
              </div>
              <button onClick={() => handleAnswer(q, "Accepted")}>
                Accepted
              </button>
              <span>{' '}</span>
              <button onClick={() => handleAnswer(q, "Rejected")}>
                Rejected
              </button>
            </div>

          ))}

        </div>
      </main>

      <footer>
        <a
          href="https://github.com/vilsbole/rejection"
          target="_blank"
          rel="noopener noreferrer"
        >
          source{" "}
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 5rem;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 3rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .form {
          margin-top: 2rem;
          width: 100%;
        }
        .form > form {
          display: flex;
          flex-direction: column;
        }
        .button {
          padding: 0.5rem;
        }
        input {
          width: 100%;
          height: 2rem;
          margin-bottom: 1rem;
          padding: 1rem;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          width: 100%;
          flex-basis: 45%;
          margin-bottom: 1rem;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        button,
        input {
          font-size: 1rem;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
