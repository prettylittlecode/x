import "./Profile.css";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {Post} from "../Feed/Post";
import { useEffect, useState } from 'react'
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { database } from "../../../firebase/firebaseconfig"
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export  const Profile = () => {
  const user = JSON.parse(sessionStorage.getItem('AuthToken'));
  const navigate = useNavigate();
  let userId;
  let name;
  if (user.displayName !== ""){
    userId = user.uid;
    name = user.displayName;
  }else {
    userId = user.localId;
    name = user.email.split("@")[0];
  }
  console.log(userId);
  const [tweets,setTweets] = useState([]);
  useEffect(() => {
   const unsubscribe = onSnapshot(
     query(collection(database, "posts"), orderBy("timestamp","desc")),
     (snapshot) => {
      const posts = [];
      snapshot.docs.map((el)=>{
        if(el.data().userid == userId){
          posts.push(el);
        }
      })
       setTweets(posts);
     }
   );

   return () => {
     unsubscribe();
   };
 }, [database]);


  let type = "&'s";
  let userid = "X";
  let join_date = "24";
  let place = "USA";
  return (
    <div className="profile">
      <div className="name_div">
        <span className="profile_back_arrow" onClick={()=> navigate('/home')}>
          <ArrowBackSharpIcon />
        </span>
        <div>
          <p className="profile_name">{name}</p>
          <p>
            {tweets.length} {type}
          </p>
        </div>
      </div>
      <div className="profile_background_div">
        <img
          className="profile_background"
          src="https://media.istockphoto.com/id/1413630345/vector/illustration-of-flying-american-flag-memorial-day-or-constitution-day-of-united-states.jpg?s=612x612&w=0&k=20&c=9gakpue4Kksgin5HIDPhB_Y-AADbO5LDzPNaTSX20MU="
          alt=""
        />
      </div>
      <div className="profile_pic_div">
        {user.displayName == "" ? <Avatar style={{width: "100px", height: "100px" ,borderRadius: "5px", marginLeft: "-20px"}}/> : <img
          className="profile_pic"
          src={user.photoURL}
          alt=""
        />}

        <div className="">
          <p className="profile_pic_text">{name}</p>
          <p>@{user.email.split("@")[0]} </p>
        </div>
      </div>
      <div className="editprofile_btn">
        <button>Edit Profile</button>
      </div>
      <div className="profile_place_div">
        <LocationOnOutlinedIcon /> <p className="center_profile">{place} </p>
        <DateRangeRoundedIcon />
        <p className="center_profile"> {join_date} </p>
      </div>
      <div className="profile_follwer_div">
        <p>{"X"} Following</p>
        <p>{"X"} Followers</p>
      </div>
      <div className="profile_post_header">
        <div className="tweets">Tweets</div>
        <div className="tweetsnreply">Tweets&Reply</div>
        <div className="media">Media</div>
        <div className="likes">Likes</div>
      </div>
      <div>
        {tweets.map((el,idx)=>{
          return <Post key={el.id} id={el.id} post={el.data()}/>
        })}
      </div>
    </div>
  );
};
