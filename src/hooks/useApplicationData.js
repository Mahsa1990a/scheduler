import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) { //custom hook to manage API data

  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({})  updated to :
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //console.log("state.interviewers", state.interviewers);
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
      //console.log("all", all)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  function getUpdateSpots(newAppointments) {
    return state.days.map((day, index) => {
      let freeSpots = 0;

      for (let key of state.days[index].appointments) {
        if (!newAppointments[key].interview) {
          freeSpots++;
        }
      }
      const updatedSpots = {...day, spots: freeSpots}
      return updatedSpots;
    })
  };

  function bookInterview (id, interview) {
    //console.log("id, interview: ", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //setState(prev => ({...prev, appointments }));

    return (
      axios.put(`/api/appointments/${id}`, appointments[id])
      .then(setState({
        ...state, appointments, days: getUpdateSpots(appointments) 
      }))
      // .catch(err => console.log(err))
    );
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // setState(prev => ({...prev, appointments }));
    return (
      axios.delete(`/api/appointments/${id}`, appointments[id])
      .then(response => {
        setState({
        ...state, appointments, days: getUpdateSpots(appointments)
      })})
      // .catch(err => console.log(err))
    );
  
  }

  return { state, setDay, bookInterview, cancelInterview };
}








