import React,{useState,useEffect,useRef} from 'react'
import "./TweetBox.css"
import Avatar from '@mui/material/Avatar';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

import { database, storage } from "../../../firebase/firebaseconfig";
import {
  addDoc,
  collection, 
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

function TweetBox() {
    const user = JSON.parse(sessionStorage.getItem('AuthToken'));
    let userid;
    let name;
    let userimg;
    if (user.displayName !== ""){
        userid = user.uid
        name = user.displayName;
        userimg = user.photoURL;
    }else{
        userid = user.localId;
        name = user.email.split("@")[0];
        userimg = "";
    }

    const [input, setInput] = useState("");
    const [file,setFile] = useState(null);
    const fileref = useRef(null);
    const [emojis,setEmojis] = useState(false);
    const [loading,setLoading] = useState(false);
    const addImage = (e)=>{
        const reader = new FileReader();
        if (e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) =>{
            setFile(readerEvent.target.result);
        }
    }

    const postTweet = async()=>{
        if (loading) return;
        setLoading(true);
        const docRef = await addDoc(collection(database,"posts"),{
            userid: userid,
            username: name,
            userImg: userimg,
            caption: input,
            timestamp: serverTimestamp(),
        })
        const imgRef = ref(storage,`posts/${docRef.id}/image`);

        if (file){
            await uploadString(imgRef,file,"data_url").then(async()=>{
                const downloadURL = await getDownloadURL(imgRef);
                await updateDoc(doc(database,"posts",docRef.id),{
                    image: downloadURL,
                })
            })
        }

        setLoading(false);
        setInput("");
        setEmojis(false);
        setFile(null);   
    }
    const addEmojiToInput = (e)=>{
        let res = e.unified.split("-");
        let codeArray = [];
        res.forEach((el)=> codeArray.push("0x"+ el));
        let emoji = String.fromCodePoint(...codeArray);
        setInput(input + emoji);
    };
  return (
    <div className='tweetBox'>
        {!loading && (
            <>
                <div className='tweet_input'>
            <Avatar src={user.photoURL} sx={{ width: 50, height: 50, display: "flex", alignItems: "center",justifyContent: "center" }}/>
            <div className='input-box'>
                <textarea value={input} placeholder="What's happening?" onChange={(e)=> setInput(e.target.value)}/>
                {file && (
                    <div className='selectedfile-wrapper'>
                        <div className='clear-icon' onClick={()=>setFile(null)}>
                            <ClearIcon/>
                        </div>
                        <img src={file} alt="" className='selectedfile'/>
                    </div>
                )}
            </div>
        </div>
        <div className='tweetOptions'>
            <div className='tweetAttachment'>
                <div onClick={()=>{fileref.current.click()}}>
                <i className='bx bx-image-alt'></i>
                <input type="file" onChange={addImage} ref={fileref} hidden/>
                </div>
                <GifBoxOutlinedIcon/>
                <i className='bx bx-poll'></i>
                <div onClick={()=> setEmojis(!emojis)}>
                <i className='bx bx-smile'></i>
                </div>
                <i className='bx bx-calendar'></i>
                <LocationOnOutlinedIcon/>
            </div>
            <div className='tweetButton'>
                <Button disabled={!input.trim() && !file} variant="contained" onClick={postTweet}>&</Button>
            </div>
        </div>
        {emojis && (
            <Picker 
            onSelect={addEmojiToInput}
            style={{
                position: "absolute",
                maxWidth: "300px",
                borderRadius: "20px",
                marginLeft: "35px",
                zIndex: "2",
            }} theme="light"/>
        )}
            </>
        )}
        
    </div>
  )
}

export default TweetBox
