import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment"

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

useEffect(() => {
  axios.get("/api/days").then(response => {
    console.log(response.data);
    setDays([response.data]);
  });
}, []);

return (
  <main className="layout">
    <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList days={days} value={day} onChange={setDay} />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
    </section>
    <section className="schedule">
      {/* {Object.values(appointments).map(appointment => <Appointment key={appointment.id} {...appointment} />)} */}
      <Appointment key="last" time="5pm" />
    </section>
  </main>
);
}
