import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="jumbotron">
      <h1>Zubby Online Courses</h1>
      <p>React, Flux, and React Router fro ultra-responsive web apps. </p>
      <Link to="/about" className="btn btn-primary">
        About
      </Link>
    </div>
  );
};

export default HomePage;
