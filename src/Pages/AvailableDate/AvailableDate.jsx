import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import "./AvailableDate.css";

import {
  getAvailableDates,
  deleteAvailableDate,
  createAvailableDate,
  updateAvailableDateFunc,
} from "../../API/availableDate";
import { getDoctors } from "../../API/doctor";

function AvailableDate() {
  const [availableDates, setAvailableDates] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(false);

  const [newAvailableDate, setNewAvailableDate] = useState({
    availableDate: "",
    doctor: {
      id: "",
    },
    id:""
  });

  const [updateAvailableDate, setUpdateAvailableDate] = useState({
    availableDate: "",
    doctor: {
      id: "",
    },
    id:""
  });

  useEffect(() => {
    getAvailableDates().then((data) => {
      setAvailableDates(data.content);
      setSearchResults(data.content);
    });
    getDoctors().then((data) => {
      setDoctors(data.content);
    });
    setReload(false);
  }, [reload]);

  const handleNewAvailableDate = (event) => {
    if (event.target.name === "doctor") {
      setNewAvailableDate({
        ...newAvailableDate,
        doctor: {
          id: event.target.value,
        },
      });
    } else {
      setNewAvailableDate({
        ...newAvailableDate,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleNewAvailableDateBtn = () => {
    createAvailableDate(newAvailableDate)
      .then(() => {
        setReload(true);
        setNewAvailableDate({
          availableDate: "",
          doctor: {
            id: "",
          },
          id:""
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
    deleteAvailableDate(id).then(() => {
      setReload(true);
    });
  };

  const handleUpdateAvailableDateInputs = (event) => {
    if (event.target.name === "doctor") {
      setUpdateAvailableDate({
        ...updateAvailableDate,
        doctor: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateAvailableDate({
        ...updateAvailableDate,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdateAvailableDateBtn = () => {
    updateAvailableDateFunc(updateAvailableDate)
      .then(() => {
        setReload(true);
        setUpdateAvailableDate({
          availableDate: "",
          doctor: {
            id: "",
          },
          id:""
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleUpdateIcon = (availableDate) => {
    setUpdateAvailableDate({
      availableDate: availableDate.availableDate,
      doctor: availableDate.doctor,
      id: availableDate.id,
    });
  };

  const handleInputSelect = (event) => {
    setSearch(event.target.value);
    if (event.target.name === "doctor") {
      setNewAvailableDate({
        ...newAvailableDate,
        doctor: {
          id: event.target.value,
        },
      });
    } else {
      setNewAvailableDate({
        ...newAvailableDate,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSearch = () => {
    const filteredAvailableDate = searchResults.filter((availableDate) => {
      const dateValue = availableDate.availableDate;
      return dateValue && dateValue.toLowerCase().includes(search.toLowerCase());
    });
    setAvailableDates(filteredAvailableDate);
    setSearch("");
  };

  const handleReset = () => {
    setSearch("");
    setAvailableDates(searchResults);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
     
      
        <div className="newAvailableDate">
         <h1 >Available Date Management </h1>
          <h3>Add Available Date</h3>

          <select
            value={newAvailableDate.doctor.id}
            name="doctor"
            onChange={handleNewAvailableDate}
          >
            <option value="" disabled={true}>
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
            type="date"
            placeholder="Available Date"
            name="availableDate"
            value={formatDate(newAvailableDate.availableDate)}
            onChange={handleNewAvailableDate}
          />

          <button onClick={handleNewAvailableDateBtn}>Create</button>
          {alert === 1 ? (
            <Alert severity="error">
              Please review the information and try again!
            </Alert>
          ) : null}
        </div>

        <div className="updateAvailableDate">
          <h3>Update Available Date</h3>

          <select value={search} name="doctor" onChange={handleInputSelect}>
            <option value="" disabled={true}>
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
            type="date"
            placeholder="Available Date"
            name="availableDate"
            value={formatDate(updateAvailableDate.availableDate)}
            onChange={handleUpdateAvailableDateInputs}
          />
          <button onClick={handleUpdateAvailableDateBtn}>Update</button>
          {alert === 2 ? (
            <Alert severity="error">"Please select an available date!"</Alert>
          ) : null}
        </div>

        <div className="searchBar">
          <h3>Search Available Date</h3>

          <select value={search} name="doctor" onChange={handleInputSelect}>
            <option value="" disabled={true}>
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
            type="date"
            placeholder="Enter date... "
            value={formatDate(search)}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <button className="reset" onClick={handleReset}>
            Show All
          </button>
        </div>

      <div className="list">
        <h3>Available Date List</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name Surname</th>
                <th>Available Date</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {availableDates?.map((availableDate, index) => (
                <tr key={availableDate.id ? availableDate.id : index}>
                  <td>{availableDate.doctor.name}</td>
                  <td>{availableDate.availableDate}</td>
                  <td>{availableDate.doctor.phone}</td>
                  <td>{availableDate.doctor.email}</td>

                  <td>
                    <span onClick={() => handleUpdateIcon(availableDate)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(availableDate.id)}>
                      <DeleteIcon />
                    </span>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AvailableDate;
