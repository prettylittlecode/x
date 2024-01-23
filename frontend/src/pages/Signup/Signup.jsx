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
                    <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style="width: 50px; height: auto;"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path></svg>
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
