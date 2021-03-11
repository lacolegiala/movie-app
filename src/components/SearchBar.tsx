import React from 'react'

type SearchBarProps = {
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {

  return (
    <div className='SearchBar'>
      <form onSubmit={props.handleSubmit}>
        <div className='SearchBar'>
          <input
            value={props.value} 
            className='Input'
            id='searchbar' 
            type='search' 
            name='search' 
            placeholder='Search movies' 
            onChange={props.handleChange}
          />
        </div>
      </form>
    </div>
  )
}

export default SearchBar  