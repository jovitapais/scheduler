import React, { useState, useEffect } from "react";
import DayList from "./DayList";

import "components/Application.scss";
import Appointment from "./Appointment";

import axios from 'axios';

import  {getAppointmentsForDay, getInterviewersForDay, getInterview } from 'helpers/selectors.js';

export default function Application(props) {

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

    ]).then(all => {
      setState(prev=>
       
        ({...prev, days:all[0].data, 
          appointments:all[1].data,
          interviewers: all[2].data}));
    })
  },[]);

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
        setState(prev => {
          return { ...prev, appointments };
        })
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
        setState(prev => {
          return { ...prev, appointments };
        })
      });
  }


    
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentsInSchedule = dailyAppointments.map(a => {
    const interview = getInterview(state, a.interview);

    return <Appointment 
    key={a.id} id={a.id} time={a.time} 
    interview={interview} 
    interviewers={dailyInterviewers} 
    bookInterview={bookInterview}
    cancelInterview={cancelInterview}
    />
  });

  appointmentsInSchedule.push(<Appointment key="last" time="5pm" />)


     return (
      <main className="layout">
      <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          value =  {state.day}  //  day
          days = {state.days}
          onChange = {setDay}  //  setDay
          />
        </nav>
        <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">

      {appointmentsInSchedule}
      
      </section>
    </main>
  );
}
