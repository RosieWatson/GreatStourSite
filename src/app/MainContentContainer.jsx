import React from 'react'
import {Alert, Layout} from 'antd'

import Map from './components/Map'

class MainContentContainer extends React.Component {
  render () {
    return (
      <Layout.Content>
        <Alert message="Flood Warning banner!" banner> </Alert>
        <Map 
          mapApiLoaded={this.props.mapApiLoaded} 
          selectSensor={this.props.selectSensor} 
          sensorData={this.props.sensorData}
          setMapApiLoaded={this.props.setMapApiLoaded} 
          />
      </Layout.Content>
    )
  }
}

export default MainContentContainer