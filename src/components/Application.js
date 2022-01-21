import React, { useState, useEffect } from "react";
import DayList from "./DayList";
//import InterviewerList from "./InterviewerList";
import "components/Application.scss";
import Appointment from "./Appointment";

import axios from 'axios';

import  getAppointmentsForDay from 'helpers/selectors.js';

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({...state, day});
  
  useEffect(() => {
   
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      //axios.get(interviewersURL)

    ]).then(all => {
      setState(prev=>({...prev, days:all[0].data, appointments:all[1].data}));
    })
  },[]);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentsInSchedule = dailyAppointments.map(a => {
    return <Appointment key={a.id} {...a} />
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
