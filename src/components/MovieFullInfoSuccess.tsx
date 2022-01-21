import React, { useRef } from 'react'
import { createImageUrl } from '../utils/imageUrl'
import { List, MovieDetails } from '../types'
import { createReleaseYear } from '../utils/releaseYear'
import ScrollButtons from './ScrollButtons'
import { Link } from 'react-router-dom'

type SuccessProps = {
  movieData: MovieDetails
  sessionId: string | null
  lists: List[]
  addToList: (listId: number, movieId: number) => void
}

const MovieFullInfoSuccess: React.FC<SuccessProps> = (props: SuccessProps) => {
  const castListElement = useRef<HTMLDivElement | null>(null)

  const youtubeTrailer = props.movieData.videos.results.find(result => result.site === 'YouTube' && result.type === 'Trailer')

  return (
    <div className='PosterText'>
      <div
        className='BackgroundIndividual'
        style={
          {backgroundImage: `linear-gradient(to bottom, rgba(227, 226, 226, 0), rgba(28, 27, 27, 0.90)), url(${createImageUrl(props.movieData.backdrop_path, {width: 1280})})`}
        }>
      </div>
      <div className='Container'>
        <div className='FullInfoPosterText'>
          {props.movieData.poster_path &&
            <img
              className='FullInfoPoster'
              src={createImageUrl(props.movieData.poster_path, {width: 185})}
              alt='Poster of movie'
            />
          }
          {!props.movieData.poster_path &&
            <div className='FullInfoNoPoster'>No poster available</div>
          }
          <div className='FullInfoTitle'>
            <h1 className='SmallMargin'>{props.movieData.title}</h1>
            <p className='SmallMargin'>{createReleaseYear(props.movieData.release_date)}</p>
            <p className='SmallMargin'>{`${props.movieData.vote_average} / 10`}</p>
            <p className='SmallMargin'>{props.movieData.genres.slice(0, 3).map(genre => genre.name).join(', ')}</p>
          </div>
        </div>
        {props.sessionId && props.lists.length > 0 &&
          <div>
            <h2>Add to list</h2>
            {props.lists.map(list => 
              <button className='SecondaryButton' key={list.id} onClick={() => props.addToList(list.id, props.movieData.id)}>{list.name}</button>  
            )}
          </div>
        }
        <h2>Synopsis</h2> 
        <div>{props.movieData.overview}</div>
        {youtubeTrailer !== undefined &&
          <a className='PrimaryButton TrailerButton' href={`https://youtube.com/watch?v=${youtubeTrailer.key}`} rel='noreferrer' target='_blank'>Watch trailer</a>
        }
        <div className='ScrollListHeader'>
          <h2>Cast</h2>
          <ScrollButtons listElement={castListElement} scrollDistance={120}></ScrollButtons>
        </div>
        <div ref={castListElement} className='ActorGrid'>
          {props.movieData.credits.cast.map(castMember => 
            <Link className='ActorProfile' key={castMember.id} to={`/actors/${castMember.id}`}>
              {castMember.profile_path ?
                <img
                  src={createImageUrl(castMember.profile_path, {width: 300})}
                  alt={castMember.name}
                  className='ActorProfilePicture  '
                />
              : 
                <div className='NoProfileCard'>No photo available</div>
              }
              <h3 className='ActorName'>{castMember.name}</h3>
              <h4 className='ActorCharacterText'>{castMember.character}</h4>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieFullInfoSuccess
