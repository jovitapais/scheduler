import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import useVisualMode from "hooks/useVisualMode";

import 'components/Appointment/styles.scss';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



export default function Appointment(props) {
  const {id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
    );

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
      transition(ERROR_SAVE, true);
      
    });
  }

  function onEdit() {
    transition(EDIT);
  }


  function onDelete() {
    transition(CONFIRM);
  }

  function destroy() {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => {
        transition(ERROR_DELETE, true);
      });
  }

  const getAppointment = (time) => {
    if (time) {
      return `${time}`;
    }
    return 'No Appointments';
  };
  return (
    <article className="appointment">
      {time ? <Header /> : <></>}
      {getAppointment(time)}

      {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back()} save={save} />}
      {mode === EDIT && <Form student={interview.student} interviewer={interview.interviewer.id} interviewers={interviewers} onCancel={() => back(EMPTY)} save={save} />}
      {mode === SAVING && <Status message={"Saving"}/>}
      {mode === ERROR_SAVE && <Error message={"Could not book appointment."} onClose={() => back()} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === ERROR_DELETE && <Error message={"Could not cancel appointment."} onClose={() => back()} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} destroy={destroy} onCancel={() => back(EMPTY)}/>}

      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </article>
  );
};