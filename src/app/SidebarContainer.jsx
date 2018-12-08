import React from 'react'
import { Alert, Layout, Button, Input, Row, Col, DatePicker, Collapse } from 'antd'
import ReactDOM from 'react-dom'

import SystemAvailability from './components/SystemAvailability'

class SidebarContainer extends React.Component {
  constructor(props) {
    super(props)
      
    // Needed to make the antd 'collapse' component fully keyboard accessible
    // We remove this element from the tab-index and then add a tab-index to the element 
    // we do want to have keyboard focus further below
    this.removeFromTabIndex = element => {
      ReactDOM.findDOMNode(element).firstChild.tabIndex = '-1'
    };
  } 
  
  render() {
    const Panel = Collapse.Panel
    const { selectSensor, sensorData, systemAvailability } = this.props

    return (
      <Layout.Sider 
        collapsible 
        collapsedWidth={48}
        reverseArrow
        >
        <div id="details-header">
          <SystemAvailability systemAvailability={systemAvailability} />
        </div>
        
        <div id='sensor-sidebar'>
          <Collapse accordion activeKey={`sensor-list-item-${this.props.selectedSensor}`}>
            {sensorData.length && sensorData.map((sensor) => {
              return (
                <Panel 
                  header={panelHeader(sensor, selectSensor)}
                  key={`sensor-list-item-${sensor.id}`}
                  ref={this.removeFromTabIndex}
                  showArrow={false}
                  >
                  <p>{sensor.stationId}</p>
                </Panel>
              )
            })}
          </Collapse>
        </div>
      </Layout.Sider>
    )
  }
}

const panelHeader = (sensor, selectSensor) => {
  return (
    <div 
      tabIndex={0} 
      onClick={() => selectSensor(sensor.id)}
      onKeyDown={(e) => e.key === 'Enter' && selectSensor(sensor.id)}
      role='button'
      >
      {`${sensor.description} - ${sensor.deviceID || sensor.id}`}
    </div>
  )
}

export default SidebarContainer