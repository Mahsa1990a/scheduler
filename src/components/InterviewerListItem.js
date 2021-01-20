import React from "react";
import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function InterviewerListItem(props) {

  const interviewerClass = classNames({
    "interviewers__item":true,
    "interviewers__item--selected":props.selected
  })

  return (
    <li className={interviewerClass} onClick={props.setInterviewer} >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
    /* <li className="interviewers__item">
          <img
            className="interviewers__item-image"
            src="https://i.imgur.com/LpaY82x.png"
            alt="Sylvia Palmer"
          />
          Sylvia Palmer
        </li> 
    */
  );
}