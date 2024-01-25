import React, { useEffect, useRef } from 'react'
import "./Sidebar.css"
import SidebarOption from './SidebarOptions'
import { Link, useNavigate } from "react-router-dom"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useRecoilState } from 'recoil';
import { ProfileState } from '../../../recoil/modelAtom';

const HomeIconImage = './images/icon/home.png'; // Replace with the actual path to your image
const ExploreIconImage = './images/icon/explore.png'; // Replace with the actual path to your image
const NotificationsIconImage = './images/icon/notifications.png'; // Replace with the actual path to your image
const MessagesIconImage = './images/icon/messages.png'; // Replace with the actual path to your image
const BookmarksIconImage = './images/icon/bookmarks.png'; // Replace with the actual path to your image
const ListsIconImage = './images/icon/lists.png'; // Replace with the actual path to your image
const ProfileIconImage = './images/icon/profile.png'; // Replace with the actual path to your image
const MoreIconImage = './images/icon/more.png'; // Replace with the actual path to your image

function Sidebar() {
  const user = JSON.parse(sessionStorage.getItem('AuthToken'));
  const [navProf, setNavProf] = useRecoilState(ProfileState);

  const navigate = useNavigate();

  return (
    <div className='sidebar'>
      <div>
        <img class="ariaplusicon" src="./images/ariaplus.svg" alt="ariaplusicon" style={{ marginRight: "-1rem" }} />
        <ul>
          <li onClick={() => navigate("/home")}><SidebarOption active text="Explore" Icon={<img src={ExploreIconImage} alt="Explore" />} /></li>
          <li><SidebarOption text="Explore" Icon={<img src={HomeIconImage} alt="Home" />} /></li>
          <li><SidebarOption text="Notifications" Icon={<img src={NotificationsIconImage} alt="Notifications" />} /></li>
          <li onClick={() => navigate('/messages')}><SidebarOption text="Messages" Icon={<img src={MessagesIconImage} alt="Messages" />} /></li>
          <li> <SidebarOption text="Bookmarks" Icon={<img src={BookmarksIconImage} alt="Bookmarks" />} /></li>
          <li><SidebarOption text="Lists" Icon={<img src={ListsIconImage} alt="Lists" />} /></li>
          <li onClick={() => navigate('/profile')}><SidebarOption text="Profile" Icon={<img src={ProfileIconImage} alt="Profile" />} /></li>
          <li><SidebarOption text="More" Icon={<img src={MoreIconImage} alt="More" />} /></li>

          <Fab color="primary" aria-label="add">
            <p>Tweet</p>
            <AddIcon />
          </Fab>
        </ul>
      </div>

      <div className='logout-sec' onClick={() => {
        sessionStorage.removeItem('AuthToken');
        navigate('/signin');
      }}>
        {user.displayName === "" ? <>
          <div className='user-img'>
            <h2>{user.email[0]}</h2>
          </div>
          <div className='logout-bar'>
            <p>{user.email.split("@")[0]}</p>
            <p>@{user.email.split("@")[0]}</p>
          </div>
        </> : <>
          <div className='user-img'>
            <img src={user.photoURL} alt="user-img" />
          </div>
          <div className='logout-bar'>
            <p>{user.displayName}</p>
            <p>@{user.email.split("@")[0]}</p>
          </div>
        </>}
      </div>
    </div>
  )
}

export default Sidebar
