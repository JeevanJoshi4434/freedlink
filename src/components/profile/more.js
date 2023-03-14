import React from 'react'

const more = () => {
  return (
        <div className='moreDetailPost'>
          <div>
            <p>More</p>
            <span className='bar'></span>
          </div>
          <div>
            <p>Report</p>
            <div>
              <button>Suspicious, fake, or spam</button>
              <button>Adult content</button>
              <button>Violence or physical harm</button>
              <button>Harassment or hateful post</button>
            </div>
          </div>
        </div>
  )
}

export default more