import "./signup.css";
import { Twitter } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SignupForm } from "../../components/auth/ManualSignup";

export const Signup = () => {
  const user = JSON.parse(sessionStorage.getItem("AuthToken"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, []);

  console.log(user);

  const [popup, setPopup] = useState(false);

  return (
    <div className="signup-container">
      <div className="poster">
        <div className="Logo">
          <img src="./images/ariaplus.svg" style={{ color: "#ffffff", width: "100%", height: "auto",}} />
        </div>
      </div>
      <div className="signup-form-container">
        <div className="head-content">
          <div>
            <img class="ariapluslogo" src="./images/ariaplus.svg" alt="" />
          </div>
          <div>
            <h1>Everything Here</h1>
          </div>
          <div>
            <h2>Join Aria+ Now</h2>
          </div>
          <div>
            <p class="frontpageinfo">In order to securely sign up you need an Aria+ ID, which can be issued here ID and subscribe to the plans here Subscribe, and check out our Digital Policies</p>
          </div>
        </div>
        <div className="signup-box">
         <div className="manual-signup">
            <div className="manual-btn">
              <button onClick={() => { setPopup(true) }}>Signup Manually</button>
            </div>
          </div>
        </div>
          <div className="divider">
            <div></div>
            <div>or</div>
            <div></div>
          </div>
          <div className="manual-signup">
            <div className="manual-btn">
              <button onClick={() => { setPopup(true) }}>Signup Manually</button>
            </div>
          </div>
        </div>
        <div>
          <SignupForm trigger={popup} setTrigger={setPopup} />
        </div>
    </div>
  );
};
