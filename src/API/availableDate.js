import axios from "axios";

export const getAvailableDates = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_APP_BASEURL + "/api/v1/available-dates"
  );
  console.log(data);
  return data;
};

export const deleteAvailableDate = async (id) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_APP_BASEURL}/api/v1/available-dates/${id}`
  );
  return data;
};

export const createAvailableDate = async (availableDate) => {
  const obj = {
    workDay: availableDate.availableDate,
    doctorId: availableDate.doctor.id,
  };
  const { data } = await axios.post(
    `${import.meta.env.VITE_APP_BASEURL}/api/v1/available-dates`,
    obj
  );
  return data;
};

export const updateAvailableDateFunc = async (availableDate) => {
  const { data } = await axios.put(
  `${import.meta.env.VITE_APP_BASEURL}/api/v1/available-dates/${availableDate.id}`
,
    availableDate
  );
  return data;
};