import { FloatButton } from 'antd'
import React from 'react'
import {
    UpOutlined,
  } from '@ant-design/icons';

const ScrollToTop = () => {
  return (
    <FloatButton.BackTop visibilityHeight={200} icon={<UpOutlined/>} />
  )
}

export default ScrollToTop