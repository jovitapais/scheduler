import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";



export default function InterviewerList(props) {

  const interviewers = props.interviewers.map(interviewerObj => {

    return (
    <InterviewerListItem 
    key = {interviewerObj.id}
    name = {interviewerObj.name}
    avatar = {interviewerObj.avatar}
    selected = {interviewerObj.id === props.value}
    setInterviewer = {(event) => props.setDay(interviewerObj.id)}
    />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}
