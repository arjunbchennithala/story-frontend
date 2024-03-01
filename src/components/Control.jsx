import ResultList from './ResultList';
import { useState, useMemo } from 'react';
import { TextField, Paper, Typography } from '@mui/material';
import { Button } from '@mui/base';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Control = ({next, prev, goto, stories, count}) => {
  const [formValues, setFormValues] = useState({query: "", goto: ""});

  const searchResults = useMemo(()=>{
    const text = formValues.query.toLowerCase();

    if(text === "") //Checking for cleared inputbox
      return [];

    const result = stories.filter((story)=>{
      return story.title.toLowerCase().includes(text);  //(story.title.toLowerCase().search(text) > -1);  
    });
     return result;
  }, [formValues.query])

  function handleResultClick(index) {
    goto(index+1);
    setFormValues((previousVal)=>({...previousVal, query: "", }));
  }

  function gotoProcess() {
    goto(parseInt(formValues.goto));
    setFormValues((previousVal)=>({...previousVal, goto: "", }));
  }

  function handleChange(event) {
    setFormValues((previousVal)=>({...previousVal, [event.target.name]: event.target.value, }));
  }

  function onkeydown(e) {
    if(e.key === "Enter") {
      gotoProcess();
      e.target.blur();
    }
  }

  return (
    <Paper sx={{
      position: "fixed",
      bottom: "0",
      left: "0",
      right: "0",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "5px"
    }} elevation={2}>
      {searchResults.length > 0 && <ResultList results={searchResults} clicked={handleResultClick}/>}

      <TextField onChange={(event)=>{handleChange(event)}}  name="query" label="Search for a story" type="search" value={formValues.query}/>
      <Button onClick={prev}> <ArrowBackIcon /> </Button>
      <Typography variant="h6" >{count.currentStory}/{count.totalNumStory}</Typography>
      <Button onClick={next}> <ArrowForwardIcon /> </Button>

      <TextField onChange={(event)=>{handleChange(event)}}  name="goto" label="GoTo #" type="number" value={formValues.goto} onKeyDown={(e)=>{onkeydown(e)}}/>
    </Paper>
  )
}

export default Control