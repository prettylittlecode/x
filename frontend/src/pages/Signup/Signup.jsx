import "./signup.css"
import React, { useState } from "react";
import { Twitter } from '@material-ui/icons';
import { ExternalAuth } from "components/auth/ExternalAuth";
import "./signup.css";
import { Twitter } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SignupForm } from "../../components/auth/ManualSignup";

export const Signup = () => {
  const user = JSON.parse(sessionStorage.getItem("AuthToken"));
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (user) {
@@ -18,6 +16,8 @@ export const Signup = () => {

  console.log(user);

  const [popup, setPopup] = useState(false);

  return (
    <div className="signup-container">
      <div className="poster">
@@ -34,12 +34,7 @@ export const Signup = () => {
      <div className="signup-form-container">
        <div className="head-content">
          <div>
            <Twitter
              style={{
                width: "50px",
                height: "auto",
              }}
            />
            <Twitter style={{ width: "50px", height: "auto" }} />
          </div>
          <div>
            <h1>Happening Now</h1>
@@ -49,21 +44,21 @@ export const Signup = () => {
          </div>
        </div>
        <div className="signup-box">
          {/* {signup google and facebook buttons} */}
          <ExternalAuth text="Signup" />
          <div className="divider">
            <div></div>
            <div>or</div>
            <div></div>
          </div>
          <div className="manual-signup">
            <div className="manual-btn">
              <button onClick={() => setPopup(true)}>Sign up with email</button>
              <button onClick={() => { setPopup(true) }}>Signup Manually</button>
            </div>
          </div>
        </div>
        <div>
          <SignupForm trigger={popup} setTrigger={setPopup} />
        </div>
      </div>
      {popup && <SignupForm trigger={popup} setTrigger={setPopup} />}
    </div>
  );
};
