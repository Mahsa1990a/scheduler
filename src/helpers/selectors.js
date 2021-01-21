//The function will return an array of appointments for the given day
export function getAppointmentsForDay(state, day) {
  
  //... returns an array of appointments for that day
  //using filter to filter arr not map that is returning the whole arr
  const aDay = state.days.filter(aday => aday.name === day)[0];
  //or : const aDay = state.days.find(aday => aday.name === day);

  //console.log("aDay", aDay); //obj { id: 1, name: 'Monday', appointments: [ 1, 2, 3 ] }, ...
  
  //loop throgh appointment Id : aDay.appointments.map(appointmentId => state.appointments[appointmentId])
  //if (!aDay) return []
  const appointmentsObj = aDay ? aDay.appointments.map(appointmentId => state.appointments[appointmentId]) : [];
  
  return appointmentsObj;
}

// /This function will return an object that contains the interview data if it is passed an object that contains an interviewer
// export function getInterview(state, interview) {
//   const result =  interview ? {
//     student: interview.student,
//     interviewer: state.interviewers[`${interview.interviewer}`]
//   } : null
//   return result;
// };

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const result = {
    student: interview.student
  };
  let intID = interview.interviewer;
  result.interviewer = state.interviewers[`${intID}`];
  return result;
}