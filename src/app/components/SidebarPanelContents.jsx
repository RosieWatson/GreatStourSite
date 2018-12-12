import React from 'react'
import { Icon, Switch } from 'antd'

import SensorChart from './SensorChart'

class SidebarPanelContents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showAsTable: false
    }
    this.changeDataView = this.changeDataView.bind(this)
  }
  
  changeDataView() {
    this.setState({
      showAsTable: !this.state.showAsTable
    })
  }
  
  render () {
    const {sensor} = this.props
    return (
      <React.Fragment>
        <label className='mb-1 mr-1' htmlFor='table-view-switch'>  Show as Table</label>
        <Switch 
          checkedChildren={<Icon type='check' />}
          id='table-view-switch'
          onChange={this.changeDataView}
          unCheckedChildren={<Icon type='close' />}  
          /> 
        <SensorChart sensor={sensor} tableView={this.state.showAsTable} />
      </React.Fragment>
    )
  }
}

export default SidebarPanelContents;