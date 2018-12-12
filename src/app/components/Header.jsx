import React from 'react'
import { Layout } from 'antd'

import TestMode from './TestMode'

const Header = (props) => {
  return (
    <Layout.Header className='d-flex justify-content-between align-items-center'>
      <div>
      <h1 id='logo'>Great Stour</h1>
      <h2>Flood dashboard</h2>
      </div>
      <div id='header-utility'>
        <TestMode 
          getFloodData={props.getFloodData}
          toggleSystemAvailability={props.toggleSystemAvailability}
          />
      </div>
    </Layout.Header>
  )
}

export default Header
