import React, { useCallback, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { createImageUrl } from '../utils/imageUrl'
import { tmdbApiClient } from '../utils/tmdbApiClient'
import { ListDetails } from '../types'
import { createReleaseYear } from '../utils/releaseYear'

type Success = {
  type: 'success'
  data: ListDetails
}

type Loading = {
  type: 'loading'
}

type ErrorData = {
  type: 'error'
}

type Case = Success | Loading | ErrorData

const List: React.FC = () => {
  const [listState, setListState] = useState<Case>({type: 'loading'})

  const history = useHistory()

  const {id} = useParams<{id: string}>()

  const getListDetails = useCallback(
    async () => {
      try {
        const detailsResponse = await tmdbApiClient.get(`list/${id}`)
        setListState({type: 'success', data: detailsResponse.data})
      } catch (error) {
        setListState({type: 'error'})
        console.log(error)
      }
    },
    [id]
  ) 

  useEffect(() => {
    getListDetails()
  }, [getListDetails])

  const deleteList = async () => {
    try {
      if (listState.type === 'success') {
        if (window.confirm(`Delete list ${listState.data.name}?`)) {
          await tmdbApiClient.delete(`list/${id}`)
          history.push('/lists')
        }
      }
      // The endpoint returns 500 for some reason, but the deleting still works.
      // That's why catch also pushes user back to the list of lists.
      // TMDB's problem, not mine 🤷‍♀️  https://www.themoviedb.org/talk/5cb730900e0a266b9bef1f3b?language=fr-FR
    } catch (error) {
      history.push('/lists')
    }
  }

  const deleteMovie = async (movieId: number, movieName: string) => {
    try {
      if (window.confirm(`Delete ${movieName}?`)) {
        await tmdbApiClient.post(`list/${id}/remove_item`, {media_id: movieId})
        getListDetails()
      }
    } catch (error) {
      setListState({type: 'error'})
    }
  }

  return (
    <div className='Container'>
      {listState.type === 'success' &&
        <div>
          <h1>{listState.data.name}</h1>
          <button className='SecondaryButton DeleteButton' onClick={deleteList}>Delete list</button>
          <div className='GridWrapper'>
            {listState.data.item_count > 0 ?
              listState.data.items.map(item =>
                <div key={item.id}>
                  <Link className='PosterText' to={`/movies/${item.id}`}>
                    <img
                      className='Poster'
                      src={createImageUrl(item.poster_path, {width: 300})}
                      alt='Poster of movie'
                    />
                    <h2 className='SmallMargin'>{item.title}</h2>
                    <p className='SmallMargin'>{createReleaseYear(item.release_date)}</p>
                  </Link>
                  <button onClick={() => deleteMovie(item.id, item.title)}>Delete</button>
                </div>  
              )
              : <div>No items yet</div>
            }
          </div>
          <hr />
        </div>
      }
      {listState.type === 'loading' &&
        <h1>Loading</h1>
      }
      {listState.type === 'error' &&
      <div>
        <h1>Something went wrong. Try again or check that the id is correct.</h1>
        <button onClick={getListDetails}>Try again</button>
      </div>
      }
    </div>
  )
}

export default List