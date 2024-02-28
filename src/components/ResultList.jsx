import Result from "./Result"

const ResultList = ({results, clicked}) => {
    return (
    <div className="resultbox">
      {results.map(result=><Result result={result} clicked={clicked}/>)}
    </div>
  )
}

export default ResultList