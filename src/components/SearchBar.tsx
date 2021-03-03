import React from 'react'

type SearchBarProps = {
  value: string | undefined
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {

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