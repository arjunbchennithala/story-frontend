import Result from "./Result"

const ResultList = ({results, clicked}) => {
  //console.log(results.length);
  //console.log(results);
    return (
    <div className="resultbox">
      {results.map(result=><Result result={result} clicked={clicked}/>)}
    </div>
  )
}

export default ResultList