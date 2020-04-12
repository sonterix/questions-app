import React, { useState, useEffect } from 'react'
import FlipCard from './FlipCard'

const FlipCardList = () => {
  const [ flipCardList, setFlipCardList ] = useState([])

  const handleGetQuestions = async () => {
    try {
      const apiResponse = await fetch('https://opentdb.com/api.php?amount=10')
      const questions = await apiResponse.json()
      setFlipCardList(questions.results)
    } catch (error) {
      console.error(error)
    }
  } 

  useEffect(() => {
    handleGetQuestions()
  }, [])

  return (
    <div className="CardsWrapper">
      { flipCardList.map((flipCard, index) => <FlipCard key={ `${ index }_${ Math.random().toString(36).substr(2, 9) }` } card={ flipCard } />) }
    </div>
  )
}

export default FlipCardList
