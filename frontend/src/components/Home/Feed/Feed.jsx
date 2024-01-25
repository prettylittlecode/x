import { useEffect, useState } from 'react'
import "./Feed.css"
import {Post} from './Post'
import TweetBox from './TweetBox'
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { database } from "../../../firebase/firebaseconfig"
function Feed() {

  const [tweets,setTweets] = useState([]);
   useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(database, "posts"), orderBy("timestamp","desc")),
      (snapshot) => {
        setTweets(snapshot.docs);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [database]);

  return (
    <div className='feed'>

        {/* Header */}
        <div className='feed_header'>
            <span>Home</span>
        </div>

        {/* tweet box */}
        <TweetBox/>
      

        {/* Posts  */}
        {tweets.map((el,idx)=>{
          return <Post key={el.id} id={el.id} post={el.data()}/>
        })}
    </div>

  )
}

export default Feed
