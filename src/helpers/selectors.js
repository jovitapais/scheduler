export function getAppointmentsForDay (state, day) {
  
  const appointments = [];

  for (const d of state.days) {
    if (d.name === day) {
      d.appointments.forEach((id) => appointments.push(state.appointments[id]));
    }
  }

  return appointments;
} 

export function getInterviewersForDay(state, day) {
  const interviewers = [];

  for (const d of state.days) {
    if (d.name === day) {
      d.interviewers.forEach((id) => {
        interviewers.push(state.interviewers[id]);
      });
    }
  }

  return interviewers;
}

export function getInterview(state, interview) {
  let result = null;

  if (interview !== null) {
    result = {};

    const student = interview.student;
    const interviewerId = interview.interviewer;
    
    const interviewerName = state.interviewers[interviewerId] && state.interviewers[interviewerId].name;
    const interviewerAvatar = state.interviewers[interviewerId] && state.interviewers[interviewerId].avatar;

    result.student = student;
    result.interviewer = { id: interviewerId, name: interviewerName, avatar: interviewerAvatar };
  }

  return result;
}