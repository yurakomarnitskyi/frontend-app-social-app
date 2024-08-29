import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth";
import "./Activate.css";

const Verify = ({ verify }) => {
  const [verifyed, setVerifyed] = useState(false);
  const { uid, token } = useParams();

  const verify_account = (e) => {
    e.preventDefault();
    verify(uid, token);
    setVerifyed(true);
  };

  if (verifyed) {
    return <Navigate to="/" />;
  }

  return (
    <div className="parent-container">
      <div className="login_form">
        <form>
          <button onClick={verify_account} type="button">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { verify })(Verify);
