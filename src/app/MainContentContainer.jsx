import React from 'react'
import { Alert, Layout } from 'antd'

import Map from './components/Map'
import FloodAlert from './components/FloodAlert'

class MainContentContainer extends React.Component {
  render () {
    return (
      <Layout.Content>
        <FloodAlert 
          floodAdviceModalOpen={this.props.floodAdviceModalOpen}
          floodData={this.props.floodData}
          toggleFloodAdviceModal={this.props.toggleFloodAdviceModal}
          />
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