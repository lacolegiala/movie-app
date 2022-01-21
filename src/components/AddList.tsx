import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { tmdbApiClient } from '../utils/tmdbApiClient';

const AddList: React.FC = () => {
  const [listName, setListName] = useState('');

  const history = useHistory();

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const list = {
        name: listName,
        description: '',
        language: 'en',
      };
      await tmdbApiClient.post('list', list);
      history.push('/lists');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListName(event.target.value);
  };

  return (
    <div className="Container">
      <h1>Add a new list</h1>
      <form onSubmit={handleSubmit}>
        Name of the list
        <input className="Input" value={listName} onChange={handleChange} />
        <button className="SecondaryButton ListSubmitButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddList;
