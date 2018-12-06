import React from 'react'
import { Layout, Button, Input, Row, Col, DatePicker, Collapse } from 'antd'

import SubscribeModal from './components/SubscribeModal.jsx'

class SidebarContainer extends React.Component {
  render () {
    const Panel = Collapse.Panel
    const { sensorData } = this.props
    return (
      <Layout.Sider 
        collapsible 
        collapsedWidth={48}
        reverseArrow
        >
        <div id="details-header">
          <h1>Details</h1>
        </div>
        
        <Collapse accordion>
          {sensorData.length && sensorData.map((sensor, index) => (
            <Panel header={sensor.description} key={`sensor-list-item-${index}`}>
              <p>{sensor.stationId}</p>
                <SubscribeModal/>
            </Panel>
          ))}
        </Collapse>
      </Layout.Sider>
    )
  }
}

export default SidebarContainer