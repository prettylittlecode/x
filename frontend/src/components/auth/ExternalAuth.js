import FacebookIcon from '@mui/icons-material/Facebook';
import { FcGoogle } from 'react-icons/fc';
import { app } from "../../firebase/firebaseconfig";
import { GoogleAuthProvider,FacebookAuthProvider,getAuth,signInWithPopup } from "firebase/auth"
import { useNavigate } from 'react-router-dom';

export const ExternalAuth = ({text})=>{
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const auth = getAuth();

    const googleSignup = async()=>{
        await signInWithPopup(auth,googleProvider).then((res)=>{
            sessionStorage.setItem('AuthToken',JSON.stringify(res.user));
            console.log(res.user);
        }).catch((err)=>{
            console.log("wrong credentials");
        })
        const user = sessionStorage.getItem('AuthToken');
        if (user){
            navigate('/home');
         }else {
             alert('user Credentials is wrong');
         }
    }
    const facebookSignup = async()=>{
       await signInWithPopup(auth,facebookProvider).then((res)=>{
            sessionStorage.setItem('AuthToken',JSON.stringify(res.user));
            console.log(res.user);
        })
        const user = sessionStorage.getItem('AuthToken');
        if (user){
            navigate('/home');
         }else {
             alert('user Credentials is wrong');
         }
    }
    return ()
}
