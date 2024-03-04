import "./App.css";
import NavBar from "./components/NavBar";
import { useEffect } from "react";
import Control from "./components/Control";
import StoryContainer from "./components/StoryContainer";
import { selectSearchResults, setStories, setTotalNumStory } from "./slice";
import { useSelector, useDispatch } from "react-redux";
import ResultList from "./components/ResultList";



function App() {


  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResults);

  async function getStories() {
    const response = await fetch("http://localhost:4000/");
    const stories = await response.json();
    
    dispatch(setStories(stories))
    dispatch(setTotalNumStory(Object.keys(stories).length));
  }
  useEffect(() => {
    getStories();
  }, []);
  return (
    <div>
      <NavBar />
      <StoryContainer />
      {searchResults.length > 0 && <ResultList />}
      <Control/>
    </div>
  );
}

export default App;
