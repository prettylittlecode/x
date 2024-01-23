import "./signup.css"
import React, { useState } from "react";
import { Twitter } from "@material-ui/";
import { ExternalAuth } from "components/auth/ExternalAuth";
import { useNavigate } from "react-router-dom";
import { SignupForm } from "../../components/auth/ManualSignup";

export const Signup = () => {
  const user = JSON.parse(sessionStorage.getItem("AuthToken"));
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, []);

  console.log(user);

  return (
    <div className="signup-container">
      <div className="poster">
        <div className="Logo">
          <Twitter
            style={{
              color: "#ffffff",
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
      <div className="signup-form-container">
        <div className="head-content">
          <div>
            <Twitter
              style={{
                width: "50px",
                height: "auto",
              }}
            />
          </div>
          <div>
            <h1>Happening Now</h1>
          </div>
          <div>
            <h2>Join Twitter today</h2>
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
            </div>
          </div>
        </div>
      </div>
      {popup && <SignupForm trigger={popup} setTrigger={setPopup} />}
    </div>
  );
};
