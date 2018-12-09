import React from 'react'
import { Alert, Button, Col, Collapse, DatePicker, Icon, Input, Layout, Row} from 'antd'
import ReactDOM from 'react-dom'

import SystemAvailability from './components/SystemAvailability'

class SidebarContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
    }
    
    // Needed to make the antd 'collapse' component fully keyboard accessible
    // We remove this element from the tab-index and then add a tab-index to the element 
    // we do want to have keyboard focus further below
    this.removeFromTabIndex = element => {
      ReactDOM.findDOMNode(element).firstChild.tabIndex = '-1'
    };
    this.toggleSidebar = this.toggleSidebar.bind(this)
  } 
  
  toggleSidebar() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  
  render() {
    const Panel = Collapse.Panel
    const { selectSensor, sensorData, systemAvailability } = this.props
    
    const sidebarIconDirection = this.state.collapsed ? 'left' : 'right'
    
    return (
      <Layout.Sider 
        collapsed={this.state.collapsed}
        collapsedWidth={48}
        collapsible
        id='sidebar'
        reverseArrow
        trigger={
          <div 
            className='h-100' 
            onClick={this.toggleSidebar}
            onKeyDown={this.toggleSidebar}
            role='button'
            tabIndex={0} 
            >
            <Icon type={sidebarIconDirection} />
          </div>
        }
        >
        <div id='details-header'>
          <SystemAvailability systemAvailability={systemAvailability} />
        </div>
        
        <div id='sensor-sidebar'>
          <Collapse accordion activeKey={`sensor-list-item-${this.props.selectedSensor}`}>
            {sensorData.length && sensorData.map((sensor) => {
              return (
                <Panel 
                  header={panelHeader(sensor, selectSensor, this.props.selectedSensor)}
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