import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getReports,
  deleteReport,
  createReport,
  updateReportFunc,
} from "../../API/report";
import { getAppointments } from "../../API/appointment";
import "./Report.css"

//------------------------------Use State-----------------------------
function Report() {
  const [reports, setReports] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);

  const [newReport, setNewReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointment: "",
  });

  const [updateReport, setUpdateReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointment: "",
  });

  //------------------------------Use Effect-----------------------------
  useEffect(() => {
    getReports().then((data) => {
      setReports(data.content);
      setSearchResults(data);
      console.log(data);
    });
    getAppointments().then((data) => {
      setAppointments(data.content);
    });
    setReload(false);
  }, [reload]);

  //------------------------------New Report-----------------------------

  const handleNewReport = (event) => {
    if (event.target.name === "appointment") {
      setNewReport({
        ...newReport,
        appointment: {
          id: event.target.value,
        },
      });
    } else {
      setNewReport({
        ...newReport,
        [event.target.name]: event.target.value,
      });
    }
    console.log(newReport);
  };

  const handleNewReportBtn = () => {
    createReport(newReport)
      .then(() => {
        console.log(newReport);
        setReload(true);
        setNewReport({
          title: "",
          diagnosis: "",
          price: "",
          appointment: {
            id: "",
          },
        });
      })
      .catch((error) => {
        setAlert(1);
        setTimeout(() => {
          setAlert(0); //ayni randevuya ait rapor varsa alert!
        }, 3000);
      });
  };

  //------------------------------Delete Report-----------------------------
  const handleDelete = (id) => {
    deleteReport(id).then(() => {
      setReload(true);
    });
  };

  //------------------------------Update Appointment-----------------------------
  const handleUpdateReportInputs = (event) => {
    if (event.target.name === "appointment") {
      setUpdateReport({
        ...updateReport,
        appointment: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateReport({
        ...updateReport,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdateReportBtn = () => {
    updateReportFunc(updateReport)
      .then(() => {
        setReload(true);
        setUpdateReport({
          title: "",
          diagnosis: "",
          price: "",
          appointment: {
            id: "",
          },
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleUpdateIcon = (report) => {
    setUpdateReport({
      title: report.title,
      diagnosis: report.diagnosis,
      price: report.price,
      appointment: report.appointment,
      id: report.id,
    });
  };

  //------------------------------Search Report-----------------------------
  const handleSearch = () => {
    const filteredReport = searchResults.filter((report) =>
      report.title.toLowerCase().includes(search.toLowerCase())
    );
    setReports(filteredReport);
    setSearch("");
  };

  const handleReset = () => {
    setSearch("");
    setReports(searchResults);
  };

  return (
    <div className="container">
      <div className="newReport">
        <h1>Report Management</h1>
        <h3>Add Report</h3>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={newReport.title}
          onChange={handleNewReport}
        />
        <input
          type="text"
          placeholder="diagnosis"
          name="diagnosis"
          value={newReport.diagnosis}
          onChange={handleNewReport}
        />
        <input
          type="number"
          placeholder="price"
          name="price"
          value={newReport.price}
          onChange={handleNewReport}
        />

        <select
          value={newReport.appointment.id}
          name="appointment"
          onChange={handleNewReport}
        >
          <option value="" disabled={true} selected={true}>
            Select appointment
          </option>
          {appointments?.map((appointment) => {
            return (
              <option value={appointment.id}>
                {appointment.appointmentDate}
              </option>
            );
          })}
        </select>

        <button onClick={handleNewReportBtn}>Create</button>
        {alert === 1 ? (
          <Alert severity="error">
            Please review the information and try again!
          </Alert>
        ) : null}
      </div>

    
      <div className="updateReport">
        <h3>Update Report</h3>

        <input
          type="text"
          placeholder="title"
          name="title"
          value={updateReport.title}
          onChange={handleUpdateReportInputs}
        />

        <input
          type="text"
          placeholder="diagnosis"
          name="diagnosis"
          value={updateReport.diagnosis}
          onChange={handleUpdateReportInputs}
        />

        <input
          type="number"
          placeholder="price"
          name="price"
          value={updateReport.price}
          onChange={handleUpdateReportInputs}
        />

        <select name="appointment" onChange={handleUpdateReportInputs}>
          <option value="" disabled={true} selected={true}>
            Select appointment
          </option>
          {appointments?.map((appointment) => {
            return (
              <option value={appointment.id}>
                {appointment.appointmentDate}
              </option>
            );
          })}
        </select>

        <button onClick={handleUpdateReportBtn}>Update</button>
        {alert === 2 ? (
          <Alert severity="error">Please select a report!</Alert>
        ) : null}
      </div>

      
      <div className="searchBar">
        <h3>Search Report</h3>

        <input
          type="text"
          placeholder="Enter name... "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>
          Show All
        </button>
      </div>

      
      <div className="list">
        <h3>Report List</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Report Title</th>
                <th>Animal Name</th>
                <th>Diagnosis</th>
                <th>Doctor Name</th>
                <th>Customer</th>
                <th>Vaccine List</th>
                <th>Price</th>
                <th>Appointment Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports?.map((report) => (
                <tr key={report.id}>
                  <td>{report.title}</td>
                  <td>{report.appointment.animalName}</td>
                  <td>{report.diagnosis}</td>
                  <td>{report.appointment.doctorName}</td>
                  <td>{report.appointment.customerName}</td>
                  <td>
                    {report.vaccineList?.map((vaccineLists) => (
                      <span>{vaccineLists.name} , </span>
                    ))}
                  </td>
                  <td>{report.price}</td>
                  <td>{report.appointment.appointmentDate}</td>

                  <td>
                    <span onClick={() => handleUpdateIcon(report)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(report.id)}>
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
export default Report;