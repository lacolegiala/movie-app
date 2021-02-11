import React, { useState } from 'react'

const AddList: React.FC = () => {
  const [listName, setListName] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListName(event.target.value)
  }

  return (
    <div>
      <h1>Add a new list</h1>
      <form>
        Name of the list
        <input value={listName} onChange={handleChange}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddList