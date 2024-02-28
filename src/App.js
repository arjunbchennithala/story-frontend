import "./App.css";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import Control from "./components/Control";
import StoryContainer from "./components/StoryContainer";

function App() {
  const [storyNum, setStoryNum] = useState(0);
  const [stories, setStories] = useState([]);
  const [totalNum, setTotalNum] = useState(0);
  //const [convertedStories, setConvertedStories] = useState([]);

  // var convertedStories = [];

  function nextStory() {
    if (totalNum > storyNum) {
      setStoryNum(() => storyNum + 1);
    }
  }

  function previousStory() {
    if (storyNum !== 0) {
      setStoryNum(() => storyNum - 1);
    }
  }

  function gotoStory(num) {
    console.log("GotoStory", num);
    if(num<1)
      num = 1;
    else if(num > totalNum)
      num = totalNum;
    setStoryNum(num-1);

    console.log("Goto : "+num);
  }

  // useEffect(()=>{
  //   convertedStories = stories.map(story=>story.title.toLowerCase());
  // }, [stories])

  function search(text, setResults) {
    console.log("Searched for : " + text);
    if(text === ""){
      console.log("Empty reached");
      //setResults(()=>([]));
    }
    //var convertedStories = stories?.map(story=>story.title.toLowerCase());

    var result = stories.filter((story)=>((story.title.search(text) > -1)&&story));
    // var result2 = result.map(oneresult=>({title:oneresult.title, id:}));

    var resultsToReturn = [];

    for(var i=0; i<result.length; i++) {
      resultsToReturn.push({index: i, title: result[i].title});
      // console.log("Index : " + resultsToReturn[i].index);
    }
    setResults(result);
  }

  async function getStories() {
    const response = await fetch(
      "https://shortstories-api.onrender.com/stories"
    );
    const stories = await response.json();
    console.log("Typof stories from api : " +  stories.length)
    setTotalNum(() => Object.keys(stories).length);
    console.group("Stories from root : " +  stories.length);
    setStories(stories.map((story, index)=>({...story, index})));
    console.group("Stories from root2 : " + stories[100].index)
  }
  useEffect(() => {
    getStories();
  }, []);
  return (
    <div>
      <NavBar />
      <StoryContainer story={stories[storyNum]} />
      
      <Control
        next={nextStory}
        prev={previousStory}
        goto={gotoStory}
        search={search}
        stories={stories}
        count={{
          currentStory: totalNum > 0 ? storyNum + 1 : storyNum,
          totalNumStory: totalNum,
        }}

      />
    </div>
  );
}


export default App;
