import { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);

    console.log("newMode: ", newMode)
    console.log("history: ", [...history])
    if (replace) { //if replace is false
      setHistory([...history]);
    } else {
      setHistory([...history, newMode])
    }
  }; 

  function back() {
    const tempHistory = [... history];
    tempHistory.pop();
    setHistory(tempHistory);

    if (tempHistory.length > 1) {
      setMode(tempHistory[tempHistory.length -1])
    } else {
      setMode(initial)
    }
    //tempHistory.length > 1 ? setMode(tempHistory[tempHistory.length - 1]) : setMode(initial)
  }
  

  return ({ mode, transition, back });
}