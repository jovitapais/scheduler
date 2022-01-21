import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const updateStudent = (value) => {
    setStudent(value);
  }

  //Helper function to clear all fields
  const reset = () => {
    setStudent(() => setStudent(""));
    setInterviewer(() => setInterviewer(null));
  };

  const cancel = function () {
    // props.onCancel;
    reset();
    props.onCancel()
    
  }

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"        
          onChange={(event) => updateStudent(event.target.value)}            
          value={student}
          placeholder="Enter Student Name"
         />
      </form>
      <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
    </section>
    <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => cancel()} danger>Cancel</Button>
          <Button onClick={() => props.onSave(student, interviewer)} confirm>Save
          </Button>
        </section>
      </section>
    </main>
  );
}