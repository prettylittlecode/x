import "./signup.css"
import { Twitter } from '@material-ui/icons';
import { ExternalAuth } from "../../components/auth/ExternalAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SignupForm } from "../../components/auth/ManualSignup";

export const Signup = ()=>{
    const user = JSON.parse(sessionStorage.getItem('AuthToken'));
    const navigate = useNavigate();
    useEffect(()=>{
        if (user){
            navigate('/home');
        }
    },[]);
    console.log(user);
    const [popup,setPopup] = useState(false);
    return <div className="signup-container">
        <div className="poster">
            <div className="Logo">
                <a href="https://www.ariaplus.net" class="link-flex" style="display: flex;position: fixed;margin-top: 40px;gap: 0px;text-decoration: none;color: white;height: 20px;align-self: center;background: black;">
          <img class="link-icon" src="https://pbs.twimg.com/profile_images/1647366627925819393/dx1_x24i_400x400.jpg" style="width: 60px;height: 60px;">
          
        <p class="link-text" style="color: black;width: 65px;"></p></a>
            </div>
        </div>
        <div className="signup-form-container">
            <div className="head-content">
                <div><Twitter style={
                    {
                       width: "50px",
                       height: "auto", 
                    }
                }/></div>
                <div>  
                    <h1>Happening Now</h1>
                </div>
                <div>
                    <h2>Join Twitter today</h2>
                </div>
            </div>
            <div className="signup-box">
                {/* {signup google and facebook buttons} */}
                <ExternalAuth text="Signup"/>
                <div className="divider">
                    <div></div>
                    <div>or</div>
                    <div></div>
                </div>
                <div className="manual-signup">
                    <div className="manual-btn">
                        <button onClick={()=>{
                            setPopup(true);
                        }}>Signup with email or phone</button>
                    </div>
                    <p>By signing up, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>, including <span>Cookie Use</span>.</p>
                </div>
            </div>
            <div className="signin-redirect-box">
                <p>Already have an account?</p>
                <button onClick={()=>{
                    navigate('/signin');
                }}>Signin</button>
            </div>
        </div>
        <SignupForm trigger={popup} setTrigger={setPopup}/>
    </div>
}
