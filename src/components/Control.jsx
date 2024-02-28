import ResultList from './ResultList';
import { useState, useMemo } from 'react';

const Control = ({next, prev, goto, search, stories, count}) => {
  const [formValues, setFormValues] = useState({query: "", goto: ""});
  const searchResults = useMemo(()=>{
    const text = formValues.query.toLowerCase();

    const result = stories.filter((story)=>{
      return story.title.toLowerCase().includes(text);
    });
    console.group("searchResults : Typeof " + typeof result.index);
     return result;
  }, [formValues.query])

  //console.log("searchResults : " + searchResults);
  // const [results, setResults] = useState([]);

  // function searchProcess(val) {
  //   search(formValues.query, setResults);
  //   if(val)
  //     setFormValues((previousVal)=>({...previousVal, query: "", }));
  // }

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

  console.log(formValues.query, searchResults);

  return (
    <div className='controlscontainer'>
      {searchResults.length > 0 && <ResultList results={searchResults} clicked={handleResultClick}/>}

      <div className="search">
        <input type="search" name="query" id="query" placeholder="Search for a story" value={formValues.query} onChange={(e)=>{handleChange(e)}}/>
        {/* <button onClick={()=>{searchProcess(true)}}>Search</button> */}
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