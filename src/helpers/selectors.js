
export function getAppointmentsForDay(state, day) {
  
  //... returns an array of appointments for that day
  //using filter to filter arr not map that is returning the whole arr
  const aDay = state.days.filter(aday => aday.name === day)[0];

  console.log("aDay", aDay); //obj { id: 1, name: 'Monday', appointments: [ 1, 2, 3 ] }, ...
  
  const appointmentsObj = aDay ? aDay.appointments.map(appointmentId => state.appointments[appointmentId]) : [];
  
  return appointmentsObj;
}
//The function will return an array of appointments for the given day