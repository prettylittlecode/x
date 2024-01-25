import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Twitter } from '@material-ui/icons';
import { MdOutlineClear } from "react-icons/md";
import { getAuth, createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"

export const SignupForm = ({ trigger, setTrigger }) => {

    const navigate = useNavigate();
    const [method, setMethod] = useState("Email");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const auth = getAuth();

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.  
            }
        }, auth);
    }


    const HandleSignup = () => {


        if (email && password) {
            createUserWithEmailAndPassword(auth, email, password).then(() => {
                alert("By clicking 'OK,' you are indicating your acceptance and agreement to adhere to our terms and conditions. We encourage you to carefully review these terms, as they outline the rules and guidelines that govern your use of the Aria+ platform. Additionally, your click signifies your consent to abide by the various policies we have in place, designed to ensure a secure and enjoyable experience for all users. If you have any questions or concerns about our terms or policies, please don't hesitate to reach out to our support team. Thank you for choosing Aria+; we look forward to having you as part of our community")
                navigate('/signin');
            }).catch((err) => {
                console.log(err.message);
            })
        } else {
            if (otp.length === 6) {

                let confirmationResult = window.confirmationResult
                confirmationResult.confirm(otp).then((result) => {
                    const user = result.user;
                    alert("User Signed Up successfully!")
                    navigate('/signin');
                }).catch((error) => {
                    console.log(error)
                });
            } else {
                alert("Enter Correct Otp")
            }
        }


    }
    const generateOtp = () => {

        generateRecaptcha();
        console.log("hello");
        let appVerifier = window.recaptchaVerifier
        console.log(appVerifier);
        signInWithPhoneNumber(auth, phone, appVerifier)

            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                console.log(confirmationResult)
            }).catch((error) => {
                console.log(error);
            });
    }
    return trigger ? (
        <div className="outer-popup">
            <div className="popup-form">
                <button className="close-btn" onClick={() => {
                    setTrigger(false)
                }}><MdOutlineClear style={{
                    width: "25px",
                    height: "auto",
                    color: "white",
                }} /></button>
                <div className="back-btn">
                    <img src="./images/ariaplus.svg" style={
                        {
                            width: "50px",
                            height: "auto",
                            color: "white",
                            marginleft: "-10px"
    
                        }
                    } />
                </div>
                <div className="form">
                    <p>Create Your Account</p>
                    <div className="signup">
                        <div>
                            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        </div>
                        {method === "Email" ? <div>
                            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Create Password" onChange={(e) => setPassword(e.target.value)} />
                        </div> : <div>
                            <input type="number" placeholder="Phone Number" onChange={(e) => setPhone(`+91${e.target.value}`)} />

                            <button onClick={generateOtp}>submit</button>
                            <input type="password" placeholder="Enter OTP for Verification" onChange={(e) => {
                                let Otp = e.target.value
                                setOtp(Otp)
                            }} />

                        </div>}
                        <div>
                            {method === "Email" ? <a onClick={() => {
                                setMethod("Phone");
                            }}>use {"Phone"} instead</a> : <a onClick={() => {
                                setMethod("Email");
                            }}>use {"Email"} instead</a>}
                        </div>
                        <div>
                            <button onClick={HandleSignup}>Signup</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id='recaptcha-container'></div>
        </div>

    ) : "";
}
