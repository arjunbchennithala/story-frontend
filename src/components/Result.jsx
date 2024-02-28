const Result = ({result, clicked}) => {
  
  return (
    <div className="singleresult" onClick={()=>clicked(result?.index)}>
        <h6>{result?.title}</h6>
    </div>
  )
}

export default Result