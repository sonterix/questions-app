import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const FlipCard = ({ card }) => {
  const [ flip, setFlip ] = useState(false)
  const [ height, setHeight ] = useState('initial')

  const { question, correct_answer, incorrect_answers } = card
  const answers = [ ...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5)

  const cardFront = useRef()
  const cardBack = useRef()

  const decodeText = text => {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = text
    return textArea.value
  }

  const setMaxHeight = () => {
    const cardFrontHeight = cardFront.current.getBoundingClientRect().height
    const cardBackHeight = cardBack.current.getBoundingClientRect().height

    setHeight(Math.max(cardFrontHeight, cardBackHeight, 100))
  }

  useEffect(setMaxHeight, [question, correct_answer, incorrect_answers])

  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])

  return (
    <div
      className={ `Card ${ flip ? 'Fliped' : '' }` }
      style={{ height: height }} 
      onClick={ () => setFlip(flip => !flip) }
    >
      <div className="CardFront" ref={ cardFront }>
        <div className="Question">
          { decodeText(question) }
        </div>
        <ul className="Answers">
          { answers.map((answer, index) => <li key={ `${ index }_${ Math.random().toString(36).substr(2, 9) }` }>{ decodeText(answer) }</li>) }
        </ul>
      </div>
      <div className="CardBack" style={{ height: height }} ref={ cardBack }>
        { decodeText(correct_answer) }
      </div>
    </div>
  )
}

FlipCard.propTypes = {
  card: PropTypes.shape({
    question: PropTypes.string,
    incorrect_answers: PropTypes.array,
    correct_answer: PropTypes.string
  })
}

FlipCard.defaultProps = {
  card: {
    question: 'Some question?',
    incorrect_answers: [],
    correct_answer: 'Answer'
  }
}

export default FlipCard