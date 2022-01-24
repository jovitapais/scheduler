import { useState, useEffect } from 'react';

import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => {
    return { ...prev, day }
  });

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

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
          const currentDays = [...state.days];
  
          let dayToUpdateSpots;
  
          if (id >= 1 && id <= 5) {
            dayToUpdateSpots = 0;
          }
  
          if (id >= 6 && id <= 10) {
            dayToUpdateSpots = 1;
          }
  
          if (id >= 11 && id <= 15) {
            dayToUpdateSpots = 2;
          }
  
          if (id >= 16 && id <= 20) {
            dayToUpdateSpots = 3;
          }
  
          if (id >= 21 && id <= 25) {
            dayToUpdateSpots = 4;
          }
  
          if (state.appointments[id].interview === null) {
            currentDays[dayToUpdateSpots].spots--;
          }
  
        setState(prev => {
          return { ...prev, currentDays, appointments };
        });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        const currentDays = [...state.days];

        let dayToUpdateSpots;

        if (id >= 1 && id <= 5) {
          dayToUpdateSpots = 0;
        }

        if (id >= 6 && id <= 10) {
          dayToUpdateSpots = 1;
        }

        if (id >= 11 && id <= 15) {
          dayToUpdateSpots = 2;
        }

        if (id >= 16 && id <= 20) {
          dayToUpdateSpots = 3;
        }

        if (id >= 21 && id <= 25) {
          dayToUpdateSpots = 4;
        }

        currentDays[dayToUpdateSpots].spots++;

        setState(prev => {
          return { ...prev, currentDays, appointments };
        })
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
} 