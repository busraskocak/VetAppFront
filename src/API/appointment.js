import axios from "axios";

export const getAppointments = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_APP_BASEURL + "/api/v1/appointments"
  );
  return data;
};

export const deleteAppointment = async (id) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_APP_BASEURL}/api/v1/appointments/${id}`
  );
  return data;
};

export const createAppointment = async (appointment) => {
  console.log(appointment);
  const { data } = await axios.post(
    `${import.meta.env.VITE_APP_BASEURL}/api/v1/appointments`,
    appointment
    
  );
  return data;
};

export const updateAppointmentFunc = async (appointment) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_APP_BASEURL}/api/v1/appointments/${
      appointment.id
    }`,
    appointment
  );
  return data;
};

export const getAppointmentByDateDoctor = async (
  startDate,
  endDate,
  doctorId
) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_APP_BASEURL
    }/api/v1/appointments/doctorId?startDate=${startDate}&endDate=${endDate}&doctorId=${doctorId}`
  );
  return data;
};

export const getAppointmentByDateAnimal = async (
  startDate,
  endDate,
  animalId
) => {
  const { data } = await axios.get(
   `${import.meta.env.VITE_APP_BASEURL}/api/v1/appointments?startDate=${startDate}&endDate=${endDate}&doctorId=${animalId}`

  );
  return data;
};