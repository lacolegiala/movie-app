import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { createPosterUrl } from '../imageUrl'
import { tmdbApiClient } from '../tmdbApiClient'
import { ListDetails } from '../types'

const List: React.FC = () => {
  const [list, setList] = useState<ListDetails | undefined>()

  const history = useHistory()

  const {id} = useParams<{id: string}>()

  useEffect(() => {
    const getListDetails = async () => {
      try {
        const detailsResponse = await tmdbApiClient.get(`list/${id}`)
        setList(detailsResponse.data)
      } catch (error) {
        console.log(error)
      }
    }
    getListDetails()
  }, [id])

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
      {list !== undefined ?
        <div>
          <h1>{list.name}</h1>
          {list.item_count > 0 ?
            list.items.map(item =>
              <div key={item.id}>
                <Link to={`/movies/${item.id}`}>
                  <h2>{item.title}</h2>
                  <img
                    src={createPosterUrl(item.poster_path, {width: 300})}
                    alt='Poster of movie'
                 />
                </Link>
              </div>  
            )
            : <div>No items yet</div>
          }
          <hr />
          <button onClick={deleteList}>Delete list</button>
        </div>
        : <h1>Loading</h1>
      }
    </div>
  )
}

export default List