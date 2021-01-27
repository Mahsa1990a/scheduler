import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  //console.log("props.interviewers", props.interviewers)
  const intervierListItems =  props.interviewers && props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key            = {interviewer.id}
        name           = {interviewer.name}
        avatar         = {interviewer.avatar}
        selected       = {interviewer.id === props.interviewer}
        // setInterviewer = {props.setInterviewer(interviewer.id)}
        //setInterviewer = {(event) => props.setInterviewer(interviewer.id)}
        setInterviewer = {(event) => props.onChange(interviewer.id)}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul 
        className="interviewers__list">
        {intervierListItems}
      </ul>
    </section>
  );
}

//We will make sure the interviewers prop is an Array and it is required.
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};