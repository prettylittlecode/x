import { useEffect, useState } from 'react'
import "./Feed.css"
import {Post} from './Post'
import TweetBox from './TweetBox'
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { database } from "../../../firebase/firebaseconfig"
function Feed() {

  const [selectedTab, setSelectedTab] = useState(0);
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
    <span style="font-size: 15px;font-family: helvetica;margin-right: 5px; onClick={() => setSelectedTab(0)} className={selectedTab === 0 ? 'active' : ''}>Home</span>
    <span onClick={() => setSelectedTab(1)} className={selectedTab === 1 ? 'active' : ''}>Tweet Box</span>
 </div>

 {/* Feed Tab */}
 {selectedTab === 0 && (
    <>
      <TweetBox />
      <img className="headerimage" src="./images/wallpaperflare.com_wallpaper(11).jpg" alt="" />
      {/* Posts */}
      {tweets.map((el, idx) => {
        return <Post key={el.id} id={el.id} post={el.data()} />;
      })}
    </>
 )}

 {/* Tweet Box Tab */}
 {selectedTab === 1 && <TweetBox />}
</div>

  )
}

export default Feed
