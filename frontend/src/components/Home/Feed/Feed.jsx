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
 <div class="top-nav">
        

        <div class="tab">
          <button class="tablinks active" id="defaultOpen" onclick="switchTabs(event, 'ForYou')">
            For You
          </button>
          <button class="tablinks" onclick="switchTabs(event, 'Trending')">
            Trending
          </button>
          <button class="tablinks" onclick="switchTabs(event, 'News')">
            News
          </button>
          <button class="tablinks" onclick="switchTabs(event, 'Sports')">
            Sports
          </button>
          <button class="tablinks" onclick="switchTabs(event, 'Entertainment')">
            Entertainment
          </button>
        </div>
      </div>

      <div id="ForYou" class="tabcontent" style="display: block;"/>
        <div class="tabs-main-img" style="background-image: linear-gradient( to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) ), url(&quot;https://prettylittlecode.github.io/w/i/feed/post/images/cover.jpg&quot;);margin-top: 10px;border-radius: 10px;width: auto;">
        </div>
          <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>/</title>
  <!-- Add your CSS file here -->
  <link rel="stylesheet" href="https://ariaplus.net/e/feed/css/feed.css">
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

        <div id="Trending" class="tabcontent" style="display: block;">
        <h3 style="margin: 1rem">Trends on Aria+</h3>
             <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>/</title><!-- Add your CSS file here --><link rel="stylesheet" href="feed.css"><div id="trends-container" style="margin-top: 25px;border-top: 1px solid #171717;"></div><!-- Include your JavaScript file after the products container --><script src="./e/trends/java/trends.js"></script></div>
    
     <div id="News" class="tabcontent" style="display: none;">
        <div class="news-main-img" style="background-image: linear-gradient( to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3) ), url(&quot;https://gfx.videobuster.de/archive/v/cKcADh-UilC4Dx42EazgQGgcz0lMkawsSUyRjAxJTJGaW1hmSUyRmpwZWclMkZlM2ZmNWPfOGZjqvtlYzZjMGXRqWQxYTDSMy5qcGcmcj1jd6wwMHiU7DA.jpg&quot;);margin-top: 10px;border-radius: 10px;">
          <h3 style="font-size: 100%;margin: 0px;padding: 0px;">World news · LIVE</h3>
          <p style="margin-bottom: 0px;font-size: 100%;">The latest updates from Iran as protests continue across the country</p></div>
             <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>/</title><!-- Add your CSS file here --><link rel="stylesheet" href="feed.css"><div id="news-container" style="margin-top: 25px;border-top: 1px solid #171717;"></div><!-- Include your JavaScript file after the products container --><script src="./e/news/java/news.js"></script></div>

     
       <div id="Sports" class="tabcontent" style="display: none;">
          <div class="news-main-img" style="background-image: linear-gradient( to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3) ), url(&quot;https://cdn.britannica.com/51/190751-050-147B93F7/soccer-ball-goal.jpg&quot;);margin-top: 10px;border-radius: 10px;">
          <h3 style="font-size: 100%;margin: 0px;padding: 0px;">World news · LIVE</h3>
          <p style="margin-bottom: 0px;font-size: 100%;">The latest updates from Iran as protests continue across the country</p>
        </div><h3 style="margin: 1rem">Top in Sports on Aria+</h3>
            <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>/</title><!-- Add your CSS file here --><link rel="stylesheet" href="feed.css"><div id="sports-container" style="margin-top: 25px;border-top: 1px solid #171717;"></div><!-- Include your JavaScript file after the products container --><script src="./e/sports/java/s.js"></script></div>

          
           
    
        <div id="Entertainment" class="tabcontent" style="display: block;">
          <div class="tabs-main-img" style="background-image: linear-gradient( to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3) ), url(&quot;https://cdn.theatertoolkit.com/media/majesticphx/features/backdrops/mean-girls-2024--me13948-Medium.jpg&quot;);margin-top: 10px;border-radius: 10px;">
            <h3>Entertainment · LIVE</h3></div>
             <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>/</title><!-- Add your CSS file here --><link rel="stylesheet" href="feed.css"><div id="entertainment-container" style="margin-top: 25px;border-top: 1px solid #171717;"></div><!-- Include your JavaScript file after the products container --><script src="./e/ent/java/e.js"></script></div>

      <script>
        function switchTabs(event, tabName) {
          var i, tabcontent, tablinks;
          tabcontent = document.getElementsByClassName("tabcontent");
          for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
          }
          tablinks = document.getElementsByClassName("tablinks");
          for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(
              " active",
              ""
            );
          }
          document.getElementById(tabName).style.display = "block";
          event.currentTarget.className += " active";
        }
      </script>
      <script>
        document.getElementById("defaultOpen").click();
      </script>
    </div>



  )
}

export default Feed
