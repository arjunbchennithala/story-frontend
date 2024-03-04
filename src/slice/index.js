import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        stories: [],
        currentStory: 0,
        totalNumStory: 0,
        searchResults: [],
        query: ""
    },
    reducers: {
        setStories: (state, action) => {
            state.stories = action.payload
        },
        setCurrentStory: (state, action) => {
            state.currentStory = action.payload
        },
        setTotalNumStory: (state, action) => {
            state.totalNumStory = action.payload
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload
        },
        setSearchQuery: (state, action) => {
            state.query = action.payload
        }
    }
})

export const {setStories, setCurrentStory, setTotalNumStory, setSearchResults, setSearchQuery } = appSlice.actions
export const selectStories = (state) => state.stories
export const selectCurrentStory = (state) => state.currentStory
export const selectTotalNumStory = (state) => state.totalNumStory
export const selectSearchResults = (state) => state.searchResults
export const selectSearchQuery = (state) => state.query
export default appSlice.reducer