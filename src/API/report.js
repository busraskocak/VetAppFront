import axios from "axios";

export const getReports = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_APP_BASEURL + "/api/v1/reports"
  );
  console.log(data);
  return data;
};

export const deleteReport = async (id) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_APP_BASEURL}/api/v1/reports/${id}`
  );
  return data;
};

export const createReport = async (report) => {
  const obj = {
    title: report.title,
    diagnosis: report.diagnosis,
    price: report.price,
    appointmentId: report.appointment.id,
  };
  const { data } = await axios.post(
    `${import.meta.env.VITE_APP_BASEURL}/api/v1/reports`,
    obj
  );
  return data;
};

export const updateReportFunc = async (report) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_APP_BASEURL}/api/v1/reports/${report.id}`,
    report
  );
  return data;
};
