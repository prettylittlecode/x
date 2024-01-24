import "./signup.css";
import { AriaPlusIcon } from './src/ariaplus';
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
          <AriaPlusIcon
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
            <AriaPlusIcon style={{ width: "50px", height: "auto" }} />
          </div>
          <div>
            <h1>Happening Now</h1>
          </div>
          <div>
            <h2>Join Twitter today</h2>
          </div>
        </div>
        <div className="signup-box">
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
    </div>
  );
};
