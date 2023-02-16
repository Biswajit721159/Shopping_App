
import React, {  useState } from "react";
let Interval=undefined;
export default function Time() {
  
  const [data,setdata]=useState(0);
  const [check,setchack]=useState(false);
  function start()
  {
      Interval = setInterval(()=>{
          setdata((x)=>x+1)
      },1000)
      setchack(true);
  }
  function stop()
  {
      clearInterval(Interval);
      setchack(false);
  }
  function reset()
  {
      clearInterval(Interval);
      setdata(0);
      setchack(false);
  }

  return (
    <div className="App">
      <h1>Stop watch</h1>
      <h2 className="container mt-4">{data}</h2>
      <button type="button" disabled={check} className="btn btn-outline-primary mt-2 mx-2" onClick={start}>start</button>
      <button type="button" className="btn btn-outline-secondary mt-2 mx-2" onClick={stop}>stop</button>
      <button type="button" className="btn btn-outline-success mt-2 mx-2" onClick={reset}>reset</button>
    </div>
  );
}
