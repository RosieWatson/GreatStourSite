import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Collapse } from 'antd'

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
    const { Footer } = Layout
    const { selectSensor, sensorData, systemAvailability } = this.props

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
        <Footer>
          Great Stour River - Flood Monitor
          <br/>
          This uses Environment Agency flood and river level data from the real-time data API (Beta)
        </Footer>
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