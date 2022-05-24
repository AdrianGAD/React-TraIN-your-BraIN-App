import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FetchButton from './FetchButton'

function FinalScreen() {
  const score = useSelector((state) => state.score)

  const questionAmount = useSelector(
    (state) => state.options.amount_of_questions
  )

  const dispatch = useDispatch()

  const replay = () => {
    dispatch({
      type: 'SET_INDEX',
      index: 0,
    })

    dispatch({
      type: 'SET_SCORE',
      score: 0,
    })
  }

  const settings = () => {
    dispatch({
      type: 'SET_QUESTIONS',
      questions: [],
    })

    dispatch({
      type: 'SET_SCORE',
      score: 0,
    })
  }

  return (
    <div>
      <h3>Correct Answers: {score} / {questionAmount}</h3>
      <button onClick={replay}>Try again</button>
      <FetchButton text="Try new/oder questions" />
      <button onClick={settings}>Back to main settings</button>
    </div>
  )
}
export default FinalScreen