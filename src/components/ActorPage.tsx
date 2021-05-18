import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PersonDetails } from '../types'
import { createImageUrl } from '../utils/imageUrl'
import { tmdbApiClient } from '../utils/tmdbApiClient'

type Success = {
  type: 'success'
  data: PersonDetails
}

type Loading = {
  type: 'loading'
}

type ErrorData = {
  type: 'error'
}

type Case = Success | Loading | ErrorData

const ActorPage = () => {
  const [appCase, setAppCase] = useState<Case>({type: 'loading'})

  const {id} = useParams<{id: string}>()

  const getActorInfo = useCallback(
    async () => {
      try {
        const personInfo = await tmdbApiClient.get(`person/${id}`)
        setAppCase({type: 'success', data: personInfo.data})
      }
      catch (error) {
        setAppCase({type: 'error'})
        console.error(error)
      }
    },
    [id]
  )

  useEffect(() => {
    getActorInfo()
  }, [getActorInfo])

  return (
    <div className='Container'>
      {appCase.type ==='success' &&
        <div>
          <h1>{appCase.data.name}</h1>
          {appCase.data.profile_path &&
            <img
            src={createImageUrl(appCase.data.profile_path, {width: 300})}
            alt='Actor'
            />
          }
          {appCase.data.birthday &&
            <div>
              <h2>Date of birth</h2>
              <div>{appCase.data.birthday}</div>
            </div>
          }
          {appCase.data.deathday &&
            <div>
              <h2>Date of death</h2>
              <div>{appCase.data.deathday}</div>
            </div>
          }
          <h2>Biography</h2>
          <div className='ActorInfo'>{appCase.data.biography}</div>
        </div>
      }
    </div>
  )
}

export default ActorPage