import { useEffect, useState } from 'react'
import "./Feed.css"
import {Post} from './Post'
import { Tabs, Tab } from "react-twitter-tabs";
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
    <div className="App">
      <Tabs>
        <Tab label={"One"}>{" className='feed'>

        {/* Header */}
        <div className='feed_header'>
            <span>Home</span>
        </div>

        {/* tweet box */}
        <TweetBox/>
      
        <img class="headerimage" src="./images/wallpaperflare.com_wallpaper(11).jpg" alt=""/>
        {/* Posts  */}
        {tweets.map((el,idx)=>{
          return <Post key={el.id} id={el.id} post={el.data()}/>
        })}"}</Tab>

        <Tab label={"Two"}>{"Two Content"}</Tab>

        <Tab label={"Three"}>{"Three Content"}</Tab>

        <Tab label={"Four"}>{"Four Content"}</Tab>

        <Tab label={"Five"}>{"five Content"}</Tab>

        <Tab label={"Six"}>{"Six Content"}</Tab>

        <Tab label={"Seven"}>{"seven Content"}</Tab>

        <Tab label={"Eight"}>{"eight Content"}</Tab>

        <Tab label={"Nine"}>{"nine Content"}</Tab>

        <Tab label={"Ten"}>{"ten Content"}</Tab>

        <Tab label={"Eleven"}>{"eleven Content"}</Tab>
      </Tabs>
    </div>
  )
}

export default Feed
