import React from 'react'
import { Alert, Layout } from 'antd'

import Map from './components/Map'
import FloodAlert from './components/FloodAlert'
import AccessibilityStatement from './components/AccessibilityStatement'

class MainContentContainer extends React.Component {
  render () {
    return (
      <React.Fragment>
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
            <Layout.Footer>
              <AccessibilityStatement />
              This uses Environment Agency flood and river level data from the real-time data API (Beta)
            </Layout.Footer>
        </Layout.Content>
      </React.Fragment>
    )
  }
}

export default MainContentContainer