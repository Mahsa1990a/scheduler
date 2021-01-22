import React, { useState, useEffect } from "react";
import DayList from './DayList';
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import axios from 'axios';

import "components/Application.scss";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Mahsa",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Mason",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Ryan",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   }
// ]

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

export default function Application(props) {

  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({})  updated to :
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  console.log("state.interviewers", state.interviewers);
  const setDay = day => setState({ ...state, day });
  //const setDays = days => setState({ ...state, days }); updated to :
  //const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    //axios.get("/api/days").then(res => {
      //setDays([...res.data])
      //setDays(res.data);
      //console.log(res.data);
    //})
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]
    ).then((all) => {
      console.log("all", all)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  //const appointmentList = appointments.map(appointment => { updated:
  // const appointment = dailyAppointments.map(appointment => {
  //   return (
  //     <>
  //     {/* <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={appointment.interview} /> */}
  //     <Appointment key={appointment.id} {...appointment}/>
  //     </>
  //   );
  // });

  function bookInterview (id, interview) {
    console.log("id, interview: ", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState(prev => ({...prev, appointments }));

    return axios.put(`/api/appointments/${id}`, { interview });

  }
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      // <Appointment key={appointment.id} {...appointment} />
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });

  
  
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
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" bookInterview={bookInterview}/> 
        {/* If I dont't put it ^, it wont show my last appointment */}
      </section>
    </main>
  );
}
