// Hook for appointment modes transitions and record of their history.
import { useState} from 'react';


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(mode, replace) {
    setMode(() => {
      return mode;
    })
  
  setHistory((prev) => {
    const current = [...prev]; // make a copy of the array to not affect the initial array

    if (replace) {
      current.pop(); //.pop will pop the element of the copy of line 15 
    }

    current.push(mode);

    return current;
  });
}

function back() {
  if (history.length > 1) {
    setHistory((prev) => {
      const current = [...prev]; // make a copy of the array to not affect the initial array
      
      current.pop();  //.pop will pop the element of the copy of line 30

      return current;
    });

    setMode(() => {
      return history[history.length - 2];
    });
  }
}

  return { mode, transition, back};
}   