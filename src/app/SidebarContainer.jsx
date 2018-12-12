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
                  key={`sensor-list-item-${sensor.deviceID || sensor.id}`}
                  ref={this.removeFromTabIndex}
                  showArrow={false}
                  >
                  <SensorChart stationId={sensor.deviceID || sensor.id} />
                </Panel>
              )
            })}
          </Collapse>
        </div>
      </Layout.Sider>
    )
  }
}

const panelHeader = (sensor, selectSensor, selectedSensor) => {
  // The ids are different for mqtt / gov devices
  const sensorID = sensor.deviceID || sensor.id
  
  // Icon pointing down when panel open, right when closed
  const iconDirection = (selectedSensor === sensorID) ? 'down' : 'right';
  return (
    <div 
      tabIndex={0} 
      onClick={() => selectSensor(sensorID)}
      onKeyDown={(e) => e.key === 'Enter' && selectSensor(sensorID)}
      role='button'
      >
      <Icon
        className='pr-2'
        type={iconDirection}
        />
      {`${sensor.description} - ${sensorID}`}
    </div>
  )
}

export default SidebarContainer