import React from 'react'
import 'antd/dist/antd.css'
import '../styles/css/styles.css'
import { Layout, Menu, Alert, Icon, DatePicker, Button, Input, Row, Col } from 'antd'
//const request = require('request')
import axios from 'axios'

import MainContentContainer from './MainContentContainer'
import SidebarContainer from './SidebarContainer'


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
          <SidebarContainer />
          <Layout>
            <Header>
              <Alert message="Flood Warning banner!" banner> </Alert>
            </Header>
            <MainContentContainer sensorData={sensorData} />
            <Footer>
              Great Stour River - Flood Monitor
              <br/>
              This uses Environment Agency flood and river level data from the real-time data API (Beta)
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }       
}

export default App
