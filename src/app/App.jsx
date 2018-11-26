import React from 'react'
import 'antd/dist/antd.css';
import { Layout, Menu, Alert, Icon, DatePicker, Button, Input } from 'antd';

export const App = () => {
    const { Header, Content, Footer, Sider } = Layout;
    const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    const Search = Input.Search;

    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible styl={{position: 'relative'}}>
                    <div className="logo" style={{ color:'#fff', margin: 16, fontSize: 30, textAlign: 'center' }}>Great Stour</div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{ margin: '16px 0'}}>
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span>Option 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="file" />
                            <span>Subscribe</span>
                        </Menu.Item>
                    </Menu>
                    <div id="buttons" style={{ position: 'absolute', bottom: '0', textAlign: 'center', marginBottom: '80px' }}>
                        <Search
                            placeholder="Postcode"
                            onSearch={value => console.log(value)}
                            style={{margin: '16px', display: 'inline-block', width: '150px'}}
                        />
                        <Button type="primary" icon="mail" size='large' style={{margin: '16px', display: 'inline-block', width: '150px' }}>Subscribe</Button>
                        <Button type="primary" icon="code" size='large' style={{margin: '16px', display: 'inline-block', width: '150px' }}>Test Mode</Button>
                    </div>

                </Sider>
                <Layout style={{ minHeight: '100vh' }}>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Alert message="Flood Warning banner!" banner> </Alert>
                    </Header>

                    <Content style={{ margin: '16px 16px' }}>
                        <div style={{ padding: 0, background: '#fff', minHeight: 360 }}>
                            <div id="mapOverlay" style={{position: 'absolute', margin: 10 }}>
                                <DatePicker />
                            </div>
                            <div id="map-container" style={{width: "1671px", height:"800px"}}>
                                <iframe id="map" style={{width: "inherit", height:"inherit"}}
                                        src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                        frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                            </div>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Great Stour River - Flood Monitor ©2018
                    </Footer>
                </Layout>
            </Layout>
        </div>
    )       
}

export default App
