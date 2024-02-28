import ResultList from './ResultList';
import { useState, useMemo } from 'react';

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

  return (
    <div className='controlscontainer'>
      {searchResults.length > 0 && <ResultList results={searchResults} clicked={handleResultClick}/>}

      <div className="search">
        <input type="search" name="query" id="query" placeholder="Search for a story" value={formValues.query} onChange={(e)=>{handleChange(e)}}/>
      </div>
      <div className="buttons">
        <button onClick={prev} className='button'>{'<<<'}</button>
        <h6 className='currentNumber'>{count.currentStory}/{count.totalNumStory}</h6>
        <button onClick={next} className='button'>{'>>>'}</button>
      </div>
      <div className="goto">
        <input type="number" name="goto" id="storyNumber" placeholder='GoTo #' value={formValues.goto} onChange={(e)=>{handleChange(e)}} />
        <button onClick={()=>{gotoProcess()}}>GoTo</button>
      </div>
    </div>
  )
}

export default Control