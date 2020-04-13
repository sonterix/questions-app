import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const FlipCardHeader = ({ handleSubmit }) => {
  const [ categories, setСategories ] = useState([])

  const categorySelect = useRef()
  const numberInput = useRef()

  const handleGetCategories = async () => {
    const categoriesResponse = await fetch('https://opentdb.com/api_category.php')
    const categories = await categoriesResponse.json()

    setСategories(categories.trivia_categories)
  }

  useEffect(() => {
    handleGetCategories()
  }, [])

  return (
    <header>
      <form className="wrapper HeaderForm" onSubmit={ event => handleSubmit(event, categorySelect, numberInput) }>
        <label>
          <span>Category</span>
          <select name="category" ref={ categorySelect }>
            { categories.map(category => <option key={ category.id } value={ category.id }>{ category.name }</option>) }
          </select>
        </label>
        <label>
          <span>Number of questions</span>
          <input type="number" placeholder="10" min="1" step="1" defaultValue="10"  ref={ numberInput } />
        </label>
        <button type="submit">Generate</button>
      </form>
    </header>
  )
}

FlipCardHeader.propTypes = {
  handleSubmit: PropTypes.func
}

FlipCardHeader.defaultProps = {
  handleSubmit: () => {}
}

export default FlipCardHeader
