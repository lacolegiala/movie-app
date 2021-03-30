import React from 'react'

type Props = {
  listElement: React.MutableRefObject<HTMLDivElement | null>
  scrollDistance: number
}

const ScrollButtons = (props: Props) => {

  return (
    <div>
      <button className='SecondaryButton ScrollButton' onClick={() =>
        props.listElement.current?.scrollBy({left: - props.scrollDistance, behavior: 'smooth'})}>Previous
      </button>
      <button className='SecondaryButton ScrollButton' onClick={() =>
        props.listElement.current?.scrollBy({left: props.scrollDistance, behavior: 'smooth'})}>Next
      </button>
    </div>
  )
}

export default ScrollButtons

