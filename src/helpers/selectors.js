export function getAppointmentsForDay(state, day) {
  let appointmentsArray = [];

  const daysAppointmentsArray = state.days.filter(
    (dayValue) => dayValue.name === day
  );

  if (state.days.length === 0 || daysAppointmentsArray.length === 0) {
    return appointmentsArray;
  }

  const appointmentForDay = daysAppointmentsArray[0].appointments;

  for (const appointment of appointmentForDay) {
    appointmentsArray.push(state.appointments[appointment]);
  }
  return appointmentsArray;
}

export function getInterview(state, interview) {
  // let interviewObj = {};
  if (!interview) {
    return null;
  }
  return {
      student: interview.student,
      interviewer: {
        id: interview.interviewer,
        name: state.interviewers[interview.interviewer].name,
        avatar: state.interviewers[interview.interviewer].avatar
      }
  }
  // if (Object.keys(interviewObj).length === 0) {
  //   Object.assign(interviewObj, { "interviewer": state.interviewers[interview.interviewer], "student": interview.stdent});
  // }
}
