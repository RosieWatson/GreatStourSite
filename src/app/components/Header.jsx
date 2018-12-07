import React from 'react'
import {Button, Layout} from 'antd'

const Header = (props) => {
  return (
    <Layout.Header>
      <div id='logo'>Great Stour</div>
      <div id='header-utility'>
        <Button block type='primary' icon='robot' size='large'>Test Mode</Button>
      </div>
    </Layout.Header>
  )
}

export default Header
