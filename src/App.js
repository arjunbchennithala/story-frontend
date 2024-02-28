import "./App.css";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import Control from "./components/Control";
import StoryContainer from "./components/StoryContainer";

function App() {
  const [storyNum, setStoryNum] = useState(0);
  const [stories, setStories] = useState([]);
  const [totalNum, setTotalNum] = useState(0);

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

  async function getStories() {
    const response = await fetch(
      "http://localhost:4000/"
    );
    const stories = await response.json();
    console.log("Stories : ", stories);
    setStories(stories);
    console.log("Lengthof stories from api : " +  stories.length)
    setTotalNum(() => Object.keys(stories).length);
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
