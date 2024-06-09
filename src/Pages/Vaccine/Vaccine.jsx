import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getVaccines,
  deleteVaccine,
  createVaccine,
  updateVaccineFunc,
} from "../../API/vaccine";

import { getAnimals } from "../../API/animal";
import { getReports } from "../../API/report";
import { getVaccinesByDate } from "../../API/vaccine";
import { getVaccineByName } from "../../API/vaccine";
import { getVaccineByAnimalName } from "../../API/vaccine";
import "./Vaccine.css"


function Vaccine() {
  const [vaccines, setVaccines] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [animalSearch, setAnimalSearch] = useState("");
  const [animals, setAnimals] = useState([]);
  const [reports, setReports] = useState([]);
  const [update,setUpdate] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [alert, setAlert] = useState(0);

  const [newVaccine, setNewVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animal: "",
    report: "",
  });

  const [updateVaccine, setUpdateVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animal: "",
    report: "",
  });

 
  useEffect(() => {
    getVaccines().then((data) => {
      setVaccines(data.content);
      setSearchResults(data);
    });
    getAnimals().then((data) => {
      setAnimals(data.content);
    });
    getReports().then((data) => {
      setReports(data.content);
    });
    setUpdate(false);
  }, [update]);

 
  const handleNewVaccine = (event) => {
    if (event.target.name === "animal") {
      setNewVaccine({
        ...newVaccine,
        animal: {
          id: event.target.value,
        },
      });
    } else if (event.target.name === "report") {
      setNewVaccine({
        ...newVaccine,
        report: {
          id: event.target.value,
        },
      });
    } else {
      setNewVaccine({
        ...newVaccine,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleNewVaccineBtn = () => {
    console.log(newVaccine);
    createVaccine(newVaccine)
      .then(() => {
        console.log(newVaccine);
        setUpdate(true);
        setNewVaccine({
          name: "",
          code: "",
          protectionStartDate: "",
          protectionFinishDate: "",
          animal: {
            id: "",
          },
          report: {
            id: "",
          },
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
    deleteVaccine(id).then(() => {
      setUpdate(true);
    });
  };

 
  const handleUpdateVaccineInputs = (e) => {
    if (e.target.name === "animal") {
      setUpdateVaccine({
        ...updateVaccine,
        animal: {
          id: e.target.value,
        },
      });
    } else if (e.target.name === "report") {
      setUpdateVaccine({
        ...updateVaccine,
        report: {
          id: e.target.value,
        },
      });
    } else {
      setUpdateVaccine({
        ...updateVaccine,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUpdateVaccineBtn = () => {
    updateVaccineFunc(updateVaccine)
      .then(() => {
        setUpdate(true);
        setUpdateVaccine({
          name: "",
          code: "",
          protectionStartDate: "",
          protectionFinishDate: "",
          animal: {
            id: "",
          },
          report: {
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

  const handleUpdateIcon = (vaccine) => {
    setUpdateVaccine({
      name: vaccine.name,
      code: vaccine.code,
      protectionStartDate: vaccine.protectionStartDate,
      protectionFinishDate: vaccine.protectionFinishDate,
      animal: vaccine.animal,
      report: vaccine.report,
      id: vaccine.id,
    });
  };

  
  const handleSearchVaccineByName = () => {
    getVaccineByName(nameSearch).then((data) => {
      setVaccines(data);
    });
  };

  const handleSearchVaccineByAnimalName = () => {
    getVaccineByAnimalName(animalSearch).then((data) => {
      setVaccines(data);
    });
  };

  const handleSearchByDates = () => {
    getVaccinesByDate(startDate, endDate).then((data) => {
      setVaccines(data);
    });
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setNameSearch("");
    setAnimalSearch("");
    setVaccines(searchResults);
  };

  return (
    <>
      
      <div className="vaccine-newvaccine">
        <h1>Vaccine Management</h1>
        <h3>Add Vaccine</h3>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newVaccine.name}
          onChange={handleNewVaccine}
        />
        <input
          type="text"
          placeholder="Code"
          name="code"
          value={newVaccine.code}
          onChange={handleNewVaccine}
        />
        <input
          type="date"
          placeholder="Protection Start Date"
          name="protectionStartDate"
          value={newVaccine.protectionStartDate}
          onChange={handleNewVaccine}
        />
        <input
          type="date"
          placeholder="Protection Finish Date"
          name="protectionFinishDate"
          value={newVaccine.protectionFinishDate}
          onChange={handleNewVaccine}
        />
        <select
          value={newVaccine.animal.id}
          name="animal"
          onChange={handleNewVaccine}
        >
          <option key="" value="" disabled={true} selected={true}>
            Select Animal
          </option>
          {animals?.map((animal) => {
            return <option key={animal.id}  value={animal.id}>{animal.name}</option>;
          })}
        </select>
        <select
          value={newVaccine.report.id}
          name="report"
          onChange={handleNewVaccine}
        >
          <option value="" disabled={true}>
            Select Report
          </option>
          {reports?.map((report) => {
            return <option value={report.id}>{report.title}</option>;
          })}
        </select>
        <button onClick={handleNewVaccineBtn}>Create</button>
        {alert === 1 ? (
          <Alert severity="error">
            Please review the information and try again!
          </Alert>
        ) : null}
      </div>

   
      <div className="vaccine-updatevaccine">
        <h3>Update Vaccine</h3>

        <input
          type="text"
          placeholder="Name"
          name="name"
          value={updateVaccine.name}
          onChange={handleUpdateVaccineInputs}
        />

        <input
          type="text"
          placeholder="Code"
          name="code"
          value={updateVaccine.code}
          onChange={handleUpdateVaccineInputs}
        />

        <input
          type="date"
          placeholder="Protection Start Date"
          name="protectionStartDate"
          value={updateVaccine.protectionStartDate}
          onChange={handleUpdateVaccineInputs}
        />

        <input
          type="date"
          placeholder="Protection Finish Date"
          name="protectionFinishDate"
          value={updateVaccine.protectionFinishDate}
          onChange={handleUpdateVaccineInputs}
        />

        <select
          value={updateVaccine.animal.id}
          name="animal"
          onChange={handleUpdateVaccineInputs}
        >
          <option value="" disabled={true} selected={true}>
            Select Animal
          </option>
          {animals?.map((animal) => {
            return <option value={animal.id}>{animal.name}</option>;
          })}
        </select>

        <select
          value={updateVaccine?.report?.id ? updateVaccine.report.id : ""}
          name="report"
          onChange={handleUpdateVaccineInputs}
        >
          <option value="" disabled={true} selected={true}>
            Select Report
          </option>
          {reports?.map((report) => {
            return <option value={report.id}>{report.title}</option>;
          })}
        </select>

        <button onClick={handleUpdateVaccineBtn}>Update</button>
        {alert === 2 ? (
          <Alert severity="error">Please select a report!</Alert>
        ) : null}
      </div>

    
      <div className="searchBarVaccine">
        <div className="search-bar">
          <h3>Search Vaccine by Name</h3>

          <input
            type="text"
            placeholder="Enter vaccine name... "
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
          />
          <button onClick={handleSearchVaccineByName}>Search</button>
        </div>

        <div className="search-bar">
          <h3>Search Vaccine by Animal</h3>
          <input
            type="text"
            placeholder="Enter animal name... "
            value={animalSearch}
            onChange={(e) => setAnimalSearch(e.target.value)}
          />
          <button onClick={handleSearchVaccineByAnimalName}>Search</button>
        </div>

        <div className="search-bar">
          <h3>Search Vaccine by Date Range</h3>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={handleSearchByDates}>Search</button>
          <button className="reset-button" onClick={handleReset}>
            Show All
          </button>
        </div>
      </div>

      {/* ---------------------------List Vaccine------------------------ */}
      <div className="list">
        <h3>Vaccine List</h3>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Vaccine</th>
                <th>Vaccine Code</th>
                <th>Protection Starting Date</th>
                <th>Protection Due Date</th>
                <th>Animal Name</th>
                <th>Report Title</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {vaccines?.map((vaccine) => (
                <tr key={vaccine.id}>
                  <td>{vaccine.name}</td>
                  <td>{vaccine.code}</td>
                  <td>{vaccine.protectionStartDate}</td>
                  <td>{vaccine.protectionFinishDate}</td>
                  <td>{vaccine.animal?.name}</td>
                  <td>{vaccine.report?.title}</td>

                  <td>
                    <span onClick={() => handleUpdateIcon(vaccine)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(vaccine.id)}>
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

export default Vaccine;



