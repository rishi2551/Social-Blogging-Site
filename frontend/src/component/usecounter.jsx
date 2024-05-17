import React from "react";
import "./css/usecounter.css"
import { useSelector, useDispatch } from 'react-redux'
import { increment,decrement } from "./redux/reducers/counterslice";
const Usecounter=()=>{
    const {count} = useSelector((state) => state.counter)
    const dispatch = useDispatch()
    return(
        <>
        <div className="use-counter-body">
        <div className="use-counter-container">
  <div className="use-counter-text">
    <h1 className="use-counter-practical">Practical Test</h1>
  </div>
  <div className="use-counter-text2">
    <div>
      <h2 className="use-counter-output">{count} </h2>
    </div>
    <h2 className="use-counter-display"> </h2>
  </div>
  <div className="use-counter-button">
    <div>
      <button className="use-counter-b1" onClick={()=>dispatch(increment(count))}>
        increment
      </button>
    </div>
    <div>
      <button className="use-counter-b1" onClick={()=>dispatch(decrement(count))}>
        decrement
      </button>
    </div>
    
  </div>
</div>
</div>
        </>
    )
}
export default Usecounter