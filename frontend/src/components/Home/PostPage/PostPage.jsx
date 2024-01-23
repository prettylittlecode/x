import { useEffect, useState } from 'react'
import "../Feed/Feed.css"
import {Post} from '../Feed/Post'
import { onSnapshot, collection, query, orderBy,doc } from "@firebase/firestore";
import { database } from "../../../firebase/firebaseconfig"
import { useParams } from 'react-router-dom';
import { Comment } from '../../../pages/postpage/Comment';

export const PostPage = () => {

    const {id} = useParams();
    const [post,setPost] = useState();
    const [comments,setComments] = useState([]);
    useEffect(
        () =>
          onSnapshot(doc(database, "posts", id), (snapshot) => {
            setPost(snapshot.data());
          }),
        [database]
      );
    
      useEffect(
        () =>
          onSnapshot(
            query(
              collection(database, "posts", id, "comments"),
              orderBy("timestamp", "desc")
            ),
            (snapshot) => setComments(snapshot.docs)
          ),
        [database, id]
      );
console.log(post,id);
  return (
    <div className='feed'>

        {/* Header */}
        <div className='feed_header'>
            <span>Tweets</span>
        </div>
        {/* Posts  */}
        <Post key={id} id={id} post={post}/>
        {comments.length > 0 && (
            <div>
                {comments.map((el)=>{
                    return <Comment key={el.id} id={el.id} post={el.data()}/>
                })}
            </div>
        )}
    </div>

  )
}



