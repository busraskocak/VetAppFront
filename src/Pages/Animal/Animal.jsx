import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
// import UpdateIcon from "@mui/icons-material/Update";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getAnimals,
  deleteAnimal,
  createAnimal,
  updateAnimalFunc,
  getAnimalByName,
} from "../../API/animal";

import { getCustomers } from "../../API/customer";
import { getAnimalByCustomerName } from "../../API/animal";
import "./Animal.css"

//------------------------------Use State-----------------------------

function Animal() {
  const [animals, setAnimals] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);

  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customer: "",
    id:""
  });

  const [updateAnimal, setUpdateAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customer: "",
    id: ""
  });

  
  useEffect(() => {
    getAnimals().then((data) => {
      setAnimals(data.content);
      setSearchResults(data.content);
    });
    getCustomers().then((data) => {
      setCustomers(data.content);
    });
    setReload(false);
  }, [reload]);



  const handleNewAnimal = (event) => {
    if (event.target.name === "customer") {
      setNewAnimal({
        ...newAnimal,
        customer: {
          id: event.target.value,
        },
      });
    } else {
      setNewAnimal({
        ...newAnimal,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleNewAnimalBtn = () => {
    createAnimal(newAnimal)
      .then(() => {
        setReload(true);
        setNewAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          dateOfBirth: "",
          customer: {
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
    deleteAnimal(id).then(() => {
      setReload(true);
    });
  };

 

  const handleUpdateAnimalInputs = (event) => {
    if (event.target.name === "customer") {
      setUpdateAnimal({
        ...updateAnimal,
        customer: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateAnimal({
        ...updateAnimal,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdateAnimalBtn = () => {
    updateAnimalFunc(updateAnimal)
      .then(() => {
        const updatedAnimals = animals.map(animal => {
          if (animal.id === updateAnimal.id) {
            return updateAnimal; // Güncellenen hayvanın yeni verileriyle değiştir
          }
          return animal; // Diğer hayvanlar aynen kalır
        });
        
        // State'i güncelle
        setAnimals(updatedAnimals);
        
        // State'i sıfırla
        setUpdateAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          dateOfBirth: "",
          customer: {
            id: "",
          },
          id: "",
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleUpdateIcon = (animal) => {
    setUpdateAnimal({
      name: animal.name,
      species: animal.species,
      breed: animal.breed,
      gender: animal.gender,
      colour: animal.colour,
      dateOfBirth: animal.dateOfBirth,
      customer: animal.customer,
      id: animal.id,
    });
  };

  
  const handleSearchAnimalByName = () => {
    getAnimalByName(search).then((data) => {
      setAnimals(data);
    });
    if (search != "") {
      setSearchResults(
        animals.filter((value) => {
          return value.name == search;
        })
      );
    } else {
      setSearchResults(animals);
    }
  };

  const handleSearchAnimalKeyup = () => {
    setSearchResults(
      animals.filter((value) => {
        return value.name.toLowerCase().indexOf(search.toLowerCase()) != -1;
      })
    );
  };

  const handleReset = () => {
    setSearch("");
    setAnimals(searchResults);
  };

  return (
    <div className="container">
    
      <div className="animal-newanimal">
        <h1>Animal Management</h1>
        <h3>Add Animal</h3>
        <input
          type="text"
          placeholder="Animal ID"
          name="id"
          value={newAnimal.id}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newAnimal.name}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Species"
          name="species"
          value={newAnimal.species}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Breed"
          name="breed"
          value={newAnimal.breed}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Gender"
          name="gender"
          value={newAnimal.gender}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Colour"
          name="colour"
          value={newAnimal.colour}
          onChange={handleNewAnimal}
        />
        <input
          type="date"
          placeholder="dateOfBirth"
          name="dateOfBirth"
          value={newAnimal.dateOfBirth}
          onChange={handleNewAnimal}
        />

        <select
          value={newAnimal.customer.id}
          name="customer"
          onChange={handleNewAnimal}
        >
          <option value="" disabled={true} selected={true}>
            Select customer
          </option>
          {customers?.map((customer) => {
            return <option value={customer.id}>{customer.name}</option>;
          })}
        </select>

        <button onClick={handleNewAnimalBtn}>Create</button>
        {alert === 1 ? (
          <Alert severity="error">
            Please review the information and try again!
          </Alert>
        ) : null}
      </div>

      {/*--------------------------Update Animal Input Button------------------------ */}
      <div className="animal-updateanimal">
        <h3>Update Animal</h3>

        <input
          type="text"
          placeholder="Animal ID"
          name="id"
          value={updateAnimal.id}
          onChange={handleUpdateAnimalInputs}
        />

        <input
          type="text"
          placeholder="Name"
          name="name"
          value={updateAnimal.name}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="text"
          placeholder="Species"
          name="species"
          value={updateAnimal.species}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="text"
          placeholder="Breed"
          name="breed"
          value={updateAnimal.breed}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="text"
          placeholder="Gender"
          name="gender"
          value={updateAnimal.gender}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="text"
          placeholder="Colour"
          name="colour"
          value={updateAnimal.colour}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="date"
          placeholder="dateOfBirth"
          name="dateOfBirth"
          value={updateAnimal.dateOfBirth}
          onChange={handleUpdateAnimalInputs}
        />
        <select
          value={updateAnimal.customer.id}
          name="customer"
          onChange={handleUpdateAnimalInputs}
        >
          <option value="" disabled={true} selected={true}>
            Select Customer
          </option>
          {customers?.map((customer) => {
            return <option value={customer.id}>{customer.name}</option>;
          })}
        </select>

        <button onClick={handleUpdateAnimalBtn}>Update</button>
        {alert === 2 ? (
          <Alert severity="error">Please select an animal!</Alert>
        ) : null}
      </div>

      {/*--------------------------Search Animal Input Button------------------------ */}

      <div className="search-bar-animal">
          <h3>Search Animal</h3>
          <input
            type="text"
            placeholder="Enter animal name... "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={handleSearchAnimalKeyup}
          />
           <button onClick={handleSearchAnimalByName}>Search</button> 
           <button onClick={handleReset}>
            Show All</button>   
      </div>

     
      <div className="list">
        <h3>Animal List</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Animal ID</th>
                <th>Name</th>
                <th>Species</th>
                <th>Breed</th>
                <th>Gender</th>
                <th>Colour</th>
                <th>Date of Birth</th>
                <th>Customer Name</th>
                <th>Islemler</th>
              </tr>
            </thead>
            <tbody>
              {searchResults?.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.id}</td>
                  <td>{animal.name}</td>
                  <td>{animal.species}</td>
                  <td>{animal.breed}</td>
                  <td>{animal.gender}</td>
                  <td>{animal.colour}</td>
                  <td>{animal.dateOfBirth}</td>
                  <td>{animal.customer.name}</td>

                  <td>
                    <span onClick={() => handleUpdateIcon(animal)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(animal.id)}>
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

export default Animal;