import React from 'react'

type Props = {
  genreListElement: React.MutableRefObject<HTMLDivElement | null>
  scrollDistance: number
}

const ScrollButtons = (props: Props) => {

  return (
    <div>
      <button className='SecondaryButton' onClick={() =>
        props.genreListElement.current?.scrollBy({left: - props.scrollDistance, behavior: 'smooth'})}>Previous
      </button>
      <button className='SecondaryButton' onClick={() =>
        props.genreListElement.current?.scrollBy({left: props.scrollDistance, behavior: 'smooth'})}>Next
      </button>
    </div>
  )
}

export default ScrollButtons

