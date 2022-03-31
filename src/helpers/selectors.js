export function getAppointmentsForDay(state, day) {
  let appointmentsArray = [];

  const daysAppointmentsArray = state.days.filter(
    (dayValue) => dayValue.name === day
  );

  //  return an empty array when the data is empty
  if (state.days.length === 0 || daysAppointmentsArray.length === 0) {
    return appointmentsArray;
  }

  const appointmentForDay = daysAppointmentsArray[0].appointments;

  // update the empty array with the appointments and return
  for (const appointment of appointmentForDay) {
    appointmentsArray.push(state.appointments[appointment]);
  }
  return appointmentsArray;
}

export function getInterview(state, interview) {
  // function to return the interview data object if there is an interview
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
}

export function getInterviewersForDay(state, name) {
  let resultArray = [];

  const interviewersArray = state.days.filter((day) => day.name === name);

  // return an empty array if the data is empty
  if (state.days.length === 0 || interviewersArray.length === 0) {
    return resultArray;
  }

  const interviewersForDay = interviewersArray[0].interviewers;

  // update the empty array with the interviewers object data and return
  for (const interviewer of interviewersForDay) {
    resultArray.push(state.interviewers[interviewer]);
  }
  return resultArray;
}
