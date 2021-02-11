import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { tmdbApiClient } from '../tmdbApiClient'
import { ListDetails } from '../types'

const List: React.FC = () => {
  const [list, setList] = useState<ListDetails | undefined>()

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

  return (
    <div>
      {list !== undefined ?
        <div>
          <h1>{list.name}</h1>
          {list.item_count > 0 ?
            list.items.map(item =>
              <li key={item.id}>{item.title}</li>  
            )
            : <div>No items yet</div>
          }
          <button>Delete</button>
        </div>
        : <h1>Loading</h1>
      }
    </div>
  )
}

export default List