import Result from "./Result"
import { useSelector} from "react-redux";
import { selectSearchResults} from "../slice";
import { Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  resultbox: {
    width: "220px",
    maxHeight: "150px",
    minHeight: "fit-content",
    marginLeft: "-59px",
    marginBottom: "72px",
    position: "fixed",
    overflow: "auto",
    bottom: "0px",
  }
})

const ResultList = () => {
  const classes = useStyle();
  const searchResults = useSelector(selectSearchResults);
    return (
    <Paper elevation={10} className={classes.resultbox}>
      {searchResults.map(result=><Result key={result.index} result={result}/>)}
    </Paper>
  )
}

export default ResultList