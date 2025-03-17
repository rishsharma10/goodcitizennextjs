import { Button, Col, TypographyText, TypographyTitle } from '@/lib/AntRegistry'
import React, { useState } from 'react'

const OurStoryCard = ({span,lg,xl,xxl,img,title,desc}:any) => {
  const [show, setShow] = useState(false)
  return (
       <Col span={24} lg={12} xl={12} xxl={12}>
    <div className="our-story-right-col">
      <div className="our-story-image" style={{ height: 200 }}>
        <img src={img} alt="error" className='img-fluid' />
      </div>

      <div className="out-story-content-1 out-story-content">
        <TypographyTitle level={4}>{title}</TypographyTitle>
        {desc?.length > 950 ? show ? <p>{desc}</p> : <p>{`${desc?.slice(0,950)}...`}</p>:<p>{desc}</p>}
        {desc?.length > 950 && <Button onClick={() => setShow(!show)} className='p-0 m-0 fs-18 fw-bolder' color={`danger`} type='text'>{show?  "Read less": `Read more`}</Button>}
      </div>
    </div>
  </Col>
  )
}

export default OurStoryCard