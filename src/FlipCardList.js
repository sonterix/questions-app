import React, { useState, useEffect } from 'react'
import FlipCard from './FlipCard'
import PropTypes from 'prop-types'

const FlipCardList = ({ parameters }) => {
  const [ flipCardList, setFlipCardList ] = useState([])

  const handleGetQuestions = async (parameters) => {
    if (parameters.length > 0) {
      try {
        const apiResponse = await fetch(`https://opentdb.com/api.php?${ parameters }`)
        const questions = await apiResponse.json()
        setFlipCardList(questions.results)
      } catch (error) {
        console.error(error)
      }
    }
  } 

  useEffect(() => {
    handleGetQuestions(parameters)
  }, [parameters])

  return (
    <div className="wrapper CardsWrapper">
      { flipCardList.map((flipCard, index) => <FlipCard key={ `${ index }_${ Math.random().toString(36).substr(2, 9) }` } card={ flipCard } />) }
    </div>
  )
}

FlipCardList.propTypes = {
  parameters: PropTypes.string
}

FlipCardList.defaultProps = {
  parameters: ''
}

export default FlipCardList
