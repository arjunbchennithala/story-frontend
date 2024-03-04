import { useState, useMemo } from "react";
import { TextField, Paper, Typography } from "@mui/material";
import { Button } from "@mui/base";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";

import {
  selectCurrentStory,
  selectStories,
  selectTotalNumStory,
  setCurrentStory,
  setSearchResults,
  setSearchQuery,
  selectSearchQuery
} from "../slice";

const Control = () => {

  const [goto, setGoto] = useState("");

  const dispatch = useDispatch();
  
  const currentStoryNum = useSelector(selectCurrentStory);
  const totalNumStory = useSelector(selectTotalNumStory);
  const stories = useSelector(selectStories);
  const searchQuery = useSelector(selectSearchQuery);

  useMemo(() => {
    const text = searchQuery.toLowerCase().trim();

    const result = text==="" ? [] : stories.filter((story) => {
      return story.title.toLowerCase().includes(text); //(story.title.toLowerCase().search(text) > -1);
    });

    dispatch(setSearchResults(result));
  }, [searchQuery]);

 function next() {
    if (totalNumStory-1 > currentStoryNum) {
      dispatch(setCurrentStory(currentStoryNum + 1));
    }
  }

  function prev() {
    if (currentStoryNum !== 0) {
      dispatch(setCurrentStory(currentStoryNum-1));
    }
  }

  function gotoProcess(num) {
    if (num < 1) num = 1;
    else if (num > totalNumStory) num = totalNumStory;
    dispatch(setCurrentStory(num-1))
  }

  function handleGotoChange(event) {
    setGoto(event.target.value)
  }

  function onkeydown(e) {
    if (e.key === "Enter") {
      gotoProcess(parseInt(goto));
      setGoto("");
      e.target.blur();
    }
  }


  function handleSearchQueryChange(event) {
    dispatch(setSearchQuery(event.target.value));
  }

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px",
      }}
      elevation={20}
    >

      <TextField
        onChange={(event) => {
          handleSearchQueryChange(event);
        }}
        name="query"
        label="Search for a story"
        type="search"
        value={searchQuery}
      />
      <Button onClick={prev}>
        {" "}
        <ArrowBackIcon />{" "}
      </Button>
      <Typography variant="h6">
        {currentStoryNum+1}/{totalNumStory}
      </Typography>
      <Button onClick={next}>
        {" "}
        <ArrowForwardIcon />{" "}
      </Button>
      <TextField
        onChange={(event) => {
          handleGotoChange(event);
        }}
        name="goto"
        label="GoTo #"
        type="number"
        value={goto}
        onKeyDown={(e) => {
          onkeydown(e);
        }}
      />
    </Paper>
  );
};

export default Control;
