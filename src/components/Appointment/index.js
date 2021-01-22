import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";

import "components/Appointment/styles.scss";



export default function Appointment (props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  ); 

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onEdit={transition("onEdit")}
          onDelete={transition("onDelete")}
        />
      )}
      {mode === CREATE && (
        <Form 
        interviewers={[]}
        // onSave={transition("onSave")}
         onCancel={() => back("onCancel")}
        />
      )

      }
      {/* {mode === CREATE && (
        <Form  
        interviewers={props.interviewers} 
        onClick={props.onSave}
        onClick={props.onCancel}
        />)} */}
    </article>

  )
}