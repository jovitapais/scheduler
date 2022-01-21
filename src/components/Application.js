import React, { useState, useEffect } from "react";
import DayList from "./DayList";

import "components/Application.scss";
import Appointment from "./Appointment";

import axios from 'axios';

import  {getAppointmentsForDay, getInterview } from 'helpers/selectors.js';

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day});
  
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

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentsInSchedule = dailyAppointments.map(a => {
    const interview = getInterview(state, a.interview);

    return <Appointment key={a.id} id={a.id} time={a.time} interview={interview} />
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
          days = {state.days}
          value =  {state.day}  //  day
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
