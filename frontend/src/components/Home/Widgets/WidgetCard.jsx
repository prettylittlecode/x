import React from 'react'
import "./WidgetCard.css"
function WidgetCard({tag, text, img}) {
  return (
    <div className='widgetCard'>
        <div className="widgetText">
            <p className='widgetTag'>{tag}</p>
            <p className='widgetContent'>{text}</p>
        </div>
        <div className="widgetImg">
            <img src={img} alt="" width="68" height="68" />
        </div>
    </div>
  )
}

export default WidgetCard
