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
  const [appCase, setAppCase] = useState<Case>({type: 'loading'})

  const history = useHistory()

  const {id} = useParams<{id: string}>()

  const getListDetails = useCallback(
    async () => {
      try {
        const detailsResponse = await tmdbApiClient.get(`list/${id}`)
        setAppCase({type: 'success', data: detailsResponse.data})
      } catch (error) {
        setAppCase({type: 'error'})
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
      await tmdbApiClient.delete(`list/${id}`)
      history.push('/lists')
      // The endpoint returns 500 for some reason, but the deleting still works.
      // That's why catch also pushes user back to the list of lists.
      // TMDB's problem, not mine 🤷‍♀️  https://www.themoviedb.org/talk/5cb730900e0a266b9bef1f3b?language=fr-FR
    } catch (error) {
      history.push('/lists')
    }
  }

  return (
    <div className='Container'>
      {appCase.type === 'success' &&
        <div>
          <h1>{appCase.data.name}</h1>
          <div className='GridWrapper'>
            {appCase.data.item_count > 0 ?
              appCase.data.items.map(item =>
                <div key={item.id}>
                  <Link to={`/movies/${item.id}`}>
                    <img
                      className='Poster'
                      src={createImageUrl(item.poster_path, {width: 300})}
                      alt='Poster of movie'
                    />
                    <h2>{item.title} ({createReleaseYear(item.release_date)})</h2>
                  </Link>
                </div>  
              )
              : <div>No items yet</div>
            }
          </div>
          <hr />
          <button onClick={deleteList}>Delete list</button>
        </div>
      }
      {appCase.type === 'loading' &&
        <h1>Loading</h1>
      }
      {appCase.type === 'error' &&
      <div>
        <h1>Something went wrong. Try again or check that the id is correct.</h1>
        <button onClick={getListDetails}>Try again</button>
      </div>
      }
    </div>
  )
}

export default List