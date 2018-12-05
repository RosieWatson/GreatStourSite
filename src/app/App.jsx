import React from 'react'
import 'antd/dist/antd.css'
import '../styles/css/styles.css'
import { Layout, Icon, DatePicker, Button, Input, Row, Col } from 'antd'

import MainContentContainer from './MainContentContainer'
import SidebarContainer from './SidebarContainer'

export const App = () => {
  const { Header, Content, Footer } = Layout
  const { MonthPicker, RangePicker, WeekPicker } = DatePicker
  
  return (
    <div>
        <Layout id="layout-root">
            <Header>
                <div id="logo">Great Stour</div>
                <div id="header-utility">
                    <Button block type="primary" icon="robot" size='large'>Test Mode</Button>
                </div>
            </Header>
            <Layout>
                <MainContentContainer />
                <SidebarContainer />
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

export default App
