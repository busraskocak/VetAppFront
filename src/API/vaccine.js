import axios from "axios";

export const getVaccines = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_APP_BASEURL + "/api/v1/vaccinations"
  );
  console.log(data);
  return data;
};

export const deleteVaccine = async (id) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_APP_BASEURL}/api/v1/vaccinations/${id}`
  );
  return data;
};

export const createVaccine = async (vaccine) => {
  console.log(vaccine);
  const vaccineData = {
    name: vaccine.name,
    code: vaccine.code,
    protectionStartDate: vaccine.protectionStartDate,
    protectionFinishDate: vaccine.protectionFinishDate,

    animalWithoutCustomer: {
      id: vaccine.animal.id,
      name: vaccine.animal.name,
      species: vaccine.animal.species,
      breed: vaccine.animal.breed,
      gender: vaccine.animal.gender,
      dateOfBirth: vaccine.animal.dateOfBirth,
      colour: vaccine.animal.colour,
    },
  };
  console.log(vaccineData);
  const { data } = await axios.post(
    `${import.meta.env.VITE_APP_BASEURL}/api/v1/vaccinations`,
    vaccineData
  );
  return data;
};

export const updateVaccineFunc = async (vaccine) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_APP_BASEURL}/api/v1/vaccinations/${vaccine.id}`,
    vaccine
  );
  return data;
};

export const getVaccineByName = async (name) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_APP_BASEURL
    }/api/v1/vaccinations/byName?name=${name}`
  );

  return data;
};

export const getVaccineByAnimalName = async (animalName) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_APP_BASEURL
    }/api/v1/vaccinations/byAnimalName?animalName=${animalName}`
  );
  return data;
};


export const getVaccinesByDate = async (startDate, endDate) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_APP_BASEURL
    }/api/v1/vaccines/finishDate?startDate=${startDate}&endDate=${endDate}`
  );
  console.log(data);
  return data;
};
