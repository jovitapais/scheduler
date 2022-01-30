import { useState, useEffect } from 'react';

import axios from 'axios';

export default function useApplicationData() {

  //Initial state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // setDay function is used to set the state inside the useState
  const setDay = day => setState({ ...state, day });

  //Fetch data from server
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      });
  }, []);

   function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return daysOfWeek[day]
  }

  //Make an appointment

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayOfWeek = findDay(state.day)
      let day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek]
      }
  
      if (!state.appointments[id].interview) {
        day = {
          ...state.days[dayOfWeek],
          spots: state.days[dayOfWeek].spots - 1
        } 
      } else {
        day = {
          ...state.days[dayOfWeek],
          spots: state.days[dayOfWeek].spots
        } 
      }
  
      let days = state.days
      days[dayOfWeek] = day;


    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
          setState({...state, appointments, days});
    })

  }

//Cancel an appointment
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayOfWeek = findDay(state.day)

    const day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1
    }

    let days = state.days
    days[dayOfWeek] = day;

    const url =`/api/appointments/${id}`;
  
    return axios.delete(url, appointment).then(()=>{
      setState({...state, appointments, days });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
} 