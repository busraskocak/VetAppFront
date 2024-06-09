import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import "./Doctor.css"

import {
  getDoctors,
  deleteDoctor,
  createDoctor,
  updateDoctorFunc,
  getDoctorByName,
} from "../../API/doctor";
import "./Doctor.css";
import AvailableDate from "../AvailableDate/AvailableDate";


function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);
  const [doctorSearch, setDoctorSearch] = useState("");

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    mail: "",
    address: "",
    city: "",
    phone: "",
    id: ""
  });

  const [updateDoctor, setUpdateDoctor] = useState({
    name: "",
    mail: "",
    address: "",
    city: "",
    phone: "",
    id: ""
  });

  
  useEffect(() => {
    getDoctors().then((data) => {
      setDoctors(data.content);
      setSearchResults(data);
    });
    setReload(false);
  }, [reload]);

 
  const handleNewDoctor = (event) => {
    setNewDoctor({
      ...newDoctor,
      [event.target.name]: event.target.value,
    });
    console.log(newDoctor);
  };

  const handleNewDoctorBtn = () => {
    createDoctor(newDoctor)
      .then(() => {
        console.log(newDoctor);
        setReload(true);
        setNewDoctor({
          name: "",
          mail: "",
          address: "",
          city: "",
          phone: "",
          id: ""
        });
      })
      .catch((error) => {
        setAlert(1);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  
  const handleDelete = (id) => {
    deleteDoctor(id).then(() => {
      setReload(true);
    });
  };


  const handleUpdateDoctorInputs = (event) => {
    setUpdateDoctor({
      ...updateDoctor,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateDoctorBtn = () => {
    updateDoctorFunc(updateDoctor)
      .then(() => {
        setReload(true);
        setUpdateDoctor({
          name: "",
          mail: "",
          address: "",
          city: "",
          phone: "",
          id: ""
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleUpdateIcon = (doctor) => {
    setUpdateDoctor({
      name: doctor.name,
      mail: doctor.mail,
      address: doctor.address,
      city: doctor.city,
      phone: doctor.phone,
      id: doctor.id,
    });
  };

  
  const handleSearchDoctorByName = () => {
    getDoctorByName(doctorSearch).then((data) => {
      setDoctors(data);
    });
  };

  const handleReset = () => {
    setDoctorSearch("");
    setDoctors(searchResults);
  };

  return (
    <>
      
      <div className="container">
        <div className="doctor-newdoctor">
          <h1>Doctor Management</h1>
          <h3>Add Doctor</h3>
          <input
            type="text"
            placeholder="Doctor ID"
            name="id"
            value={newDoctor.id}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="Name Surname"
            name="name"
            value={newDoctor.name}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={newDoctor.phone}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="Email"
            name="mail"
            value={newDoctor.mail}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={newDoctor.address}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={newDoctor.city}
            onChange={handleNewDoctor}
          />
          <button onClick={handleNewDoctorBtn}>Create</button>
          {alert === 1 ? (
            <Alert severity="error">
              Please review the information and try again!
            </Alert>
          ) : null}
        </div>

        
        <div className="doctor-updatedoctor">
          <h3>Update Doctor</h3>

          <input
            type="text"
            placeholder="Doctor ID"
            name="id"
            value={updateDoctor.id}
            onChange={handleUpdateDoctorInputs}
          />

          <input
            type="text"
            placeholder="Name Surname"
            name="name"
            value={updateDoctor.name}
            onChange={handleUpdateDoctorInputs}
          />
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={updateDoctor.phone}
            onChange={handleUpdateDoctorInputs}
          />
          <input
            type="text"
            placeholder="Email"
            name="mail"
            value={updateDoctor.mail}
            onChange={handleUpdateDoctorInputs}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={updateDoctor.address}
            onChange={handleUpdateDoctorInputs}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={updateDoctor.city}
            onChange={handleUpdateDoctorInputs}
          />
          <button onClick={handleUpdateDoctorBtn}>Update</button>
          {alert === 2 ? (
            <Alert severity="error">Please select doctor!</Alert>
          ) : null}
        </div>

       
        <div className="searchbar">
          <h3>Search Doctor</h3>
          <input
            type="text"
            placeholder="Enter doctor... "
            value={doctorSearch}
            onChange={(e) => setDoctorSearch(e.target.value)}
          />
          <button className="search-button" onClick={handleSearchDoctorByName}>
            Search
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>

        
        <div className="list">
          <h3>Doctor List</h3>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Doctor ID</th>
                  <th>Name Surname</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors?.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.id}</td>
                    <td>{doctor.name}</td>
                    <td>{doctor.phone}</td>
                    <td>{doctor.address}</td>
                    <td>{doctor.city}</td>
                    <td>{doctor.email}</td>
                    <td>
                      <span onClick={() => handleUpdateIcon(doctor)}>
                        <UpdateIcon />
                      </span>
                      <span onClick={() => handleDelete(doctor.id)}>
                        <DeleteIcon />
                      </span>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Outlet />
        <AvailableDate/>
      </div>
    </>
  );
}
export default Doctor;