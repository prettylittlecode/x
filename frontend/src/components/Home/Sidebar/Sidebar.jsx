import React,{useEffect, useRef} from 'react'
import "./Sidebar.css"
import SidebarOption from './SidebarOptions'
import AriaPlusIcon from '../../../components/icons/AriaPlus';
import ExploreIcon from '../../../components/icons/Explore';
import BellIcon from '../../../components/icons/Notifications';
import MessagesIcon from '../../../components/icons/Messages';
import AiIcon from '../../../components/icons/Ai';
import TvIcon from '../../../components/icons/Tv';
import MusicIcon from '../../../components/icons/Music';
import MarketIcon from '../../../components/icons/Market';
import GameIcon from '../../../components/icons/Games';
import ComsIcon from '../../../components/icons/Coms';
import EventsIcon from '../../../components/icons/Events';
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
          <img class="ariaplusicon" src="./images/ariaplus.svg" alt="ariaplusicon" style={{marginRight: "-1rem"}}/>
          <ul>
              <li onClick={()=> navigate("/home")}><SidebarOption text="Explore" Icon={ExploreIcon}/></li>
              <li><SidebarOption text="Notifications" Icon={BellIcon}/></li>
              <li onClick={()=> navigate('/messages')}><SidebarOption text="Messages" Icon={MessagesIcon}/></li>
              <li> <SidebarOption text="Ai" Icon={AiIcon}/></li>
              <li><SidebarOption text="tv" Icon={TvIcon}/></li>
              <li><SidebarOption text="Music" Icon={MusicIcon}/></li>
              <li><SidebarOption text="Market" Icon={MarketIcon}/></li>
              <li><SidebarOption text="Games" Icon={GameIcon}/></li>
              <li onClick={()=> navigate('/profile')}><SidebarOption text="Profile" Icon={PermIdentityOutlinedIcon}/></li>

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
