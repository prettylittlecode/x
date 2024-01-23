import React from 'react'
import WidgetCard from './WidgetCard'
import "./Widgets.css"

function Widgets() {

  const widgetData = [
    {
      tag: "Business & finance",
      text: "Stock markets crash as Russia announces a ‘special military operation’ in Ukraine",
      img: "https://pbs.twimg.com/semantic_core_img/1495544969305591809/7a5Hjrfp?format=jpg&name=240x240"
    },
    {
      tag:"World news",
      text:"Multiple fatalities confirmed as Ukraine says 'full-scale invasion' by Russia is underway",
      img:"https://pbs.twimg.com/semantic_core_img/1496698017776214016/RBNwIUlF?format=jpg&name=240x240"
    },
    {
      tag: "Ukraine conflict",
      text: "Ukrainian troops fight Russian advance on Kyiv",
      img: "https://pbs.twimg.com/semantic_core_img/1496698017776214016/RBNwIUlF?format=jpg&name=240x240" 
    },
    {
      tag: "Ukraine conflict",
      text: "Indian students stranded in Ukraine seek help to come home",
      img: "https://pbs.twimg.com/ext_tw_video_thumb/1496837621510770691/pu/img/ZtQoIVT6NYeJqYYu?format=jpg&name=240x240"
    }
  ];
  
  return (
    <div className='widgets'>
      <div className="widgetWrapp">
        <div className="searchTwitter">
            <i className='bx bx-search'></i>
            <input type="text" placeholder='Search Twitter'/>
        </div>
        <div className='widgetFeed'>
          <div className="widgetHeader">
            What's happening
          </div>
          {widgetData.map((e,idx)=>{
            return(
            <WidgetCard key={idx} tag={e.tag} text={e.text} img={e.img}/>
            )
          })}
          
        </div>

      </div>

    </div>
  )
}

export default Widgets
