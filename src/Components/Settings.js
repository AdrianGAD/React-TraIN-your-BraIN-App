import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FetchButton from './FetchButton'

function Settings() {
  const [options, setOptions] = useState(null)

  const loading = useSelector((state) => state.options.loading)

  const questionCategory = useSelector(
    (state) => state.options.question_category
  )
  const questionDifficulty = useSelector(
    (state) => state.options.question_difficulty
  )
  const questionAmount = useSelector(
    (state) => state.options.amount_of_questions
  )

  const dispatch = useDispatch()

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`

    const handleLoadingChange = (value) => {
      dispatch({
        type: 'CHANGE_LOADING',
        loading: value,
      })
    }

    handleLoadingChange(true)

    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        handleLoadingChange(false)
        setOptions(response.trivia_categories)
      })
  }, [setOptions, dispatch])

  const handleCategoryChange = (event) => {
    dispatch({
      type: 'CHANGE_CATEGORY',
      question_category: event.target.value,
    })
  }

  const handleDifficultyChange = (event) => {
    dispatch({
      type: 'CHANGE_DIFFICULTY',
      question_difficulty: event.target.value,
    })
  }

  const handleAmountChange = (event) => {
    dispatch({
      type: 'CHANGE_AMOUNT',
      amount_of_questions: event.target.value,
    })
  }

  if (!loading) {
    return (
      <div>
        <h1>Tra<u>IN</u> Your Bra<u>IN</u></h1> 
        <div>
          <h2>Select a domain :</h2>
          <select value={questionCategory} onChange={handleCategoryChange}>
            <option>Click to select</option>
            {options &&
              options.length &&
              options.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <h2>Level of Practice :</h2>
          <select value={questionDifficulty} onChange={handleDifficultyChange}>
            <option value="easy" key="difficulty-1">
              Easy
            </option>
            <option value="medium" key="difficulty-2">
              Medium
            </option>
            <option value="hard" key="difficulty-3">
              Hard
            </option>
          </select>
        </div>
        <div>
          <h2>How many Questions? <span>(max: 50)</span></h2>
          <input value={questionAmount} onChange={handleAmountChange} />
        </div>

        <FetchButton text="Start!" />
      </div>
    )
  }

  return <p>Loading...</p>
}
export default Settings