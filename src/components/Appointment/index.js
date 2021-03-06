import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";

import "components/Appointment/styles.scss";

export default function Appointment (props) {

  //add the mode constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  ); 

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
  
    //Promise.resolve(props.bookInterview(props.id, interview))
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => { 
        console.log(error);
        transition(ERROR_SAVE, true)
      });
  }

  function destroy(event) {

    transition(DELETING, true);

    //Promise.resolve(props.cancelInterview(props.id))
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => {
        console.log(error);
        transition(ERROR_DELETE, true)
      });
  }
  
  return (
    <article 
      className="appointment"
      data-testid="appointment"
      >
      <Header time={props.time}/>
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          // onDelete={() => transition("onDelete")}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers = {props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && (
        <Status 
          message="Saving"
        />
      )}
      {mode === DELETING && (
        <Status 
          message="Deleting"
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
          onCancel={back}
          onConfirm={destroy}
          message="Are you sure you would like to delete?"
        />
      )}
      {mode === EDIT && (
        <Form 
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers = {props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          onClose={back}
          message="Could not save appointment"
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          onClose={back}
          message="Could not cancel appointment"
        />
      )}
    </article>
  );
}