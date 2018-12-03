import React from 'react'

import { Layout, Button, Input, Row, Col, DatePicker } from 'antd';

class SidebarContainer extends React.Component {
  render () {
    
    return (
      <Layout.Sider id="sider-root">
        <div id="logo">Great Stour</div>
        
        <div id="mobile-bars">
          <Button block type="primary" ghost icon="bars" size='large'></Button>
        </div>
        
        
        {/* Commenting out menu for now, as I don't think we need it? */}
        {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
        <Icon type="pie-chart" />
        <span>Option 1</span>
        </Menu.Item>
        </Menu>
        */}
        
        <div className="utility-container">
          <div className="utility">
            <Row>
              <Col className="column" span={22}>
                <Button block type="primary" icon="mail" size='large'>Subscribe</Button>
              </Col>
              <Col className="column" span={22}>
                <Button block type="primary" icon="robot" size='large'>Test Mode</Button>
              </Col>
            </Row>
            <Row>
              <Col className="column" span={22}>
                
              </Col>
              <Col className="column" span={22}>
                <DatePicker />
              </Col>
            </Row>
          </div>
        </div>
      </Layout.Sider>
    )
  }
}

export default SidebarContainer