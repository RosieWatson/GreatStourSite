import React from 'react'
import { Layout } from 'antd';

import Map from './components/Map'

class MainContentContainer extends React.Component {
  render () {
    return (
      <Layout.Content>
        <Map />
      </Layout.Content>
    )
  }
}

export default MainContentContainer