import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getAppointments,
  deleteAppointment,
  createAppointment,
  updateAppointmentFunc,
  getAppointmentByDateDoctor,
  getAppointmentByDateAnimal,
} from "../../API/appointment";
import { getDoctors } from "../../API/doctor";
import { getAnimals } from "../../API/animal";
import "./Appointment.css"

//------------------------------Use State-----------------------------
function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [reload, setReload] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [alert, setAlert] = useState(0);

  const [newAppointment, setNewAppointment] = useState({
    appointmentDate: "",
    doctorId: "",
    animalId: "",
  });

  const [updateAppointment, setUpdateAppointment] = useState({
    appointmentDate: "",
    doctorId: "",
    animalId: "",
  });

  //------------------------------Use Effect-----------------------------
  useEffect(() => {
    getAppointments().then((data) => {
      setAppointments(data.content);
      setSearchResults(data.content);
    });
    getDoctors().then((data) => {
      setDoctors(data.content);
    });
    getAnimals().then((data) => {
      setAnimals(data.content);
    });

    setReload(false);
  }, [reload]);

  //------------------------------New Appointment-----------------------------

  const handleNewAppointment = (event) => {
    const { name, value } = event.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewAppointmentBtn = () => {
    if (
      newAppointment.appointmentDate &&
      newAppointment.doctorId &&
      newAppointment.animalId
    ) {
      const selectedDoctor = doctors.find(
        (doc) => doc.id === parseInt(newAppointment.doctorId)
      );
      const selectedAnimal = animals.find(
        (animal) => animal.id === parseInt(newAppointment.animalId)
      );

      // Backend'in beklediği formatta veri oluşturun
      const appointmentData = {
        appointmentDate: newAppointment.appointmentDate,
        doctor: {
          id: selectedDoctor.id,
          name: selectedDoctor.name,
          phone: selectedDoctor.phone || "N/A",
          mail: selectedDoctor.mail || "N/A",
          address: selectedDoctor.address || "N/A",
          city: selectedDoctor.city || "N/A",
        },
        animal: {
          id: selectedAnimal.id,
          name: selectedAnimal.name,
          species: selectedAnimal.species || "N/A",
          breed: selectedAnimal.breed || "N/A",
          gender: selectedAnimal.gender || "N/A",
          colour: selectedAnimal.colour || "N/A",
          dateOfBirth: selectedAnimal.dateOfBirth || "N/A",
          customer: {
            id: selectedAnimal.customer.id || 0,
            name: selectedAnimal.customer.name || "N/A",
            phone: selectedAnimal.customer.phone || "N/A",
            mail: selectedAnimal.customer.mail || "N/A",
            address: selectedAnimal.customer.address || "N/A",
            city: selectedAnimal.customer.city || "N/A",
          },
        },
      };

      console.log("Sending appointment data:", appointmentData); 

      createAppointment(appointmentData)
        .then(() => {
          setReload(true);
          setNewAppointment({
            appointmentDate: "",
            doctorId: "",
            animalId: "",
          });
        })
        .catch((error) => {
          console.error("Error creating appointment:", error);
          setAlert(1);
          setTimeout(() => {
            setAlert(0);
          }, 3000);
        });
    } else {
      console.error("All fields are required!");
      setAlert(1);
      setTimeout(() => {
        setAlert(0);
      }, 3000);
    }
  };

  //------------------------------Delete Appointment-----------------------------
  const handleDelete = (id) => {
    deleteAppointment(id).then(() => {
      setReload(true);
    });
  };

  //------------------------------Update Appointment-----------------------------

  const handleUpdateAppointmentInputs = (event) => {
    const { name, value } = event.target;
    setUpdateAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateAppointmentBtn = () => {
    if (
      updateAppointment.appointmentDate &&
      updateAppointment.doctorId &&
      updateAppointment.animalId
    ) {
      const selectedDoctor = doctors.find((doc) => doc.id === parseInt(newAppointment.doctorId));
const selectedAnimal = animals.find((animal) => animal.id === parseInt(newAppointment.animalId));

const appointmentData = {
  appointmentDate: newAppointment.appointmentDate,
  doctor: {
    id: selectedDoctor.id,
    name: selectedDoctor.name,
    phone: selectedDoctor.phone || "",
    email: selectedDoctor.email || "",
    address: selectedDoctor.address || "",
    city: selectedDoctor.city || ""
  },
  animal: {
    id: selectedAnimal.id,
    name: selectedAnimal.name,
    species: selectedAnimal.species || "",
    breed: selectedAnimal.breed || "",
    gender: selectedAnimal.gender || "",
    colour: selectedAnimal.colour || "",
    dateOfBirth: selectedAnimal.dateOfBirth || "",
    customer: {
      id: selectedAnimal.customer.id || 0,
      name: selectedAnimal.customer.name || "",
      phone: selectedAnimal.customer.phone || "",
      email: selectedAnimal.customer.email || "",
      address: selectedAnimal.customer.address || "",
      city: selectedAnimal.customer.city || ""
    }
  }
};


      console.log("Sending update appointment data:", appointmentData); 

      updateAppointmentFunc(appointmentData)
        .then(() => {
          setReload(true);
          setUpdateAppointment({
            appointmentDate: "",
            doctorId: "",
            animalId: "",
          });
        })
        .catch((error) => {
          setAlert(2);
          setTimeout(() => {
            setAlert(0);
          }, 3000);
        });
    } else {
      console.error("All fields are required!");
      setAlert(2);
      setTimeout(() => {
        setAlert(0);
      }, 3000);
    }
  };

  const handleUpdateIcon = (appointment) => {
    setUpdateAppointment({
      appointmentDate: appointment.appointmentDate,
      doctorId: appointment.doctor.id,
      animalId: appointment.animal.id,
      id: appointment.id,
    });
  };

 
  const handleSearchDoctorChange = (event) => {
    setDoctorId(event.target.value);
    const filteredAppointment = searchResults.filter((appointment) =>
      appointment.appointmentDate.toLowerCase().includes(search.toLowerCase())
    );
    setAppointments(filteredAppointment);
    setSearch("");
  };

  const handleDoctorDateSearchBtn = () => {
    getAppointmentByDateDoctor(startDate, endDate, doctorId).then((data) => {
      setAppointments(data);
    });
  };

  
  const handleSearchAnimalChange = (event) => {
    setAnimalId(event.target.value);
    const filteredAppointment = searchResults.filter((appointment) =>
      appointment.appointmentDate.toLowerCase().includes(search.toLowerCase())
    );
    setAppointments(filteredAppointment);
    setSearch("");
  };

  const handleAnimalDateSearchBtn = () => {
    getAppointmentByDateAnimal(startDate, endDate, animalId).then((data) => {
      setAppointments(data);
    });
  };

  const handleReset = () => {
    setSearch("");
    setDoctorId("");
    setAnimalId("");
    setAppointments(searchResults);
  };

  return (
    <div className="appointmentContainer">
      {/*--------------------------New Appointment Input Button------------------------ */}
      <div className="newAppointment">
        <h1>Appointment Management</h1>

        <h3>Add Appointment</h3>
        <input
          type="datetime-local"
          placeholder="Appointment date"
          name="appointmentDate"
          value={newAppointment.appointmentDate}
          onChange={handleNewAppointment}
        />

        <select
          value={newAppointment.doctorId}
          name="doctorId"
          onChange={handleNewAppointment}
        >
          <option value="" disabled={true} selected={true}>
            Select doctor
          </option>
          {doctors?.map((doctor) => {
            return (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            );
          })}
        </select>

        <select
          value={newAppointment.animalId}
          name="animalId"
          onChange={handleNewAppointment}
        >
          <option value="" disabled={true} selected={true}>
            Select animal
          </option>
          {animals?.map((animal) => {
            return (
              <option key={animal.id} value={animal.id}>
                {animal.name}
              </option>
            );
          })}
        </select>

        <button onClick={handleNewAppointmentBtn}>Create</button>
        {alert === 1 ? (
          <Alert severity="error">
            Please review the information and try again!
          </Alert>
        ) : null}
      </div>

      
      <div className="updateAppointment">
        <h3>Update Appointment</h3>

        <input
          type="datetime-local"
          placeholder="Appointment date"
          name="appointmentDate"
          value={updateAppointment.appointmentDate}
          onChange={handleUpdateAppointmentInputs}
        />

        <select
          value={updateAppointment.doctorId}
          name="doctorId"
          onChange={handleUpdateAppointmentInputs}
        >
          <option value="" disabled={true} selected={true}>
            Select appointment
          </option>
          {doctors?.map((doctor) => {
            return (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            );
          })}
        </select>

        <select
          value={updateAppointment.animalId}
          name="animalId"
          onChange={handleUpdateAppointmentInputs}
        >
          <option value="" disabled={true} selected={true}>
            Select animal
          </option>
          {animals?.map((animal) => {
            return (
              <option key={animal.id} value={animal.id}>
                {animal.name}
              </option>
            );
          })}
        </select>

        <button onClick={handleUpdateAppointmentBtn}>Update</button>
        {alert === 2 ? (
          <Alert severity="error">Please select an appointment!</Alert>
        ) : null}
      </div>

        <div className="search-bar">
          <h3>Search Appointment by Doctor and Date</h3>

          <select
            value={doctorId}
            name="doctor"
            onChange={handleSearchDoctorChange}
          >
            <option value="" disabled={true} selected={true}>
              Select doctor
            </option>
            {doctors?.map((doctor) => {
              return (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              );
            })}
          </select>

          <input
            type="datetime-local"
            placeholder="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="datetime-local"
            placeholder="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button onClick={handleDoctorDateSearchBtn}>Search</button>
       
          <h3>Search Appointment by Animal Name and Date</h3>

          <select
            value={animalId}
            name="animal"
            onChange={handleSearchAnimalChange}
          >
            <option value="" disabled={true} selected={true}>
              Select animal
            </option>
            {animals?.map((animal) => {
              return (
                <option key={animal.id} value={animal.id}>
                  {animal.name}
                </option>
              );
            })}
          </select>

          <input
            type="datetime-local"
            placeholder="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="datetime-local"
            placeholder="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button onClick={handleAnimalDateSearchBtn}>Search</button> 
          <button className="reset" onClick={handleReset}>
          Show All
        </button>
        

       
      </div>

     
      <div className="list">
        <h3>Randevu Listesi</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Appointment Date</th>
                <th>Animal</th>
                <th>Customer</th>
                <th>Customer Phone</th>
                <th>Doctor Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments?.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.doctor.name}</td>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.animal.name}</td>
                  <td>{appointment.animal.customer.name}</td>
                  <td>{appointment.animal.customer.phone}</td>
                  <td>{appointment.doctor.phone}</td>
                  <td>
                    <span onClick={() => handleUpdateIcon(appointment)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(appointment.id)}>
                      <DeleteIcon />
                    </span>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Appointment;