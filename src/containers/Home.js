import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="container">
      <div className="jumbotron custom-jumbotron mt-5">
        <h1 className="display-4">Welcome Auth System!</h1>
        <p className="lead">
          This is an incrediable auhentiacation system with production level
          features!
        </p>
        <hr className="my-4" />
        <p>Click the Log In button</p>
        <Link className="btn btn-primary btn-lg" to="/login" role="button">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
