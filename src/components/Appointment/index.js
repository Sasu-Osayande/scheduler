import React, { Fragment } from "react";
import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer,
    };
    props.bookInterview(props.id, interview);
    // transition(
    //   props.bookInterview ? SHOW : EMPTY
    // );
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  function deleteApp() {
    transition(DELETING);

    props.cancelInterview(props.id);
    // transition(
    //   props.cancelInterview ? SHOW : EMPTY
    // );
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    });
  }

  return (
    <Fragment>
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
          />
        )}
        {mode === SAVING && <Status message="Saving..." />}
        {mode === CONFIRM && (
          <Confirm
            onCancel={back}
            onConfirm={deleteApp}
            message="Are you sure you would like to delete?"
          />
        )}
        {mode === DELETING && <Status message="Deleting..." />}
        {mode === EDIT && (
          <Form
            interview={props.interviewer}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
          />
        )}
      </article>
    </Fragment>
  );
}
