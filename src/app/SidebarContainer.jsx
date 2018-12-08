import React from 'react'
import { Layout, Collapse } from 'antd'

import SystemAvailability from './components/SystemAvailability'

class SidebarContainer extends React.Component {
  render () {
    const Panel = Collapse.Panel
    const { Footer } = Layout
    const { sensorData, systemAvailability } = this.props
    return (
      <Layout.Sider
        breakpoint={'lg'}
        collapsible 
        collapsedWidth={48}
        reverseArrow
        >
        <div id="details-header">
          <SystemAvailability systemAvailability={systemAvailability} />
        </div>
        
        <Collapse accordion>
          {sensorData.length && sensorData.map((sensor, index) => {
            return (
              <Panel header={`${sensor.description} - ${sensor.deviceID || sensor.id}`} key={`sensor-list-item-${index}`}>
                <p>{sensor.stationId}</p>
              </Panel>
            )
          })}
        </Collapse>
        <Footer>
          Great Stour River - Flood Monitor
          <br/>
          This uses Environment Agency flood and river level data from the real-time data API (Beta)
        </Footer>
      </Layout.Sider>
    )
  }
}

export default SidebarContainer