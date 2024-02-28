
const StoryContainer = ({story}) => {
  return (
    <div className="storycontainer">
        <h1>{story?.title}</h1>
        <h3>{story?.story}</h3>
        {story&&<h4>Moral : {story?.moral}</h4>}
    </div>
  )
}

export default StoryContainer