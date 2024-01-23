import { useRecoilState } from "recoil";
import "./comment.css"
import { modelState, PostIdState } from "../../../recoil/modelAtom";
import { Fragment, useEffect, useState } from "react";
import {
  onSnapshot,
  doc,
  addDoc,
  collection,
  serverTimestamp,
} from "@firebase/firestore";
import { database } from "../../../firebase/firebaseconfig";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import Moment from "react-moment";

import Avatar from '@mui/material/Avatar';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Button from '@mui/material/Button';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export const CommentModel = () => {

  const user = JSON.parse(sessionStorage.getItem('AuthToken'));
let username;
let userImg;
if (user.displayName !== ""){
  username = user.displayName;
  userImg = user.photoURL;
}else {
  username = user.email.split("@")[0];
  userImg = "";
}
const tagno = Math.round(Math.random(255)*6);
const [IsOpen, setIsOpen] = useRecoilState(modelState);
const [postId, setPostId] = useRecoilState(PostIdState);
const [post, setPost] = useState();
const [comment, setComment] = useState("");
useEffect(
  () =>
    onSnapshot(doc(database, "posts", postId), (snapshot) => {
      setPost(snapshot.data());
    }),
  [database]
);

const sendComment = async (e) => {
  e.preventDefault();

  await addDoc(collection(database, "posts", postId, "comments"), {
    comment: comment,
    username: username,
    userImg: userImg,
    timestamp: serverTimestamp(),
  });

  setIsOpen(false);
  setComment("");
};
console.log(post);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={IsOpen}
      >
        <Button onClick={handleClose}>
          <CloseIcon/>
        </Button>
        <DialogContent>
          <div className="creator-div">
            <div className="creator-info">
              <div className="creator-img">
                {post?.userImg == "" ?  <Avatar/> : <img src={post?.userImg} alt="" />}
              </div>
              <div className="creator-name-div">
                <div className="creator-name-info">
                  <p>{post?.username}</p>
                  <p>@{post?.username.split(" ")[0]}{tagno}</p>
                  <p> • <Moment fromNow>{post?.timestamp?.toDate()}</Moment></p>
                </div>
                <div className="creator-post">
                  <p>{post?.caption}</p>
                </div>
              </div>
            </div>
            <div className="creator-tag">
              <p>Reply to <span>@{post?.username.split(" ")[0]}{tagno}</span></p>
            </div>
          </div>
          <div className="user-div">
            <div className="user-img-div">
              {user.displayName !== "" ? <img src={user.photoURL} alt="" /> : <Avatar/> }
            </div>
            <div className="reply">
              <textarea name="" id="" cols="30" rows="10" placeholder="Tweet your reply" onChange={(e)=> setComment(e.target.value)}/>
            </div>
          </div>
          <div className="icons-div">
            <div>
              <i className='bx bx-image-alt'></i>
              <i className='bx bx-poll'></i>
              <i className='bx bx-smile'></i>
              <i className='bx bx-calendar'></i>
            </div>
            <div>
            <Button disabled={!comment.trim()} onClick={sendComment}>Tweet</Button>
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>
  );
}
