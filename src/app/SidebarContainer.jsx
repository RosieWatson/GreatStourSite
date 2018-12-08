import React from 'react'
import { Layout, Collapse } from 'antd'

import SystemAvailability from './components/SystemAvailability'

class SidebarContainer extends React.Component {
  render () {
    const Panel = Collapse.Panel
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
      </Layout.Sider>
    )
  }
}

export default SidebarContainer