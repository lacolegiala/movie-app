import React from 'react'
import { createImageUrl } from '../utils/imageUrl'
import { List, MovieDetails } from '../types'
import { createReleaseYear } from '../utils/releaseYear'

type SuccessProps = {
  movieData: MovieDetails
  sessionId: string | null
  lists: List[]
  addToList: (listId: number, movieId: number) => void
}

const MovieFullInfoSuccess: React.FC<SuccessProps> = (props: SuccessProps) => {

  const youtubeTrailer = props.movieData.videos.results.find(result => result.site === 'YouTube' && result.type === 'Trailer')

  return (
    <div className='PosterText'>
      <h1 className='SmallMargin'>{props.movieData.title}</h1>
      <p className='SmallMargin'>{createReleaseYear(props.movieData.release_date)}</p>
      <p className='SmallMargin'>{props.movieData.genres.slice(0, 3).map(genre => genre.name).join(', ')}</p>
      <img
        className='Poster'
        src={createImageUrl(props.movieData.poster_path, {width: 500})}
        alt='Poster of movie'
      />
      {props.sessionId && props.lists.length > 0 &&
        <div>
          <h2>Add to list</h2>
          {props.lists.map(list => 
            <button key={list.id} onClick={() => props.addToList(list.id, props.movieData.id)}>{list.name}</button>  
          )}
        </div>
      }
      <h2>Synopsis</h2> 
      <div>{props.movieData.overview}</div>
      {youtubeTrailer !== undefined &&
        <a href={`https://youtube.com/watch?v=${youtubeTrailer.key}`} rel='noreferrer' target='_blank'>Watch trailer</a>
      }
      <h2>Cast</h2>
      <div>
        {props.movieData.credits.cast.slice(0, 6).map(castMember => 
          <div key={castMember.id}>
            {castMember.name} as {castMember.character}
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieFullInfoSuccess
