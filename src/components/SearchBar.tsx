import React, { useState } from 'react'

const SearchBar: React.FC = () => {
  const [value, setValue] = useState('')

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }
  
  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    console.log(value)
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search movies:
        <input id='searchbar' type='text' name='search' placeholder='search' onChange={handleChange}></input>
      </label>
      <input type='submit' value='Search' />
    </form>
  )
}

export default SearchBar