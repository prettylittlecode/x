import { useEffect, useState } from 'react'
import "./Feed.css"
import {Post} from './Post'
import { Tabs, Tab } from "react-twitter-tabs";
import TweetBox from './TweetBox'
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { database } from "../../../firebase/firebaseconfig"

function Feed() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(database, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setTweets(snapshot.docs.map((doc) => ({ id: doc.id, data: () => doc.data() })));
      }
    );

    return () => {
      unsubscribe();
    };
  }, [database]);

  return (
    <div className="App">
      <Tabs>
        <Tab label="One">
          <div className='feed'>
            {/* Header */}
            <div className='feed_header'>
              <span>Home</span>
            </div>

            {/* tweet box */}
            <TweetBox />

            <img className="headerimage" src="./images/wallpaperflare.com_wallpaper(11).jpg" alt="" />

            {/* Posts  */}
            {tweets.map((el, idx) => {
              return <Post key={el.id} id={el.id} post={el.data()} />
            })}
          </div>
        </Tab>

        {/* Add more content for other tabs here */}

      </Tabs>
    </div>
  )
}

export default Feed
