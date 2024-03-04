import { useDispatch} from "react-redux";
import { setCurrentStory, setSearchQuery } from "../slice";
import { ListItemButton, ListItemText } from "@mui/material";


const Result = ({result}) => {
  function selectNewStory() {
    dispatch(setCurrentStory(result.index));
    dispatch(setSearchQuery(""));
  }
  const dispatch = useDispatch();
  return (
    <ListItemButton onClick={selectNewStory} >
       <ListItemText primary={result?.title} />
    </ListItemButton>

  )
}

export default Result