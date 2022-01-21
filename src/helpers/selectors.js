export default function getAppointmentsForDay (state, day) {
  
  const appointments = [];

  for (const d of state.days) {
    if (d.name === day) {
      d.appointments.forEach((id) => appointments.push(state.appointments[id]));
    }
  }

  return appointments;
} 