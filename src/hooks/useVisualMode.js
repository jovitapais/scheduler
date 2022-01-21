import { useState, useEffect  } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  function transition(mode) {
    setMode(() => {
      return mode;
    })
  }

  return { mode, transition };
}