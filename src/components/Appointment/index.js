import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "../../hooks/useVisualMode";


import "components/Appointment/styles.scss";




export default function Appointment (props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  ); 

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
  
    Promise.resolve(props.bookInterview(props.id, interview))
      .then(() => transition(SHOW))
      .catch(err => { console.log(err) });

  }
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onEdit={() => transition("onEdit")}
          onDelete={() => transition("onDelete")}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers = {props.interviewers}
          onSave={save}
          onCancel={() => back("onCancel")}
        />
      )
      }
      {mode === SAVING && (
        <Status 
          message="Saving"
        />
      )

      }
    </article>

  )
}