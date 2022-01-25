import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';


export default function InterviewerList(props) {

  const { interviewers, value, onChange } = props;

  const interviewerListItems = interviewers.map(interviewerObj => {

    return (
    <InterviewerListItem 
    key = {interviewerObj.id}
    name = {interviewerObj.name}
    avatar = {interviewerObj.avatar}
    selected = {interviewerObj.id === value}
    setInterviewer = {() => onChange(interviewerObj.id)}
    />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListItems}</ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};