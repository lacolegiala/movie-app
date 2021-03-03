import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

type SearchBarProps = {
  value: string | undefined
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
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
    <form onSubmit={props.handleSubmit}>
      <label>
        <input className='Input' id='searchbar' type='search' name='search' placeholder={props.value} onChange={props.handleChange} />
      </label>
      <input type='submit' value='Search' />
    </form>
  )
}

export default SearchBar  