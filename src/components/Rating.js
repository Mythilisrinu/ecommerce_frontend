import React from 'react'

function Rating({ value = 0, text = '0', colour = '#f8ca00' }) {
  const renderStar = (starIndex) => {
    if (value >= starIndex + 1) {
      return <span key={starIndex} style={{color: colour}}>★</span>
    } else if (value >= starIndex + 0.5) {
      return (
        <span key={starIndex} style={{position: 'relative', display: 'inline-block', color: colour}}>
          <span style={{position: 'absolute', overflow: 'hidden', width: '50%'}}>★</span>
          <span style={{color: '#ccc'}}>☆</span>
        </span>
      )
    } else {
      return <span key={starIndex} style={{color: '#ccc'}}>☆</span>
    }
  }

  return (
    <div className='rating'>
        <span style={{fontSize: '20px', cursor: 'pointer'}}>
            {renderStar(0)}{renderStar(1)}{renderStar(2)}{renderStar(3)}{renderStar(4)}
        </span>
        <span className='rating-text'>{text}</span>
    </div>
  )
}

export default Rating
