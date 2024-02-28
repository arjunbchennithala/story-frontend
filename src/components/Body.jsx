import React from 'react'
import StoryContainer from './StoryContainer'

const Body = ({stories}) => {
  return (
    <>
    <div className='maincontainer'>
        {stories?.map(story => (
            <StoryContainer story={story} />
        ))}
    </div>
    

    </>
  )
}

export default Body