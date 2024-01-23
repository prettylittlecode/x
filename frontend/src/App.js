import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom"
import { Home } from './pages/home/Home';
import { Signin } from './pages/login/Login';
import { Signup } from './pages/Signup/Signup';
import { Feed } from './components/Home/Feed/Feed';
import { Profile } from './components/Home/Profile/Profile';
import { PostPage } from './components/Home/PostPage/PostPage';
import { ProfilePage } from './pages/profile/profilepage';
import { SingleTweetPage } from './pages/postpage/SinglePage';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/profile' element={<ProfilePage/>}></Route>
        <Route path='/tweet/:id' element={<SingleTweetPage/>}></Route>
      </Routes>
    </div>


  );
}

export default App;
