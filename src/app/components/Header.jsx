import React from 'react'
import {Button, Layout} from 'antd'

import TestMode from './TestMode'

const Header = (props) => {
  return (
    <Layout.Header>
      <div id='logo'>Great Stour</div>
      <div id='header-utility'>
        <TestMode toggleSystemAvailability={props.toggleSystemAvailability}/>
      </div>
    </Layout.Header>
  )
}

export default Header
