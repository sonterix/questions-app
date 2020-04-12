import React, { useState } from 'react'
import PropTypes from 'prop-types'

const decodeText = text => {
  const textArea = document.createElement('textarea')
  textArea.innerHTML = text
  return textArea.value
}

const FlipCard = ({ card }) => {
  const [ flip, setFlip ] = useState(false)
  const { question, correct_answer, incorrect_answers } = card
  const answers = [ ...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5)

  return (
    <div className={ `Card ${ flip && 'Fliped' }` } onClick={ () => setFlip(flip => !flip) }>
      <div className="CardFront">
        <div className="Question">
          { decodeText(question) }
        </div>
        <ul className="Answers">
          { answers.map((answer, index) => <li key={ `${ index }_${ Math.random().toString(36).substr(2, 9) }` }>{ decodeText(answer) }</li>) }
        </ul>
      </div>
      <div className="CardBack">
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