import React from 'react'
import ReactDOM from 'react-dom'
import { Collapse, Icon, Layout } from 'antd'

import SystemAvailability from './components/SystemAvailability'
import SensorChart from './components/SensorChart'

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
    const { collapsed, selectSensor, selectedSensor, sensorData, systemAvailability, toggleFloodAdviceModal, toggleSidebar } = this.props
    
    const sidebarIconDirection = this.props.collapsed ? 'left' : 'right'
    
    return (
      <Layout.Sider
        breakpoint='lg'
        collapsed={collapsed}
        collapsedWidth={48}
        collapsible 
        id='sidebar'
        reverseArrow
        trigger={
          <div 
            className='h-100' 
            onClick={toggleSidebar}
            onKeyDown={(e) => e.key === 'Enter' && toggleSidebar()}
            role='button'
            tabIndex={0} 
            >
            <Icon type={sidebarIconDirection} />
          </div>
        }
        >
        <div id='details-header'>
          <SystemAvailability 
            systemAvailability={systemAvailability} 
            toggleFloodAdviceModal={toggleFloodAdviceModal}
            />
        </div>
        
        <div id='sensor-sidebar'>
          <Collapse accordion activeKey={`sensor-list-item-${selectedSensor}`}>
            {sensorData.length && sensorData.map((sensor) => {
              return (
                <Panel 
                  header={panelHeader(sensor, selectSensor, selectedSensor)}
                  key={`sensor-list-item-${sensor.id}`}
                  ref={this.removeFromTabIndex}
                  showArrow={false}
                  >
                  <SensorChart stationId={sensor.id} />
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

const panelHeader = (sensor, selectSensor, selectedSensor) => {
  // Icon pointing down when panel open, right when closed
  const iconDirection = selectedSensor === sensor.id ? 'down' : 'right';
  return (
    <div 
      tabIndex={0} 
      onClick={() => selectSensor(sensor.id)}
      onKeyDown={(e) => e.key === 'Enter' && selectSensor(sensor.id)}
      role='button'
      >
      <Icon
        className='pr-2'
        type={iconDirection}
        />
      {`${sensor.description} - ${sensor.deviceID || sensor.id}`}
    </div>
  )
}

export default SidebarContainer