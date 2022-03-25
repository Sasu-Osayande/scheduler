import DayList from "components/DayList";

export function getAppointmentsForDay(state, day) {
  let appointmentsArray = [];

  const daysAppointmentsArray = state.days.filter(dayValue => dayValue.name === day);

  if (state.days.length === 0 || daysAppointmentsArray.length === 0) {
    return appointmentsArray;
  }

  const appointmentForDay = daysAppointmentsArray[0].appointments;

  for (const appointment of appointmentForDay) {
    appointmentsArray.push(state.appointments[appointment]);
  }
  return appointmentsArray;
}