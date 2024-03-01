import "./App.css";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import Control from "./components/Control";
import StoryContainer from "./components/StoryContainer";

import { createSlice } from "@reduxjs/toolkit";

import { configureStore } from "@reduxjs/toolkit";

//import {useDispatch, useSelector} from 'react-redux'

// const initialState = {count: 0};

// function countReducer(state=initialState, action) {
//   console.log("Dispatched...", state, action);
//   if(action.type === "counter/increment") {
//     return {
//       ...state,
//       count: state.count + 1
//     }
//   }else if(action.type === "counter/decrement") {
//     return {
//       ...state,
//       count: state.count - 1
//     }
//   }

//   return state;
// }

// const increment = () => (
//   {type: "counter/increment"}
// )

// const decrement = () => (
//   {type: "counter/decrement"}
// )

// const store = configureStore({reducer: countReducer});

// store.dispatch(increment());
// store.dispatch(increment());
// store.dispatch(increment());
// store.dispatch(decrement());

// console.log("State : ", store.getState());

// console.log(store);

// const getStateCounterValue = state => state.count;

// console.log("Current state : ", getStateCounterValue(store.getState()))

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByValue: (state, action) => {
      state.count += action.payload;
    },
    assignValue: (state, action) => {
      state.count = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

console.log(store.getState().counter);

store.dispatch(counterSlice.actions.increment());

store.dispatch(counterSlice.actions.increment());

store.dispatch(counterSlice.actions.increment());

store.dispatch(counterSlice.actions.decrement());

store.dispatch(counterSlice.actions.incrementByValue(10));

store.dispatch(counterSlice.actions.assignValue(20));

//const dispatch = store.dispatch;

// const dispatch = useDispatch();

// dispatch(counterSlice.actions.increment());

console.log(store.getState().counter);

console.log(store.getState().counter.count);

function App() {
  const [storyNum, setStoryNum] = useState(0);
  const [stories, setStories] = useState([]);
  const [totalNum, setTotalNum] = useState(0);

  function nextStory() {
    if (totalNum-1 > storyNum) {
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
    if (num < 1) num = 1;
    else if (num > totalNum) num = totalNum;
    setStoryNum(num - 1);

    console.log("Goto : " + num);
  }

  async function getStories() {
    const response = await fetch("http://localhost:4000/");
    const stories = await response.json();
    //console.log("Stories : ", stories);
    setStories(stories);
    //console.log("Lengthof stories from api : " +  stories.length)
    setTotalNum(() => Object.keys(stories).length);
    //console.group("Stories from root2 : " + stories[100].index)
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
