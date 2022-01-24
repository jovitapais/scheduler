import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from './Status';
import Confirm from './Confirm';


import useVisualMode from "hooks/useVisualMode";

import 'components/Appointment/styles.scss';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const {id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    bookInterview(id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch(error => {
      console.error(error);
    });
  }

  function onDelete() {
    transition(CONFIRM);
  }

  function onConfirm() {
    transition(DELETING);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => {
        console.error(error);
      });
  }

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
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back(EMPTY)} save={save} />}
      {mode === SAVING && <Status message={"Saving"}/>}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onConfirm={onConfirm} />}

      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={onDelete}
        />
      )}
    </article>
  );
};