import React from 'react'
import { Link } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import "./Home.css"

function Home() {
  return (
    <div className="home-container">
    <PetsIcon className="logo" />
    <h2 className="home-text">Vet Management System</h2>
    <Link to="/customer" className="login-btn">Welcome</Link>
  </div>
  )
}

export default Home