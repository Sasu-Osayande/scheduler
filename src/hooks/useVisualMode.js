import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // build hooks to transition back and forth between modes and components

  function transition(mode, replace = false) {
    if(!replace) {
      setMode(mode);
      history.push(mode);
    }
    setMode(mode);
  }

  function back() {
    if(history.length > 1) {
      setMode(history.pop());

      setMode(history[history.length - 1])
    }
  }

  return { mode, transition, back };
}
