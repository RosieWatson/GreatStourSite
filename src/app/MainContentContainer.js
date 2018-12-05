import React from 'react'
import { Layout } from 'antd'

import Map from './components/Map'

class MainContentContainer extends React.Component {
  render () {
    const { sensorData } = this.props
    return (
      <Layout.Content>
        <Map sensorData={sensorData} />
      </Layout.Content>
    )
  }
}

export default MainContentContainer