import React from 'react'
import 'antd/dist/antd.css';
import '../styles/css/styles.css';

import { Layout, Menu, Alert, Icon, DatePicker, Button, Input, Row, Col } from 'antd';

export const App = () => {
    const { Header, Content, Footer, Sider } = Layout;
    const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    const Search = Input.Search;

    return (
        <div>
            <Layout id="layout-root">
                <Sider id="sider-root">
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
                                    <Search
                                        placeholder="Postcode"
                                        onSearch={value => console.log(value)}
                                    />
                                </Col>
                                <Col className="column" span={22}>
                                    <DatePicker />
                                </Col>
                            </Row>
                        </div>
                    </div>

                </Sider>
                <Layout>
                    <Header>
                        <Alert message="Flood Warning banner!" banner> </Alert>
                    </Header>
                    <Content>
                        <div id="content-container">
                            <div id="map-container">
                                <div id="map-overlay">

                                </div>

                                <div id="map">

                                </div>
                            </div>

                        </div>
                    </Content>
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
