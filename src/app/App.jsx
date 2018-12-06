import React from 'react'
import 'antd/dist/antd.css'
import '../styles/css/styles.css'
import { Layout, Alert, Icon, DatePicker, Button, Input, Row, Col } from 'antd'
import axios from 'axios'

import MainContentContainer from './MainContentContainer.jsx'
import SidebarContainer from './SidebarContainer.jsx'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sensorData: []
    }
    this.sensorData = this.sensorData.bind(this)
    this.sensorData()
  }
  
  sensorData() {
    axios.get('api/govdata/fetch/sensors')
    .then(res => {
      this.setState({
        sensorData: res.data.data
      })
    })
  }
  
  render() {
    const { Header, Content, Footer } = Layout
    const { MonthPicker, RangePicker, WeekPicker } = DatePicker
    const { sensorData } = this.state
    
    return (
      <div>
        <Layout id="layout-root">
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Header>
            <div id="logo">Great Stour</div>
            <div id="header-utility">
              <Button block type="primary" icon="robot" size='large'>Test Mode</Button>
            </div>
          </Header>
          <Layout>
            <MainContentContainer sensorData={sensorData} />
            <SidebarContainer sensorData={sensorData} />
          </Layout>
          <Footer>
            Great Stour River - Flood Monitor
            <br/>
            This uses Environment Agency flood and river level data from the real-time data API (Beta)
          </Footer>
        </Layout>
      </div>
    )
  }       
}

export default App
