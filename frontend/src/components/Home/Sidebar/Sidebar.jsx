import React,{useEffect, useRef} from 'react'
import "./Sidebar.css"
import SidebarOption from './SidebarOptions'
import HomeIcon from '@mui/icons-material/Home';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import {Link, useNavigate} from "react-router-dom"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useRecoilState } from 'recoil';
import { ProfileState } from '../../../recoil/modelAtom';

function Sidebar() {
  const user = JSON.parse(sessionStorage.getItem('AuthToken'));
  const [navProf,setNavProf] = useRecoilState(ProfileState);

  const navigate = useNavigate();
  return (
    <div className='sidebar'>
        <div>
          <TwitterIcon style={{marginRight: "-1rem"}}/>
          <ul>
              <li onClick={()=> navigate("/home")}><SidebarOption active text="Home" Icon={HomeIcon}/></li>
            <li><SidebarOption text="Explore" Icon={TagRoundedIcon}/></li>
              <li><SidebarOption text="Notifications" Icon={NotificationsNoneRoundedIcon}/></li>
              <li><SidebarOption text="Messages" Icon={MailOutlineRoundedIcon}/></li>
              <li> <SidebarOption text="Bookmarks" Icon={BookmarkBorderRoundedIcon}/></li>
              <li><SidebarOption text="Lists" Icon={ArticleOutlinedIcon}/></li>
              <li onClick={()=> navigate('/profile')}><SidebarOption text="Profile" Icon={PermIdentityOutlinedIcon}/></li>
              <li><SidebarOption text="More" Icon={PendingOutlinedIcon}/></li>

              <Fab color="primary" aria-label="add">
                <p>Tweet</p>
                <AddIcon />
              </Fab>
          </ul>
        </div>
        
        <div className='logout-sec' onClick={()=>{
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
          </> }
        </div>
    </div>
  )
}

export default Sidebar
