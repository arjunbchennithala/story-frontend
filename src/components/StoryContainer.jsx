import { useSelector } from "react-redux"

import { selectCurrentStory, selectStories } from "../slice"
import { useMemo } from "react";
import { Paper, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  storycontainer: {
    marginLeft: "200px",
    marginRight: "200px",
    marginTop: "65px",
    marginBottom: "65px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px"
  }
})

const StoryContainer = () => {
  const classes = useStyle();
  const stories = useSelector(selectStories);
  const currentStoryNum = useSelector(selectCurrentStory);
  const story = useMemo(()=>{
    return stories[currentStoryNum];
  }, [stories, currentStoryNum]);
  return (
    <Paper className={classes.storycontainer} style={{borderRadius: "100px", padding: "50px"}} elevation={20}>
      <Typography variant="h3" sx={{marginBottom: "20px"}}>{story?.title}</Typography>
      <Typography variant="h5">{story?.story}</Typography>
      {story && <Typography variant="h6" sx={{marginTop: "20px"}}>Moral : {story?.moral}</Typography>}
    </Paper>
  )
}

export default StoryContainer