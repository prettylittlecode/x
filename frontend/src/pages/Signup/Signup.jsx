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
               <Twitter style={
                    {
                        color: "#ffffff",
                        width: "100%",
                        height: "auto",
                    }
                }/>
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
                    <div></div>
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
