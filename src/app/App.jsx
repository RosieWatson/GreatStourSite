import React from 'react'
import 'antd/dist/antd.css'
import '../styles/css/styles.css'
import { Layout, Menu, Alert, Icon, DatePicker, Button, Input, Row, Col } from 'antd'

import MainContentContainer from './MainContentContainer'
import SidebarContainer from './SidebarContainer'

export const App = () => {
  const { Header, Content, Footer } = Layout
  const { MonthPicker, RangePicker, WeekPicker } = DatePicker
  
  return (
    <div>
      <Layout id="layout-root">
        <SidebarContainer />
        <Layout>
          <Header>
            <Alert message="Flood Warning banner!" banner> </Alert>
          </Header>
          <MainContentContainer />
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

export default App
