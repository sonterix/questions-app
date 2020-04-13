import React, { useState } from 'react'
import FlipCardList from './FlipCardList'
import FlipCardHeader from './FlipCardHeader'

const App = () => {

  const [ parameters, setParameters ] = useState('')

  const handleSubmit = (event, category, number) => {
    event.preventDefault()

    const { current: { value: amountValue } } = number
    const { current: { value: categoryValue } } = category
    setParameters(`amount=${ amountValue }&category=${ categoryValue }`)
  }

  return (
    <>
      <FlipCardHeader handleSubmit={ handleSubmit } />
      <FlipCardList parameters={ parameters } />
    </>
  )
}

export default App
