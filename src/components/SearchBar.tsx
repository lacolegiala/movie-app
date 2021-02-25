import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [value, setValue] = useState('')
  const history = useHistory();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }
  
  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    history.push(`/search?query=${value}`)
    event.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input className='Input' id='searchbar' type='text' name='search' placeholder='search movies' onChange={handleChange}></input>
      </label>
      <input type='submit' value='Search' />
    </form>
  )
}

export default SearchBar