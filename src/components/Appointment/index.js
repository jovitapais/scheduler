import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import useVisualMode from "hooks/useVisualMode";

import 'components/Appointment/styles.scss';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment(props) {
  const {time, interview } = props;

  const getAppointment = (time) => {
    if (time) {
      return `${time}`;
    }
    return 'No Appointments';
  };

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
    );

  return (
    <article className="appointment">
      {time ? <Header /> : <></>}
      {getAppointment(time)}

      {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}
      {mode === CREATE && <Form interviewers={[]} onCancel={() => back(EMPTY)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>
  );
};