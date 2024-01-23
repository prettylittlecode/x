import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
  } from "firebase/firestore";
import { Avatar } from '@mui/material'
import { useEffect, useState } from "react";
import "../../components/Home/Feed/Post.css"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { modelState, PostIdState, TweetPageState } from "../../recoil/modelAtom";
import { database } from "../../firebase/firebaseconfig";
import { useNavigate } from "react-router-dom";

export const Comment = (props) => {

    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('AuthToken'));
    let userId;
    if (user.displayName!== ""){
        userId = user.uid;
    }else {
        userId = user.localId;
    }
    const [IsOpen,setIsOpen] = useRecoilState(modelState);
    const [postId,setPostId] = useRecoilState(PostIdState);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);
    
    useEffect(
        () =>
          onSnapshot(
            query(
              collection(database, "posts", props.id, "comments"),
              orderBy("timestamp", "desc")
            ),
            (snapshot) => setComments(snapshot.docs)
          ),
        [database, props.id]
      );
    
      useEffect(
        () =>
          onSnapshot(collection(database, "posts", props.id, "likes"), (snapshot) =>
            setLikes(snapshot.docs)
          ),
        [database, props.id]
      );
    
      useEffect(()=>{
          if (user.displayName !== ""){
            setLiked(
                likes.findIndex((like) => like.id === user.uid) !== -1
              )
          }else {
            setLiked(
                likes.findIndex((like) => like.id === user.localId) !== -1
              )
          }
      },[likes])
    
      const likePost = async () => {
        if (user.displayName !== ""){
            if (liked) {
                await deleteDoc(doc(database, "posts", props.id, "likes", user.uid));
              } else {
                await setDoc(doc(database, "posts", props.id, "likes", user.uid), {
                  username: user.displayName,
                });
              }
        }else {
            if (liked) {
                await deleteDoc(doc(database, "posts", props.id, "likes", user.localId));
              } else {
                await setDoc(doc(database, "posts", props.id, "likes", user.localId), {
                  username: user.email.split("@")[0],
                });
              }
        }
      };
  return (
    <div className='post' onClick={()=>navigate(`/tweet/${props.id}`)}>
        <div className="post_avatar">
            <Avatar src={props.post?.userImg} sx={{ width: 50, height: 50 }}/>
        </div>
        <div className="post_body">
            <div className="post_header">
                <div className="post_headerNames">
                    <h3 style={{fontWeight: "500"}}>{props.post?.username}</h3>
                    <p> • <span>
                        <Moment fromNow>{props.post?.timestamp?.toDate()}</Moment>
                        </span> </p>
                </div>
                <div className="post_options">
                    <MoreHorizIcon/>
              </div>
            </div>
            <div className="post_description">
                <p>{props.post?.comment}</p>
            </div>
            <div className="post_actions">
                <div className="comment-btn" onClick={(e)=>{
                    e.stopPropagation();
                    setPostId(props.id);
                    setIsOpen(true);
                }}>
                    <i className='bx bx-message-rounded'></i> 
                    {comments.length > 0 && (
                        <span>{comments.length}</span>
                    )}
                </div>
                {userId === props.post?.userid ? <div className="delete-btn" onClick={(e)=>{
                    e.stopPropagation();
                    deleteDoc(doc(database,"posts",props.id));
                }}>
                    <i className='bx bx-trash'></i> 
                </div>: <div className="retweet-btn">
                    <i className='bx bx-repost'></i>
                </div>}
                <div className="like-btn" onClick={(e)=>{
                    e.stopPropagation();
                    likePost();
                }}>
                    {liked ? (
                        <>
                        <i className='bx bxs-heart liked'></i> {likes.length > 0 && (
                            <span>{likes.length}</span>
                        )}
                        </>
                    ) : (
                        <>
                        <i className='bx bx-heart'></i> {likes.length > 0 && (
                            <span>{likes.length}</span>
                        )}
                        </>
                    )}
                </div>
                <div className="upload-btn">
                    <i className='bx bx-upload'></i>
                </div>
            </div>
        </div>
    </div>
  )
}
