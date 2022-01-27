import React, { useState } from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const { interviewers, onCancel, save } = props;


  function validate() {
    
    if (!student) {
      setError("Student name cannot be blank");
      return;
    } else if (!interviewer) {
    
      setError("Interviewer cannot be blank");
      return;
    }
    setError("");
    save(student, interviewer);
  }


  const updateStudent = (value) => {
    setStudent(value);
  }

  //Helper function to clear all fields
  const reset = () => {
    setStudent(() => setStudent(""));
    setInterviewer(() => setInterviewer(null));
  };

  const cancel = function () {
    reset();
    onCancel()
    
  }

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <section className="appointment__validation">{error}</section>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"        
          placeholder="Enter Student Name"
          value={student}
          onChange={event => {updateStudent(event.target.value)
          }}
          data-testid="student-name-input"    
          
         />
      </form>
      <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
    </section>
    <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => cancel()} danger>Cancel</Button>
          <Button onClick={() => validate()} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}