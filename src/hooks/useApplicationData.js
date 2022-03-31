import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      // request to get days, appointments, and interviewers data
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function updateSpots(appointments) {
    // find the day equal to the state
    const findDay = state.days.find((day) => day.name === state.day);

    const findAppoinments = findDay.appointments;

    // search through the appointment object to the interview data to determine the amount of null spots
    const numOfSpotsRemaining = findAppoinments
      .map((id) => appointments[id].interview)
      .filter((interview) => interview === null).length;

    // update the spots for the days object with the numOfSpotsRemaining
    const updatedDays = [...state.days].map((day) => {
      if (day.name === state.day) {
        day.spots = numOfSpotsRemaining;
      }
      return day;
    });

    setState({ ...state, days: updatedDays });
  }

  function bookInterview(id, interview) {
    // update the appointments object to reflect the new state
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {
        interview: interview,
      })
      .then((res) => {
        // once the request is resolved, update the spots
        updateSpots(appointments);
        setState({
          ...state,
          appointments,
        });
        return res;
      });
  }

  function cancelInterview(id) {
    // update the appointments object to reflect the new state and set interview to null
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, {
        appointment: appointment,
      })
      .then((res) => {
        // once the request is resolved, update the spots
        updateSpots(appointments);
        setState({
          ...state,
          appointments,
        });
        return res;
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
